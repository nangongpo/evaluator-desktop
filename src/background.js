'use strict'

import { app, protocol } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { appSelfStart, dispathPage, addIpcMainEvent, registerLocalResourceProtocol } from './utils/master-process'
// import { checkUpdate } from './utils/upgrade'

appSelfStart()

const isDevelopment = process.env.NODE_ENV !== 'production'

// 上下文菜单, 右键使用
const contextMenu = require('electron-context-menu')
contextMenu({
  prepend: (defaultActions, params, browserWindow) => []
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// eslint-disable-next-line no-unused-vars
const windows = {}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true }}
])

// 操作Chromium读取的应用程序的命令行参数 https://www.electronjs.org/docs/api/command-line#commandlineappendswitchswitch-value
// app.commandLine.appendSwitch()

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async(event, hasVisibleWindows) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!hasVisibleWindows) {
    await dispathPage(windows)
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
  }

  if (windows !== {}) {
    await dispathPage(windows)
    addIpcMainEvent(windows)
  }
  // 检查更新
  // checkUpdate(windows)

  registerLocalResourceProtocol()
})

// export function registShortCommand () {
//   globalShortcut.register('CommandOrControl+Alt+K', function () {
//     dialog.showMessageBox({
//       type: 'info',
//       message: '成功!',
//       detail: '你按下了一个全局注册的快捷键绑定.',
//       buttons: ['好的']
//     })
//   })
// }

// app.on('will-quit', () => {
//   globalShortcut.unregisterAll()
// })


// 主线程事件
// function addIpcMainEvent(winID) {
//   // 移除事件
//   ipcMain.removeAllListeners()
//   // 窗口共享id
//   if (winID) {
//     ipcMain.on('connect', (event, arg) => {
//       event.sender.send('connect', winID)
//     })
//   } else {
//     ipcMain.removeAllListeners(['connect'])
//   }
//   // 应用更新
  
// }

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

