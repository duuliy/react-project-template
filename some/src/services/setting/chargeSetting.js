import { request, config } from 'utils'

const { api } = config
const { user,addshoptype,updateshoptype,deleteshoptype,getwebInstall,setwebInstall } = api


export function query (params) {
  return request({
    url: getwebInstall,
    method: 'get',
    data: params,
  })
}

//修改
export function setwebInstalles (params) {
//   console.log(params)
  return request({
    url: setwebInstall,
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
