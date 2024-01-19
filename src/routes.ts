// import { Login } from "./modules/login"
// import { Layout } from "./modules/layout"
// import { RouteObject } from "react-router-dom"
export interface IRoute {
  name: string
  key: string
  permissionRequired?: boolean
  children?: IRoute[]
}

// 模块基础路由
export const moduleBasicRoutes: IRoute[] = [
  // {
  //   name: 'menu.user.user-info',
  //   key: 'user/user-info'
  // }
]

// 模块权限路由
export const moduleAuthRoutes: IRoute[] = [
  // {
  //   name: 'menu.dashboard',
  //   key: 'dashboard',
  //   children: [
  //     {
  //       name: 'menu.dashboard.workplace',
  //       key: 'dashboard/workplace'
  //     },
  //     {
  //       name: 'menu.dashboard.monitor',
  //       key: 'dashboard/monitor',
  //       permissionRequired: true
  //     }
  //   ]
  // },
  {
    name: 'menu.permission-test',
    key: 'permission-test',
    children: [
      {
        name: 'menu.permission-test.public-page',
        key: 'permission-test/public-page'
      },
      {
        name: 'menu.permission-test.admin-only',
        key: 'permission-test/admin-only'
        // permissionRequired: true
      },
      {
        name: 'menu.permission-test.super-admin-only',
        key: 'permission-test/super-admin-only'
        // permissionRequired: true
      }
    ]
  }
  // {
  //   name: 'menu.profile',
  //   key: 'profile',
  //   children: [
  //     {
  //       name: 'menu.profile.basic',
  //       key: 'profile/basic'
  //     },
  //     {
  //       name: 'menu.profile.advanced',
  //       key: 'profile/advanced'
  //     }
  //   ]
  // },
  // {
  //   name: 'menu.list',
  //   key: 'list',
  //   children: [
  //     {
  //       name: 'menu.list.basic-list',
  //       key: 'list/basic-list'
  //     },
  //     {
  //       name: 'menu.list.card-list',
  //       key: 'list/card-list'
  //     }
  //   ]
  // },
  // {
  //   name: 'menu.exception',
  //   key: 'exception',
  //   children: [
  //     {
  //       name: 'menu.exception.403',
  //       key: 'exception/403'
  //     },
  //     {
  //       name: 'menu.exception.404',
  //       key: 'exception/404'
  //     },
  //     {
  //       name: 'menu.exception.500',
  //       key: 'exception/500'
  //     }
  //   ]
  // },
  // {
  //   name: 'menu.form',
  //   key: 'form',
  //   children: [
  //     {
  //       name: 'menu.form.basic-form',
  //       key: 'form/basic-form'
  //     },
  //     {
  //       name: 'menu.form.step-form',
  //       key: 'form/step-form'
  //     },
  //     {
  //       name: 'menu.form.advanced-form',
  //       key: 'form/advanced-form'
  //     },
  //     {
  //       name: 'menu.form.form-association',
  //       key: 'form/form-association'
  //     }
  //   ]
  // }
]

/**
 * 获取扁平化的路由（最内层路由）
 */
export const getFlattenRoutes = (
  sourceRoutes: IRoute[],
  modules: string[]
): IRoute[] => {
  const res: IRoute[] = []
  const travel = (routes: IRoute[]) => {
    routes.forEach((_route) => {
      if (modules.includes(_route.name)) {
        if (_route.children && _route.children.length > 0) {
          return travel(_route.children)
        }
        const newRoute = { ..._route }
        res.push(newRoute)
      }
    })
  }

  travel(sourceRoutes)
  return res
}

/**
 * 过滤权限路由
 * @param {IRoute[]} sourceRoutes 权限路由（树型结构）
 * @param {string[]} modules 用户模块集合（Object.keys(userInfo.modules))
 */
export const filterAuthRoutes = (sourceRoutes: IRoute[], modules: string[]) => {
  const travel = (routes: IRoute[]) => {
    const res: IRoute[] = []
    routes.forEach((_route) => {
      if (modules.includes(_route.name)) {
        const newRoute = { ..._route }
        if (_route.children && _route.children.length > 0) {
          newRoute.children = travel(_route.children)
        }
        res.push(newRoute)
      }
    })
    return res
  }
  return travel(sourceRoutes)
}
