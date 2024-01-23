import Mock from 'mockjs'
import setupMock from '../utils/setupMock'
import { getToken } from '../utils/auth'
import { getUserInfoByToken, getTokenByUsername } from './userInfo'
import { MockResponseStatus } from '../types/index'
setupMock({
  setup: () => {
    // 获取用户信息
    Mock.mock(new RegExp('/api/user/userInfo'), () => {
      const token = getToken()
      if (!token) {
        return {
          status: MockResponseStatus.ERROR,
          msg: '用户未登录'
        }
      }
      const userInfo = getUserInfoByToken(token)
      return {
        status: MockResponseStatus.SUCCESS,
        msg: '获取用户信息成功',
        data: {
          ...userInfo,
          email: 'xux9801@163.com',
          job: 'frontend',
          jobName: '前端开发工程师',
          location: 'beijing',
          locationName: '北京'
        }
      }
    })
    // 登陆
    Mock.mock('/api/login', (params) => {
      const { username, password } = JSON.parse(params.body)
      console.log(params.body)
      if (!username) {
        return {
          status: MockResponseStatus.ERROR,
          msg: '用户名不能为空'
        }
      }
      if (!password) {
        return {
          status: MockResponseStatus.ERROR,
          msg: '密码不能为空'
        }
      }
      if (
        ['User', 'Admin', 'SuperAdmin'].includes(username) &&
        password === '1qaz2wsx'
      ) {
        return {
          status: MockResponseStatus.SUCCESS,
          msg: '登录成功',
          token: getTokenByUsername(username)
        }
      }
      return {
        status: MockResponseStatus.ERROR,
        msg: '用户名或密码错误'
      }
    })
  }
})
