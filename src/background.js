'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { autoUpdater } from 'electron-updater'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const path = require('path')
const settings = require('../pages')
const isDevelopment = process.env.NODE_ENV !== 'production'

// 上下文菜单, 右键使用
const contextMenu = require('electron-context-menu')
contextMenu({
  prepend: (defaultActions, params, browserWindow) => []
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
// eslint-disable-next-line no-unused-vars
let windows

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true }}
])

// 操作Chromium读取的应用程序的命令行参数 https://www.electronjs.org/docs/api/command-line#commandlineappendswitchswitch-value
// app.commandLine.appendSwitch()

async function createWindow(devPath, prodPath, config = {}) {

  const options = {
    icon: path.join(__static, 'icon.png'), 
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      devTools: !!(process.env.WEBPACK_DEV_SERVER_URL),
      preload: path.join(__dirname, 'preload.js')
    },
    ...config
  }

  // Create the browser window.
  const window = new BrowserWindow(options)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
  // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    // if (!process.env.IS_TEST) window.webContents.openDevTools()
    // 检查更新(测试)
    // autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    // autoUpdater.checkForUpdates()
    // autoUpdater.checkForUpdatesAndNotify()
  } else {
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`)
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
    // 检查更新
    autoUpdater.checkForUpdatesAndNotify()
  }

  createMenu(config.title)

  return window
}

// 设置菜单栏
function createMenu(label) {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [
      {
        label,
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }]
      }]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

// 分发页面到各个窗口
async function dispathPage() {
  ipcMain.removeAllListeners()
  const wins = {}
  const winID = {}
  const pages = settings && settings.pages ? settings.pages : {}
  for (const page in pages) {
    if (!wins[page]) {
      const isIndex = page.indexOf('index') > -1
      const devPath = isIndex ? '' : page
      const config = { title: pages[page].title, ...pages[page].__window }
      wins[page] = await createWindow(devPath, `${page}.html`, config)
      winID[page] = wins[page].id
      wins[page].on('closed', () => {
        wins[page] = null
      })
    }
  }
  addIpcMainEvent(winID)
  return wins
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', (event, hasVisibleWindows) => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.

  if (!hasVisibleWindows) windows = dispathPage()
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
  if (!windows) {
    windows = dispathPage()
  }
  registerLocalResourceProtocol()
})

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

// 从公用文件夹(public)之外加载资源, local-resource://
function registerLocalResourceProtocol() {
  protocol.registerFileProtocol('local-resource', (request, callback) => {
    const url = request.url.replace(/^local-resource:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      return callback(decodedUrl)
    } catch (error) {
      console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error)
    }
  })
}

// 多窗口通讯
function addIpcMainEvent(winID = {}) {
  ipcMain.on('connect', (event, arg) => {
    event.sender.send('connect', winID)
  })
}
