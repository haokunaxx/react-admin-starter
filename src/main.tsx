import { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  RouterProvider,
  createBrowserRouter,
  type RouteObject
} from 'react-router-dom'

import { Login } from './modules/login'
import { Layout } from './modules/layout'

import { store } from './store'
import { getUserModules } from './store/globalState'

import {
  filterAuthRoutes,
  getFlattenRoutes,
  moduleAuthRoutes,
  moduleBasicRoutes
} from './routes'

import { checkIsLogin, setToken } from './utils/auth'
import {
  getUserLoading,
  setUserLoading,
  updateUserInfo,
  updateToken
} from './store/globalState'
import { SYSTEM_ROLE } from './mock/userInfo'

import './index.css'

type RouteObjectWithKey = RouteObject & {
  key: string
  children?: RouteObjectWithKey[]
}

//获取渲染的路由
function getRenderRoutes(routes: RouteObjectWithKey[]) {
  const mdls = import.meta.glob('./modules/**/*.tsx')
  const result: RouteObjectWithKey[] = []
  routes.forEach((_route) => {
    const route = {
      ..._route
    }
    route.path = '' + _route.key
    route.lazy = _route.element
      ? undefined
      : (mdls[`./modules/${_route.key}/index.tsx`] as any)
    result.push(route)
  })
  return result
}

export function App() {
  const dispatch = useDispatch()
  const userLoading = useSelector(getUserLoading)
  const userModules = useSelector(getUserModules)
  const _router = useMemo(() => {
    const staticRoutes = [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: <Layout />
      }
    ] as RouteObject[]
    const modules = Object.keys(userModules)
    if (modules.length > 0) {
      const userAuthRoutes = filterAuthRoutes(moduleAuthRoutes, modules)
      const flattenRoutes = getFlattenRoutes(
        [...moduleBasicRoutes, ...userAuthRoutes],
        modules
      )
      staticRoutes[1].children = [...getRenderRoutes(flattenRoutes)]
      return staticRoutes
    } else {
      return staticRoutes
    }
  }, [userModules])

  useEffect(() => {
    if (!checkIsLogin()) {
      dispatch(setUserLoading(false))
      setToken('this-is-user-token')
    } else {
      setTimeout(() => {
        const userToken = 'this-is-user-token'
        dispatch(
          updateUserInfo({
            username: 'Admin',
            role: SYSTEM_ROLE.USER,
            modules: {
              'menu.dashboard': '',
              'menu.dashboard.workplace': '',
              'menu.permission-test': '',
              'menu.permission-test.public-page': '',
              'menu.profile': '',
              'menu.profile.basic': '',
              'menu.profile.advanced': '',
              'menu.list': '',
              'menu.list.basic-list': '0000', //CRUD
              'menu.list.card-list': '0000', //可新增、删除
              'menu.exception': '',
              'menu.exception.403': '',
              'menu.exception.404': '',
              'menu.exception.500': '',
              'menu.form': '',
              'menu.form.basic-form': '',
              'menu.form.step-form': '',
              'menu.form.advanced-form': '',
              'menu.form.form-association': ''
            }
          })
        )
        dispatch(updateToken(userToken))
        // setToken(userToken)
        dispatch(setUserLoading(false))
      }, 3000)
    }
  }, [dispatch])

  const router = createBrowserRouter(_router)

  return userLoading ? <h1>Loading...</h1> : <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
