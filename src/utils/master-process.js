import { app, BrowserWindow, globalShortcut, Menu, protocol, ipcMain } from 'electron'

const path = require('path')
const settings = require('../../windows')
const pages = settings && settings.pages ? settings.pages : {}

// 开机自启
export function appSelfStart() {
  const exeName = path.basename(process.execPath)
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: false,
    path: process.execPath,
    args: [
      '--processStart', `"${exeName}"`
    ]
  })
}

// 创建窗口
export async function createWindow(devPath, prodPath, config = {}) {
  const options = {
    icon: path.join(__static, 'icon.png'),
    ...config,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      devTools: !!(process.env.WEBPACK_DEV_SERVER_URL),
      preload: path.join(__dirname, 'preload.js'),
      ...config.webPreferences
    }
  }
  // Create the browser window.
  const window = new BrowserWindow(options)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    window.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath)
    // if (!process.env.IS_TEST) window.webContents.openDevTools()
  } else {
    // Load the index.html when not in development
    window.loadURL(`app://./${prodPath}`)
  }

  createMenu(config.label)

  return window
}

// 设置mac菜单栏、window任务栏
function createMenu(label) {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [
      {
        type: 'checkbox',
        label: '开机启动',
        checked: app.getLoginItemSettings().openAtLogin,
        click: function() {
          if (!app.isPackaged) {
            app.setLoginItemSettings({
              openAtLogin: !app.getLoginItemSettings().openAtLogin,
              path: process.execPath
            })
          } else {
            app.setLoginItemSettings({
              openAtLogin: !app.getLoginItemSettings().openAtLogin
            })
          }
        }
      },
      {
        label,
        submenu: [
          {
            role: 'about'
          },
          {
            role: 'quit'
          }
        ]
      }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}

// 设置多窗口
export async function dispathPage(windows) {
  // console.log(pages)
  for (const page in pages) {
    const currentWin = windows && windows[page]
    if (!currentWin) {
      const devPath = page === 'index' ? '' : page
      const { title, label } = pages[page]
      const config = { title, label, ...pages[page].__window, show: pages[page].__isMainWindow }
      windows[page] = await createWindow(devPath, `${page}.html`, config)
      windows[page].webContents.on('did-finish-load', () => {
        windows[page].webContents.send('app-show', page)
      })
      windows[page].on('show', (event) => {
        event.sender.webContents.send('app-show', page)
      })
      // console.log(`窗口${page}`, wins[page].id)
      windows[page].on('close', (event) => {
        // 主窗口关闭，其他窗口全部关闭
        if (pages[page].__isMainWindow) {
          for (const window in windows) {
            windows[window] && windows[window].destroy()
          }
          windows = {}
        } else {
          windows[page].hide()
          event.preventDefault()
        }
      })
      windows[page].on('closed', (event) => {
        if (pages[page].__isMainWindow) {
          for (const window in windows) {
            windows[window] && windows[window].removeAllListeners(['close'])
          }
          windows = {}
          app.quit()
        }
      })
      // 在开发环境和生产环境均可通过快捷键打开devTools
      globalShortcut.register('CommandOrControl+Shift+F12', () => {
        windows[page].isFocused() && windows[page].webContents.openDevTools()
      })
    }
  }
  // return new Promise((resolve, reject) => {
  //   resolve(windows)
  // })
}

// 注册ipcMain事件
export function addIpcMainEvent(windows = {}) {
  ipcMain.removeAllListeners()
  ipcMain.on('connect', (event, winName) => {
    const winID = windows[winName] ? windows[winName].id : null
    return event.sender.send('response', winID)
  })
  ipcMain.on('open-dialog', async(event, winName, args) => {
    if (pages[winName]) {
      windows[winName].show()
      args && windows[winName].webContents.send('visibility', args)
    }
  })
  ipcMain.on('close-dialog', async(event, winName) => {
    if (pages[winName]) {
      windows[winName].hide()
    }
  })
  ipcMain.on('get-printers', async(event, winName) => {
    if (pages[winName]) {
      const printerList = windows[winName].webContents.getPrinters()
      event.sender.send('printers', printerList)
    }
  })
}

// 从公用文件夹(public)之外加载资源, local-resource://
export function registerLocalResourceProtocol() {
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

