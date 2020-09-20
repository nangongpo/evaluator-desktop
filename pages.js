module.exports = {
  // 多页配置
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: '主页',
      // 窗口的配置参数, https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
      __window: {
        backgroundColor: '#6699cb'
        // focusable: false
      }
    },
    subpage: {
      entry: 'src/subpage/main.js',
      template: 'public/subpage.html',
      title: '评价器系统',
      // 窗口的配置参数
      __window: {
        // width: 500,
        // height: 500,
        x: 800,
        y: 0,
        backgroundColor: '#6699cb'
        // focusable: true
      }
    }
  }
}
