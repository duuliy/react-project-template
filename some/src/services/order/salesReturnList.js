import { request, config } from 'utils'

const { api } = config
const { getRefundList,addshoptype,updateshoptype,deleteshoptype,getRefundOrder } = api


export function query (params) {
  return request({
    url: getRefundList,
    method: 'post',
    data: params,
  })
}
export function getRefund (params) {
  return request({
    url: getRefundOrder,
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
