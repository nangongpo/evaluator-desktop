'use strict'
const path = require('path')
const webpack = require('webpack')

const settings = require('./windows')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    // host: '192.168.199.125',
    port: 9527,
    overlay: {
      warnings: false,
      errors: true
    },
    // before: require('./mock/mock-server.js')
    proxy: {
      '/queue/subscribe/': { // /queue/subscribe/
        target: `http://192.168.199.113:8013/queue/subscribe/`, // http://192.168.199.113:8013
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/queue/subscribe/']: ''
        }
      }
    }
  },
  pages: settings.pages,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 配置删除 console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        plugins: [
          // 用于忽略某些特定的模块 /^\.\/locale/, /moment$/
          new webpack.IgnorePlugin(/^\.\/locale/, /moment$/)
        ]
      }
    }
  },
  chainWebpack(config) {
    // 设置目录别名
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      .set('styles', resolve('src/styles'))
      .set('api', resolve('src/api'))

    // preload —— 用来指定页面加载后很快会被用到的资源, 提高首屏加载速度
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])
    config.plugins.delete('preload')
    // prefetch —— 用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容
    config.plugins.delete('prefetch')

    // 去除元素和元素之间的空格，减少文件体积
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    // 配置成功后，调试窗口中源码位置的webpack://根目录下会多出一个src文件夹，里面就有所有的源码了
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV !== 'development',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
    // 如果你想去掉文件名中的 .module
    // requireModuleExtension: false
  },
  pluginOptions: {
    // electron-builder打包配置
    electronBuilder: settings.electronBuilder
  }
}
