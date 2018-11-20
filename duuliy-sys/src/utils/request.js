/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */



// import fetch from 'dva/fetch';
import axios from 'axios'
import qs from 'qs'


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


//测试环境，服务器环境，线上环境
// let baseUrl = 'http://39.108.82.150:81/index.php/api/';
// let baseUrl="";
// if (process.server) {
//     baseURL = `http://${process.env.HOST || '192.168.189.249'}:${process.env.PORT || 8887}`
// }
// if (!window.Promise) {
//     window.Promise = Promise;
// }

let token = '';
// let token = 'eyJ1aWQiOjMzNjkyfQ==.LHs1ggJVnKw1qEW8ta8jvQYyyTXpDEvsJFj4z9nD6h6WKcThhDFpxOrwPiaaymfEm39NKhvezYG0Cau4JIn+oA==';
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} type       The type we want to request
 * @param  {string} url       The URL we want to request
 * @param  {object} [params] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function fetch(type, url, params) {
  if (type == 'post') {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params), {
          // headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //     'Accept': 'application/json'
          //     // 'App-Token': token
          // },
          // withCredentials: true
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    });
  } else if (type == 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          // headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //     'Accept': 'application/json'
          //     // 'App-Token': token
          // },
          // withCredentials: true
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    });
  } else if (type == 'delete') {
    return new Promise((resolve, reject) => {
      axios.delete(url, qs.stringify(params), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          // withCredentials: true
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    });
  } else if (type == 'patch') {
    return new Promise((resolve, reject) => {
      axios.patch(url, qs.stringify(params), {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          // withCredentials: true
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    });
  } else if (type == 'put') {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.stringify(params), {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          // withCredentials: true
        })
        .then(checkStatus)
        .then(parseJSON)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error)
        })
    });
  }
}
