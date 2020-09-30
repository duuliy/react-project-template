import request from '@u/request';

// 登录
export const login = params => {
  return request('post', '/user/login', params);
};
// 退出登录
export const logout = params => {
  return request('post', '/user/logout', params);
};
