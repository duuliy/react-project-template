import request from '@u/request'

// 登录
export const apiLogin = params => {
  return request('post', '/user/login', params)
}
// 退出登录
export const apiLogout = params => {
  return request('post', '/user/logout', params)
}

//test mock request
export const testMockAndRequest = () => {
  return request('get', '/apc/users')
}
