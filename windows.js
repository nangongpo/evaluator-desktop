// __isMainWindow设置主窗口，只能有一个
module.exports = {
  // 服务器地址
  baseURL: 'http://192.168.199.113:8013',
  // 多页配置
  pages: {
    master: {
      entry: 'src/views/master/main.js',
      template: 'public/index.html',
      title: '', // 窗口的标题
      label: '主页', // 菜单的名称
      // 窗口的配置参数, https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
      __window: {
        backgroundColor: '#6699cb'
        // focusable: false
      },
      // 是否为主窗口，控制窗口的关闭
      __isMainWindow: true
    },
    evaluator: {
      entry: 'src/views/evaluator/main.js',
      template: 'public/dialog.html',
      title: '',
      label: '评价器系统',
      // 窗口的配置参数
      __window: {
        width: 400,
        height: 300,
        minimizable: false,
        maximizable: false,
        resizable: false,
        skipTaskbar: false,
        fullscreen: false,
        backgroundColor: '#6699cb'
      }
    },
    'signature-board': {
      entry: 'src/views/signature-board/main.js',
      template: 'public/dialog.html',
      title: '',
      label: '签字板',
      // 窗口的配置参数
      __window: {
        width: 480,
        height: 380,
        minimizable: false,
        maximizable: false,
        resizable: false,
        skipTaskbar: false,
        fullscreen: false,
        backgroundColor: '#fff'
      }
    },
    print: {
      entry: 'src/views/print/main.js',
      template: 'public/dialog.html',
      title: '', // 窗口的标题
      label: '主页', // 菜单的名称
      // 窗口的配置参数, https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
      __window: {
        center: true,
        backgroundColor: '#6699cb'
        // focusable: false
      }
    },
    upgrade: {
      entry: 'src/views/upgrade/main.js',
      template: 'public/dialog.html',
      title: '',
      label: '应用升级',
      // 窗口的配置参数
      __window: {
        width: 400,
        height: 320,
        minimizable: false,
        maximizable: false,
        resizable: false,
        skipTaskbar: false,
        fullscreen: false,
        backgroundColor: '#6699cb'
      }
    }
  },
  // 打包配置
  electronBuilder: {
    preload: 'preload.js',
    nodeModulesPath: ['./node_modules'],
    builderOptions: {
      generateUpdatesFilesForAllChannels: true,
      appId: 'com.evaluator.desktop',
      productName: 'evaluator-desktop',
      artifactName: 'evaluator-desktop-${version}-${arch}.${ext}',
      copyright: 'Copyright©2020',
      extraResources: { // 打包指定资源到安装根目录下
        from: './ipconfig.json',
        to: '../ipconfig.json'
      }, 
      // publish: ['github'],
      publish: {
        provider: 'generic',
        url: 'http://localhost:9527/dist_electron/'
      },
      win: {
        icon: 'public/favicon.ico',
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
        icon: 'public/icon.png'
      },
      nsis: {
        artifactName: 'evaluator-desktop-${version}-${arch}.${ext}',
        oneClick: false, // 是否一键安装
        allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
        allowToChangeInstallationDirectory: true, // 允许修改安装目录
        installerIcon: 'public/favicon.ico', // 安装图标
        uninstallerIcon: 'public/favicon.ico', // 卸载图标
        installerHeaderIcon: 'public/favicon.ico', // 安装时头部图标
        createDesktopShortcut: true, // 创建桌面图标
        createStartMenuShortcut: true, // 创建开始菜单图标
        shortcutName: '评价器系统' // 图标名称
      }
    }
  }
}
