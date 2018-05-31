import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2,ap1All3 } = api

// 获取标签
export function query (params) {
  return request({
    url: ap1All3+'/shop/getproperty',
    method: 'get',
    data:params
  })
}
// 获取标签
export function getLdsj (params) {
  return request({
    url: ap1All3+'/shop/getxjLDProperty',
    method: 'get',
    // data:params
  })
}

//添加商品分类
export function create (params) {
  return request({
    url: ap1All2+'/shop/addproperty',
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  return request({
    url: ap1All2+'/shop/deleteproperty',
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: ap1All2+'/shop/updateproperty',
    method: 'post',
    data: params,
  })
}
// 获取子属性
export function getChild (params){
  return request({
    url: ap1All2+'/shop/getproperty',
    method: 'get',
    data:params
  })
}