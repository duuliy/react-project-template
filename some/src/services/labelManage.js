import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getLabel,ap1All2 } = api

// 获取标签
export function query (params) {
  return request({
    url: getLabel,
    method: 'get'
  })
}

//添加商品分类
export function create (params) {
  console.log(params)
  return request({
    url: ap1All2+'/shop/addtag',
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  console.log(params)
  return request({
    url: ap1All2+'/shop/deletetag',
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: ap1All2+'/shop/updatetag',
    method: 'post',
    data: params,
  })
}
