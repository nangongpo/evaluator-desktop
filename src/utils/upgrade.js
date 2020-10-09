import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

const path = require('path')
const fs = require('fs-extra')
const settings = require('../../windows')
// const packageJSON = require('../../package.json')

// 检测更新
export function checkUpdate(windows) {
  const upgradeWindow = windows['upgrade']
  // 更新前，删除本地安装包
  const updaterCacheDirName = 'electron-admin-updater'
  const updatePendingPath = path.join(autoUpdater.app.baseCachePath, updaterCacheDirName, 'pending')
  fs.emptyDir(updatePendingPath)
  const message = {
    error: '检查更新出错',
    checking: '正在检查更新...',
    updateAva: '检测到新版本，正在下载...',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }
  // 本地开发环境，改变app-update.yml地址
  if (process.env.NODE_ENV === 'development') {
    // autoUpdater.version = packageJSON.version
    if (process.platform === 'darwin') {
      autoUpdater.updateConfigPath = path.join(__dirname, 'mac/evaluator-desktop.app/Contents/Resources/app-update.yml')
    } else {
      autoUpdater.updateConfigPath = path.join(__dirname, 'win-ia32-unpacked/resources/app-update.yml')
    }
  }
  // 设置服务器更新地址
  autoUpdater.setFeedURL(settings.electronBuilder.builderOptions.publish)
  autoUpdater.on('error', function(error) {
    console.log('error', error)
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', function() {
    sendUpdateMessage(message.checking)
  })
  // 准备更新，打开进度条读取页面，关闭其他页面
  autoUpdater.on('update-available', function() {
    sendUpdateMessage(message.updateAva)
    for (const window in windows) {
      if (windows[window]) {
        if (window !== 'upgrade') {
          windows[window].removeAllListeners(['close'])
          windows[window].close()
        } else {
          windows[window].show = true
        }
      }
    }
  })
  // 当前没有可用更新
  autoUpdater.on('update-not-available', function() {
    sendUpdateMessage(message.updateNotAva)
  })
  // 更新下载进度
  autoUpdater.on('download-progress', function(progressObj) {
    upgradeWindow && upgradeWindow.webContents.send('download-progress', parseInt(progressObj.percent))
  })
  // 更新完成，重启应用
  autoUpdater.on('update-downloaded', function(event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    ipcMain.on('isUpdateNow', (e, arg) => {
      // some code here to handle event
      autoUpdater.quitAndInstall()
    })
    upgradeWindow && upgradeWindow.webContents.send('isUpdateNow')
  })
  ipcMain.on('checkForUpdate', () => {
    // 执行自动更新检查
    autoUpdater.checkForUpdates()
  })
  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage(message) {
    upgradeWindow && upgradeWindow.webContents.send('message', message)
  }
  // 触发更新
  autoUpdater.checkForUpdates()
}
