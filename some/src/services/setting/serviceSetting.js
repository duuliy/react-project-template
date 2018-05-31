import { request, config } from 'utils'

const { api } = config
const { getCustomerInfo,addshoptype,updateshoptype,deleteshoptype,updateCustomerInfo } = api


export function query (params) {
  return request({
    url: getCustomerInfo,
    method: 'get',
    data: params,
  })
}

//添加商品分类
export function updateCustomerInfoes (params) {
  console.log(params)
  return request({
    url: updateCustomerInfo,
    method: 'post',
    data: params,
  })
}
//删除商品分类
export function remove (params) {
  console.log(params)
  return request({
    url: deleteshoptype,
    method: 'post',
    data: params,
  })
}
//更新商品分类
export function update (params) {
  return request({
    url: updateshoptype,
    method: 'post',
    data: params,
  })
}
