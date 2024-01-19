import Cookie from 'js-cookie'
const TOKEN_KEY = 'react-admin-token-key'

export function getToken() {
  return Cookie.get(TOKEN_KEY)
}

export function setToken(token: string) {
  Cookie.set(TOKEN_KEY, token)
}

export function removeToken() {
  Cookie.remove(TOKEN_KEY)
}

export function checkIsLogin() {
  return !!getToken()
}
