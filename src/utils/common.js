import { Tooltip } from 'antd'
import moment from 'moment'
import { cloneDeep } from 'lodash'
// import md5 from 'js-md5'  //看是否需要加密

/**
 * 获取token
 */
export const getToken = () => {
  let info = localStorage.getItem('userToken')
  return JSON.parse(unescape(info))
}

/**
 * 菜单及功能按钮权限验证
 */
export const hasAuth = tag => {
  // const menus = JSON.parse(sessionStorage.menus || '[]'); //正式用这行，下面测试
  const menus = ['one', 'one:OnLineMap', 'one:oneOffLineMap', 'one:oneOffLineMap:detail', 'two', 'two:LeafLetMap', 'two:twoTableTest', 'two:twoTableTest:detail', 'two:twoVisualization', 'two:twoTableTest:edit', 'four', 'four:fourOption13']
  return menus.includes(tag)
}
/* 判断内容是否为空
 * @param s 要判断的内容
 * @return Boolean
 */
export const isEmpty = s => {
  return s === null || typeof s === 'undefined' || (typeof s === 'string' && s.replace(/\s*/g, '') === '') || s === 'null/null' || s === 'null'
}

/* 判断内容是否为空，为空显示占位符
 * @param str 要判断的内容
 * @return str 返回实际显示的内容
 */
export const emptyFilter = str => {
  if (isEmpty(str)) return '--'
  return str
}

/**  气泡
 * @param text 要显示的内容
 */
export const TooltipFn = text => {
  return (
    <Tooltip getPopupContainer={triggerNode => triggerNode.parentNode} placement="topLeft" title={text}>
      {emptyFilter(text)}
    </Tooltip>
  )
}

/**
 * 删除json中的空值
 * @param obj 待删除的json
 * @return obj 删除后的json
 */
export const deleteEmptyProp = obj => {
  for (let key in obj) {
    const value = obj[key]
    if (value === null) {
      delete obj[key]
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      deleteEmptyProp(value)
    }
  }
  return obj
}

/**
 * 设置请求头
 * @param params 传给请求接口的入参，请求头要用入参来加签
 * @return headers 生成的请求头
 */
export const setHeaders = (params = {}) => {
  const headers = {}

  // 设置token
  const token = 'Bearer ' + getToken()
  if (token) {
    headers.token = token
  }

  // 设置requestId
  headers.requestId = `1000000${moment().format('YYYYMMDD')}${String(Math.random()).substring(2, 11)}`

  // 设置sign
  let sign = params instanceof FormData ? {} : cloneDeep(params) // 深拷贝参数，防止加签时原参数被改变
  sign = deleteEmptyProp(sign) // 删除空属性
  // sign.key = '8db4a013a8b515349c307f1e448ce845' //是否需要密钥
  if (token) {
    sign.token = token
  }
  sign.requestId = headers.requestId
  sign = JSON.stringify(sign)
    .split('')
    .sort()
    .join('')
  sign = sign.replace(/[~`!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?\/！￥……（）——【】、：；“”‘’《》，。？]/g, '')
  // headers.sign = md5( sign )  //看是否需要加密

  // 当请求为非上传类型时，设置Content-Type
  if (!(params instanceof FormData)) {
    headers['Content-Type'] = 'application/json; charset=UTF-8'
  }

  return headers
}
