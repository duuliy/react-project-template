/*
 * @Author: duuliy 
 * @Date: 2018-11-15 11:17:11 
 * @Last Modified by: duuliy
 * @Last Modified time: 2018-11-15 11:17:11 
 */


// import {deluser} from '@/utils/user'
/**
     * 独立出来的拦截器
     * @param {Function} axios 请求函数
     */
    const intercept = (axios)=>{
        axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    if(error.response.status == 401){
                        deluser();
                    }else if(error.response.status.startsWith('5')){
                        deluser();
                    }
                }
                return Promise.reject(error.response.data)
            });
    }
    export {
        intercept
    }