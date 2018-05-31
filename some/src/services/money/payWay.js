import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,edtUserAuthentication,getPayType,getCapitalLogInfo,updatePayTypeInfo ,getPayTypeInfo} = api

//获取 提现 记录
export function query (params) {

  return request({
    url: getPayType,
    method: 'post',
    data: params,
  })
}
//
export function querySearch (params) {

  return request({
    url: getCapitalLog,
    method: 'post',
    data: params,
  })
}

//获取   提现详情
export function updatePayTypeInfoes (params) {
    // console.log(params)
    return request({
      url: updatePayTypeInfo,
      method: 'post',
      data: params,
    })
  }
//获取   提现详情
export function getPayTypeInfoes (params) {
    // console.log(params)
    return request({
      url: getPayTypeInfo,
      method: 'post',
      data: params,
    })
  }



//通过
export function edtUserAuthenticationes (params) {
    console.log(params)
    return request({
      url: edtUserAuthentication,
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
