import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2,ap1All3 } = api

// 获取标签
export function query (params) {
  return request({
    url: ap1All3+'/getad',
    method: 'post',
    data:params
  })
}

//添加商品分类
export function create (params) {
  return request({
    url: ap1All3+'/admin/adminaddad',
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  return request({
    url: ap1All3+'/admin/admindeletead',
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: ap1All3+'/admin/adminupdatead',
    method: 'post',
    data: params,
  })
}