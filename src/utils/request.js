/*
 * @Author: duuliy
 * @Date: 2018-11-15 11:17:11
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11
 */

import axios from 'axios'
import { setHeaders } from './common.js'
import { message } from 'antd'
import { LOGINOUT_CODES } from '@a/js/enume'
// import qs from 'qs'

//测试环境，服务器环境，线上环境
// let baseUrl = 'http://39.108.82.150:81/index.php/api/';
const baseUrl = ''
// if (process.server) {
//     baseURL = `http://${process.env.HOST || '192.168.189.249'}:${process.env.PORT || 8887}`
// }
// if (!window.Promise) {
//     window.Promise = Promise;
// }

// const token ='Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjgyMDAwYmM2LTI0OTMtNDljNy1hOGQwLTU5MTZkZWY5ODEzMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYjc3OTNjODMtYmNhMy00NWM3LTkyNjktNzcwN2ZhMTM5ZjRlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJGVU9QMlpZQ0tPNFNDUzRXQ0JBREc1S1RERktLTkpNWiIsIkFwcCI6IuS6keivkemAmiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbmlzdHJhdG9ycyIsIkN1c3RvbWVyQXBwcm92ZSIsIkNvbXBhbnlFbXBsb3llZSJdLCJDbGFpbVR5cGVfQXBwVXNlcklkXzQ0RjhFQzk2LUQ0MzYtNDc3My1BRDQxLTJFQThCMEUxMThEOCI6IjQ1ZmEwODVmLTcxNzgtNDY0MC1iYjczLTA2ZGMwZTEwNjI3YSIsImV4cCI6MTU0OTA5NjQ0OSwiaXNzIjoiaHR0cHM6Ly93d3cuY3RjNjY2LmNvbSIsImF1ZCI6Imh0dHBzOi8vd3d3LmN0YzY2Ni5jb20ifQ.1wnLGiJAwzjv2T-mQsd9y37rQkIhX2p9U85id5T4iR0';

function checkStatus(res) {
  const loginoutCodes = Object.keys(LOGINOUT_CODES).map(key => LOGINOUT_CODES[key])
  if (res.status >= 200 && res.status < 300) {
    return res
  } else if (loginoutCodes.indexOf(res.data.head.code) !== -1) {
    sessionStorage.clear()
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

const catchCB = err => {
  console.log(err)
  let msg
  if (err && err.message === 'Failed to fetch') {
    msg = '网络异常，请检查网络连接'
  } else if (false) {
    // err.response.status === 404
    msg = '找不到该请求'
  } else {
    //跟后台协商抛出错误提示
    // if (typeof err.response.data === 'string') {
    //   msg = '请求失败'
    // } else if (typeof err.response.data.body === 'string') {
    //   if (!err.response.data.body) {
    //     msg = `${err.response.data.head.result}`
    //   } else {
    //     msg = `${err.response.data.body}`
    //   }
    // } else if (typeof err.response.data.body === 'object') {
    //   msg = `${err.response.data.body.data || err.response.data.body.msg }`
    // } else {
    //   msg = `${err.response.data.head.result}`
    // }
  }
  return msg
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} type       The type we want to request
 * @param  {string} url       The URL we want to request
 * @param  {object} [params] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const request = (method, url, data = {}) => {
  // url=`/api/v1${url}` 是否添加前缀
  // 由于ID加密，密文可能存在特殊字符，如"/"，无法用url传参，可以用encodeURIComponent对url中的参数进行编码来避免以上问题
  const headers = setHeaders(data)
  if (!(data instanceof FormData)) {
    data = JSON.stringify(data)
  }

  if (method === 'get') {
    return new Promise((resolve, reject) => {
      // url = `${ url }?${ qs.stringify( data ) }`
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(checkStatus)
        .then(res => {
          if (data.status === '429') {
            //此时特殊情况单独处理请求不统一处理 在res=res.date地方处理
            // reject(data.body.message || data.body)
            //resolve( res );
          } else {
            res = res.data //统一处理后，只获取需要的data
            resolve(res)
          }
        })
        .catch(err => {
          console.log(err)
          const msg = catchCB(err)
          errPrompt(msg)
          // reject( error );
        })
    })
  } else if (method === 'delete') {
    return new Promise((resolve, reject) => {
      axios
        .delete(baseUrl + url, {
          data: data,
          headers: headers,
        })
        .then(checkStatus)
        .then(res => {
          if (data.head.code === '429') {
            //此时特殊情况单独处理请求不统一处理 在res=res.date地方处理
            // reject(data.body.message || data.body)
            //resolve( res );
          } else {
            res = res.data //统一处理后，只获取需要的data
            resolve(res)
          }
        })
        .catch(error => {
          const msg = catchCB(err)
          errPrompt(msg)
          // reject( error );
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: baseUrl + url,
        data: data,
        headers: headers,
      })
        .then(checkStatus)
        .then(res => {
          if (data.head.code === '429') {
            //此时特殊情况单独处理请求不统一处理 在res=res.date地方处理
            // reject(data.body.message || data.body)
            //resolve( res );
          } else {
            res = res.data //统一处理后，只获取需要的data
            resolve(res)
          }
        })
        .catch(error => {
          const msg = catchCB(err)
          errPrompt(msg)
          // reject( error ); //统一处理后看情况是否要抛出异常
          // reject(new Error(err))
        })
    })
  }
}

export default request
