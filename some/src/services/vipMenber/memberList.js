import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getUserList,getUserInfo,edtUserAuthentication ,
  getCapitalLog,getUserIntegralLog,adjustAccount} = api


export function query (params) {
  return request({
    url: getUserList,
    method: 'post',
    data: params,
  })
}

//获取   getUserInfo
export function getUserInfoes (params) {
    // console.log(params)
    return request({
      url: getUserInfo,
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
//jifen
export function getUserIntegralLoges (params) {
    console.log(params)
    return request({
      url: getUserIntegralLog,
      method: 'post',
      data: params,
    })
  }
//zijin
export function getCapitalLoges (params) {
    console.log(params)
    return request({
      url: getCapitalLog,
      method: 'post',
      data: params,
    })
  }
//调整会员账户
export function adjustAccountes (params) {
    console.log(params)
    return request({
      url: adjustAccount,
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
