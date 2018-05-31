import { request, config } from 'utils'

const { api } = config
const { getRefundList,addshoptype,updateshoptype,deleteshoptype,getOrder,getOrderInfo,yijiaOrder } = api


export function query (params) {
  return request({
    url: getOrder,
    method: 'post',
    data: params,
  })
}
export function getOrderInfoes (params) {
  return request({
    url: getOrderInfo,
    method: 'post',
    data: params,
  })
}
//chagne   price 
export function yijiaOrderes (params) {
  return request({
    url: yijiaOrder,
    method: 'post',
    data: params,
  })
}
//添加商品分类
export function create (params) {
  console.log(params)
  return request({
    url: addshoptype,
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
