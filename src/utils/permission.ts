type PermissionCollection = Record<string, string[]>

//标准模块的权限：CRUD
const STANDARD_MODULE_PERMISSION = [
  'menu.list.basic-list.create',
  'menu.list.basic-list.read',
  'menu.list.basic-list.update',
  'menu.list.basic-list.delete'
]

//标准模块列表
export const STANDARD_PERMISSION_MODULE = ['menu.list.basic-list']

//拥有特殊操作权限的模块集合
export const SPECIAL_MODULE_INNER_ACTION_PERMISSION_COLLECTION: PermissionCollection =
  {
    //权限：审批、新增、删除、查看已删除的数据
    'menu.list.card-list': [
      'menu.list.card-list.approval',
      'menu.list.card-list.add',
      'menu.list.card-list.delete',
      'menu.list.card-list.view-deleted'
    ]
  }

//全部的权限模块
export const ALL_MODULE_INNER_ACTION_PERMISSION_COLLECTION = (function () {
  return {
    ...STANDARD_PERMISSION_MODULE.reduce(
      (prev: PermissionCollection, next: string) => {
        prev[next] = [...STANDARD_MODULE_PERMISSION]
        return prev
      },
      {} as PermissionCollection
    ),
    ...SPECIAL_MODULE_INNER_ACTION_PERMISSION_COLLECTION
  }
})()

//根据模块获取权限集
export function getModuleInnerActionPermission(module: string) {
  return STANDARD_PERMISSION_MODULE.includes(module)
    ? STANDARD_MODULE_PERMISSION
    : SPECIAL_MODULE_INNER_ACTION_PERMISSION_COLLECTION[module] || []
}
