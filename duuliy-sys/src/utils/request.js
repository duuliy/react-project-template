/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */



import axios from 'axios'
import { getToken } from './user.js'
import { baseUrl } from './env.js'
// import qs from 'qs'


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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6Ijc2NTU3Yzg4LTU2NDktNDA0YS1iMTM0LTU0OGNhOWFlZTk4NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYjc3OTNjODMtYmNhMy00NWM3LTkyNjktNzcwN2ZhMTM5ZjRlIiwiZXhwIjoxNTQ2ODMyNDMyLCJpc3MiOiJodHRwczovL3d3dy5jdGM2NjYuY29tIiwiYXVkIjoiaHR0cHM6Ly93d3cuY3RjNjY2LmNvbSJ9.l-bfSLSTLZdsqbTMBRzq_xUy4jyx5RZnV73KFvvS1C4';
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} type       The type we want to request
 * @param  {string} url       The URL we want to request
 * @param  {object} [params] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const fetch = (method, url, data) => {
  // const token = 'Bearer '+getToken();
  if (method === "get") {
    return new Promise((resolve, reject) => {
      axios.get(baseUrl + url, {
          headers: {
            'Authorization': token
          }
        })
        .then(checkStatus)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (method === "delete") {
    return new Promise((resovle, reject) => {
      axios.delete(baseUrl + url, {
          data: data,
          headers: {
            'Authorization': token
          }
        })
        .then(checkStatus)
        .then(response => {
          resovle(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    return new Promise((resovle, reject) => {
      axios({
          method: method,
          url: baseUrl + url,
          data: data,
          headers: {
            'Authorization': token
          }
        })
        .then(checkStatus)
        .then(response => {
          resovle(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default fetch
