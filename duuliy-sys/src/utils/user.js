/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */

// import { intercept } from "./Interceptor";
/**
 * 存用户信息
 * @param {Object} info 用户信息
 * @param {Function} callback 回调函数
 */
const setUser = (info,callback) => {
    localStorage.setItem("userinfo", escape(JSON.stringify(info)));
    if(callback){
      callback();
    }
  };
  /**
   * 获取用户信息
   */
  const getUser = () => {
    let info = localStorage.getItem("userinfo");
    return JSON.parse(unescape(info));
  };

   /**
   * 清除用户信息
   */
  const removeUser = () => {
    localStorage.removeItem('userinfo');
    console.log(localStorage.getItem('userinfo'));
  };
  /**
 * 存token
 * @param {Object} info 用户信息
 * @param {Function} callback 回调函数
 */
const setToken = (info, callback) => {
  localStorage.setItem("wt-token", escape(JSON.stringify(info)));
  if (callback) {
    callback();
  }
};
/**
 * 获取token
 */
const getToken = () => {
  let info = localStorage.getItem("wt-token");
  return JSON.parse(unescape(info));
};


export {
  setToken,
  getToken,
  setUser,
  getUser,
  removeUser
};
