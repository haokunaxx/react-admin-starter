export interface SystemUserInfo {
  username: string
  role: SYSTEM_ROLE
  modules: Record<string, string>
}

export enum SYSTEM_ROLE {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin'
}

//普通用户信息
const UserInfo: SystemUserInfo = {
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
}
//管理员用户信息
const AdminInfo: SystemUserInfo = {
  username: 'Admin',
  role: SYSTEM_ROLE.ADMIN,
  modules: {
    'menu.dashboard': '',
    'menu.dashboard.workplace': '',
    'menu.dashboard.monitor': '',
    'menu.permission-test': '',
    'menu.permission-test.public-page': '',
    'menu.permission-test.admin-only': '',
    'menu.profile': '',
    'menu.profile.basic': '',
    'menu.profile.advanced': '',
    'menu.list': '',
    'menu.list.basic-list': '1111', //CRUD
    'menu.list.card-list': '0110', //可新增、删除
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
}
//超级管理员用户信息
const SuperAdminInfo: SystemUserInfo = {
  username: 'Admin',
  role: SYSTEM_ROLE.SUPER_ADMIN,
  modules: {
    'menu.dashboard': '',
    'menu.dashboard.workplace': '',
    'menu.dashboard.monitor': '',
    'menu.permission-test': '',
    'menu.permission-test.public-page': '',
    'menu.permission-test.admin-only': '',
    'menu.permission-test.super-admin-only': '',
    'menu.profile': '',
    'menu.profile.basic': '',
    'menu.profile.advanced': '',
    'menu.list': '',
    'menu.list.basic-list': '1111', //CRUD
    'menu.list.card-list': '1111', //可审批、新增、删除、查看已删除的数据
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
}

//模拟的用户信息映射关系表
const mockUserInfoMap = {
  [SYSTEM_ROLE.USER]: UserInfo,
  [SYSTEM_ROLE.ADMIN]: AdminInfo,
  [SYSTEM_ROLE.SUPER_ADMIN]: SuperAdminInfo
}

/**
 * 根据用户角色获取模拟的登录用户信息
 * @param {SYSTEM_ROLE} role 角色信息
 */
export function getUserInfoByRole(role: SYSTEM_ROLE) {
  return mockUserInfoMap[role] || mockUserInfoMap[SYSTEM_ROLE.USER]
}

// modules: [
//   'menu.dashboard.workplace',
//   'menu.dashboard.monitor',
//   'menu.permission-test.public-page',
//   'menu.permission-test.admin-only',
//   'menu.profile.basic',
//   'menu.profile.advanced',
//   'menu.list.basic-list',
//   'menu.list.card-list',
//   'menu.exception.403',
//   'menu.exception.404',
//   'menu.exception.500',
//   'menu.user.user-info',
//   'menu.form.basic-form',
//   'menu.form.step-form',
//   'menu.form.advanced-form',
//   'menu.form.form-association'
// ],
// actions: {
//   'menu.list.basic-list': '1111', //CRUD
//   'menu.list.card-list': '0110' //可新增、删除
// },

export const getTokenByUsername = (username: string) =>
  `this-is-${username}-token`

export const getUserInfoByToken = (token: string) => {
  return {
    'this-is-User-token': UserInfo,
    'this-is-Admin-token': AdminInfo,
    'this-is-SuperAdmin-token': SuperAdminInfo
  }[token]
}
