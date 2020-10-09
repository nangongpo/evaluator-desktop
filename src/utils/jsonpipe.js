import jsonpipe from 'jsonpipe'

// http://192.168.199.113:8013/queue/subscribe/

let retryCount = 0

export function noticeRequest(url, options = {}) {
  const { success, data } = options
  return jsonpipe.flow(url, {
    delimiter: '\n',
    success: function(response) {
      if (response) {
        retryCount = response.type === 'heatbeat' ? 0 : retryCount
        const data = response.type === 'heatbeat' ? {} : response
        success && success({
          ok: true,
          ...data
        })
      } else {
        repeatConnect(url, options)
      }
    },
    error: function(errorMsg) {
      repeatConnect(url, options, errorMsg)
    },
    complete: function(statusText) {
      console.log('watch complete', statusText)
    },
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    data,
    disableContentType: false,
    withCredentials: true
  })
}
// 重连三次，每次相隔5秒
function repeatConnect(url, options = {}, errorMsg) {
  const { error } = options
  if (retryCount > 3) {
    return error && error('链接中断')
  }
  retryCount++
  setTimeout(() => {
    error && error(`尝试重连${retryCount}次`)
    noticeRequest(url, options)
  }, 5000)
}
