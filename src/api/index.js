// import Vue from 'vue'
import Request from './config'

// const Message = Vue.prototype.$message

/**
 * 公用请求
 * @param {object} options { url, method, params, header, config }
 * {
    * url @param {string} 请求地址
    * method @param {string} 请求方法
    * params @param {object} 请求参数
    * headers @param {object} 自定义请求头, 如上传文件 { 'Content-Type': 'multipart/form-data' }
    * config @param {object} 自定义配置项 默认开启请求loading{ showLoading: true }
 * }
 * @returns {promise}
 */
export function sendRequest(options = {}) {
  const {
    url = '/gateway/',
    method = '',
    params = {},
    config = {}
  } = options
  // 是否是url传參(get,delete请求为url传參)
  const isUrlParams = /(get|delete|head)/.test(method)
  // url传参，需传递params参数
  const _params = isUrlParams ? params : {}
  // body传参，需传递data参数
  const _data = isUrlParams ? {} : params
  // url传參(url不能为空)， body传參(url和data参数不能为空)
  // const flag = isUrlParams ? url.length === 0 : url.length === 0 && _data
  // if (flag) return Message({ message: '请求参数丢失', type: 'error' })
  // 构造请求参数
  const baseConfig = { method, url, params: _params, data: _data }
  return new Promise((resolve, reject) => {
    Request({
      ...baseConfig,
      ...config
    }).then((response) => {
      resolve(response)
    }).catch(() => {
      resolve({
        ok: false,
        data: {}
      })
    })
  })
}



// get请求
export function axiosGet(params = {}, config = {}) {
  return sendRequest({
    method: 'get',
    params,
    config
  })
}

// post请求
export function axiosPost(params = {}, config = {}) {
  return sendRequest({
    method: 'post',
    params,
    config
  })
}

// 上传文件
export function uploadFile(params = {}, config = {}) {
  return sendRequest({
    method: 'post',
    params,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    }
  })
}
