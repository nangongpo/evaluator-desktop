// 用于改写window对象
import { ipcRenderer, remote } from 'electron'

window.ipcRenderer = ipcRenderer
window.getCurrentWindow = remote.getCurrentWindow

process.on('unhandledRejection', error => {
  console.error(error)
})
