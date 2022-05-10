import axios from 'axios'
import { setHeaders } from './common.js'
import { message } from 'antd'
import qs from 'qs'
import config from '../config'

//测试环境，服务器环境，线上环境
// let baseUrl = 'http://39.108.82.150:81/index.php/api/';
const baseUrl = ''

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.data
  } else {
    //权限预留
    // sessionStorage.clear()
    // window.location.href = '/#/login'  //登录有了开
  }
  const error = new Error(res.statusText)
  error.res = res
  throw error
}

const errPrompt = msg => {
  message.destroy()
  message.error(msg)
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} method    The type we want to request
 * @param  {string} url       The URL we want to request
 * @param  {object} payload      The options we want to pass to "fetch"
 * @return {object}           An object containing either "payload" or "err"
 */

const request = (method, url, payload = {}, mock = false) => {
  url = (config.mock ? config.mock : mock) ? `/mock${url}` : `/api${url}`
  // 由于ID加密，密文可能存在特殊字符，如"/"，无法用url传参，可以用encodeURIComponent对url中的参数进行编码来避免以上问题
  const headers = setHeaders(payload)

  const loginOutCodes = [
    '401', // 没有权限
    '403', // 权限过期
    '422', // 当前账号已有其他人使用，您被退出，请检查账号信息或联系管理员
    '423', // 没有登录
    '426', // 您的账号权限被修改，请重新登录
    '427'  // 无效令牌
  ]

  // 统一处理文件
  // if (!(payload instanceof FormData)) {
  //   payload = JSON.stringify(payload)
  // }

  if (method === 'get') {
    return new Promise((resolve, reject) => {
      url = `${url}?${qs.stringify(payload)}`
      axios.get(baseUrl + url, {
        headers: headers,
      })
        .then(checkStatus)
        .then(res => {
          if (res.code==='200') {
            resolve(res.body)
          } else if (loginOutCodes.indexOf(res.code) !== -1){
            errPrompt(res.msg)
            window.location.href = '/#/login'
            reject(res.body)
          } else if (res.code === '429') { // 不全局提示错误信息
            reject(res.msg || res.body)
          }
        })
        .catch(err => {
          errPrompt(err)
          reject(new Error(err))
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: baseUrl + url,
        data: payload,
        headers: headers,
      })
        .then(checkStatus)
        .then(res => {
          if (res.code === '200') {
            resolve(res.body)
          } else if (loginOutCodes.indexOf(res.code) !== -1) {
            errPrompt(res.msg)
            window.location.href = '/#/login'
            reject(res.body)
          } else if (res.code === '429') { // 不全局提示错误信息
            reject(res.msg || res.body)
          }
        })
        .catch(err => {
          errPrompt(err)
          // reject( error ); //统一处理后看情况是否要抛出异常
          reject(new Error(err))
        })
    })
  }
}

export default request
