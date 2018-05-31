import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2,ap1All3 } = api

// 获取标签
export function query (params) {
  return request({
    url: ap1All3+'/getarticle',
    method: 'get',
    data:params
  })
}

//添加商品分类
export function create (params) {
  console.log(params)
  return request({
    url: ap1All3+'/admin/adminaddarticle',
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  console.log(params)
  return request({
    url: ap1All3+'/admin/admindeletearticle',
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: ap1All3+'/admin/adminupdatearticle',
    method: 'post',
    data: params,
  })
}