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

const token ='Bearer '+getToken();
// const token ='Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjgyMDAwYmM2LTI0OTMtNDljNy1hOGQwLTU5MTZkZWY5ODEzMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiYjc3OTNjODMtYmNhMy00NWM3LTkyNjktNzcwN2ZhMTM5ZjRlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJGVU9QMlpZQ0tPNFNDUzRXQ0JBREc1S1RERktLTkpNWiIsIkFwcCI6IuS6keivkemAmiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJBZG1pbmlzdHJhdG9ycyIsIkN1c3RvbWVyQXBwcm92ZSIsIkNvbXBhbnlFbXBsb3llZSJdLCJDbGFpbVR5cGVfQXBwVXNlcklkXzQ0RjhFQzk2LUQ0MzYtNDc3My1BRDQxLTJFQThCMEUxMThEOCI6IjQ1ZmEwODVmLTcxNzgtNDY0MC1iYjczLTA2ZGMwZTEwNjI3YSIsImV4cCI6MTU0OTA5NjQ0OSwiaXNzIjoiaHR0cHM6Ly93d3cuY3RjNjY2LmNvbSIsImF1ZCI6Imh0dHBzOi8vd3d3LmN0YzY2Ni5jb20ifQ.1wnLGiJAwzjv2T-mQsd9y37rQkIhX2p9U85id5T4iR0';

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
