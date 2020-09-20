'use strict'
const path = require('path')
const webpack = require('webpack')
const WorkerPlugin = require('worker-plugin')

const settings = require('./pages')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: 9527,
    overlay: {
      warnings: false,
      errors: true
    }
    // before: require('./mock/mock-server.js')
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     // target: `http://localhost:${port}${process.env.VUE_APP_BASE_API}`,
    //     // target: `http://192.168.1.191:8020${process.env.VUE_APP_BASE_API}`,
    //     target: `http://192.168.1.191:8020${process.env.VUE_APP_BASE_API}`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  },
  pages: settings.pages,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 配置删除 console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      return {
        plugins: [
          new WorkerPlugin(),
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
    // ScriptExtHtmlWebpackPlugin —— script标签添加async defer等属性
    // config
    //   .when(process.env.NODE_ENV !== 'development',
    //     config => {
    //       config
    //         .plugin('ScriptExtHtmlWebpackPlugin')
    //         .after('html')
    //         .use('script-ext-html-webpack-plugin', [{
    //         // `runtime` must same as runtimeChunk name. default is `runtime`
    //           inline: /runtime\..*\.js$/
    //         }])
    //         .end()
    //     }
    //   )
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
  // 打包应用配置
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeModulesPath: ['./node_modules'],
      builderOptions: {
        appId: 'com.evaluator.desktop',
        productName: 'evaluator-desktop',
        copyright: 'Copyright © 2020',
        // directories: {
        //   output: './dist' // 输出文件路径
        // },
        publish: [
          {
            publish: ['github'], // 'generic', // 9f812ddfa3f5bc0b0e7d1cb29dbecfc66a4661a4
            // channel: 'latest',
            // url: 'http://127.0.0.1:9527/dist_electron/'
          }
        ],
        win: {
          icon: './public/favicon.ico',
          target: [
            {
              target: 'nsis',
              arch: ['ia32']
            }
          ],
          asarUnpack: [
            'src/**',
            'README.md'
          ]
        },
        mac: {
          icon: '../public/icon.png'
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/favicon.ico', // 安装图标
          uninstallerIcon: './public/favicon.ico', //卸载图标
          installerHeaderIcon: './public/favicon.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: 'evaluator-desktop' // 图标名称
        }
      }
    }
  }
}
