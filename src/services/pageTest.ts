import request from '@utils/request'

// test

export const getCake = (params?:object, mock = true) => {
  return request('get', '/cakeChart', params, mock)
}