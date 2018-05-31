import { request, config } from 'utils'

const { api } = config
const { users } = api

//获取商品分类列表
export function query (params) {
  return request({
    url: users,
    method: 'get'
    // data: params,
  })
}

export function remove (params) {
  return request({
    url: users,
    method: 'delete',
    data: params,
  })
}
