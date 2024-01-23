import React, { useCallback, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector, useDispatch } from 'react-redux'
import {
  RouterProvider,
  createBrowserRouter,
  type RouteObject
} from 'react-router-dom'
import { message, Spin } from 'antd'

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

import { checkIsLogin, getToken, removeToken } from './utils/auth'
import {
  getUserLoading,
  updateUserLoading,
  updateUserInfo,
  updateToken
} from './store/globalState'
import './index.css'

import './mock/index'
import axios from 'axios'
import { MockResponseStatus } from './types'

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

function PageLoading() {
  return (
    <div className="page-loading-container h-full w-full flex justify-center items-center">
      <Spin size="large" tip="Loading">
        <div className="content p-12"></div>
      </Spin>
    </div>
  )
}

export function App() {
  const dispatch = useDispatch()

  const userLoading = useSelector(getUserLoading)
  const userModules = useSelector(getUserModules)

  const [messageApi, contextHolder] = message.useMessage()

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

  const fetchUserInfo = useCallback(async () => {
    const res = await axios.post<{
      status: string
      msg: string
      data?: any
    }>('/api/user/userInfo')
    const { status, msg, data } = res.data
    if (status !== MockResponseStatus.SUCCESS || !data) {
      messageApi.open({
        type: 'error',
        content: msg || '获取用户信息失败，请重新登录'
      })
      removeToken()
      window.location.href = '/'
      return
    }
    // 更新用户信息
    dispatch(updateUserInfo(data))
    dispatch(updateUserLoading(false))
  }, [dispatch, messageApi])

  useEffect(() => {
    if (!checkIsLogin()) {
      // 未登录
      dispatch(updateUserLoading(false)) //设置为false后，渲染RouterProvider后如果路由不是/login则会重定向至/login
    } else {
      if (!userLoading) return
      const token = getToken() as string
      dispatch(updateToken(token))
      fetchUserInfo()
    }
  }, [userLoading, dispatch, fetchUserInfo])

  const router = createBrowserRouter(_router)
  return (
    <>
      {contextHolder}
      {userLoading ? <PageLoading /> : <RouterProvider router={router} />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
