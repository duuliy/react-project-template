import { request, config } from 'utils'

const { api } = config
const { userLogin,getCa } = api

export function login (data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  })
}
//验证码
export function GetCa () {
  return request({
    url: getCa,
    method: 'post'
  })
}
