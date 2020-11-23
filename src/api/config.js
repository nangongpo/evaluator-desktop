import Vue from 'vue'
import axios from 'axios'
import settings from '../../windows'

// const Message = Vue.prototype.$message
// const Confirm = Vue.prototype.$confirm

// 创建axios实例 (VUE_APP_BASE_API 开发环境的配置在 .env.development、生产环境的配置在 .env.production)
// const domain = process.env.NODE_ENV === 'production' ? '' : ''
const service = axios.create({
  baseURL: settings.server,
  withCredentials: false // 跨域请求携带cookies
})

let loading // 定义loading变量
let needLoadingRequestCount = 0 // needLoadingRequestCount为 0 时，结束 loading

function startLoading(options = {}) {
  //使用Element loading-start 方法
  if (options.show) {
    loading = Vue.prototype.$loading({
      lock: true,
      text: '加载中…',
      background: 'rgba(0, 0, 0, 0.7)',
      ...options
    })
  }
}
// 请求次数为0时，尝试关闭Loading
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    // 使用Element loading-close 方法
    loading && loading.close()
  }
}

export function showFullScreenLoading(options) {
  if (needLoadingRequestCount === 0) {
    startLoading(options)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    // 延迟 300ms 再调用 tryCloseLoading
    tryCloseLoading()
    // debounce(tryCloseLoading, 300)()
  }
}

// export function messageTip(msg, code, type) {
//   const codeRules = {
//     1005: '您已经登出，您可以取消停留在此页面，或再次登录'
//   }
//   if (code === '1005') {
//     return Confirm(codeRules[code], '确认注销', {
//       confirmButtonText: '重新登录',
//       cancelButtonText: '取消',
//       closeOnClickModal: false,
//       type: 'warning'
//     }).then(() => {
//       store.dispatch('user/logout').then(() => {
//         window.location.reload()
//       })
//     })
//   }
//   msg && Message({
//     message: codeRules[code] || msg,
//     type,
//     duration: 5 * 1000
//   })
// }

// 请求拦截器
service.interceptors.request.use(
  config => {
    // if (store.state.user.token) {
    //   config.headers['token'] = store.state.user.token
    // }
    // config.headers['sign'] = sha256(config.data)
    // config.data['sign'] = sha256(config.data)
    showFullScreenLoading(config.loading)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    tryHideFullScreenLoading(response.config.loading)
    if (!response || !response.data) return { ok: false, msg: '请求无响应' }
    return {
      ok: true,
      data: response
    }
    // const { data_type, response_data = {}, msg } = response.data
    // const reponseOk = data_type === '1'
    // // const messageType = reponseOk ? 'info' : 'error'

    // if (data_type === '3') {
    //   window.location.href = 'about:blank'
    //   window.close()
    //   return
    // }
    // // messageTip(msg, code, messageType)
    // return {
    //   ok: reponseOk,
    //   data: response_data || response,
    //   msg,
    //   response
    // }
  },
  error => {
    console.log('err' + error) // for debug
    tryHideFullScreenLoading()
    // const status = error.response.status
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
