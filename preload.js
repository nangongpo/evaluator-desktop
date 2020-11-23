// 用于改写window对象
import { ipcRenderer, remote } from 'electron'

window.ipcRenderer = ipcRenderer
const { print, printToPDF } = remote.getCurrentWebContents()
window.getCurrentWebContents = () => {
  return { print, printToPDF }
}

// 创建
const path = require('path')
const { readJson, readJsonSync } = require('fs-extra')
window.fs = { readJson, readJsonSync }

window.__ipconfig = process.env.NODE_ENV === 'development'
  ? require('./ipconfig.json') 
  : fs.readJsonSync(path.join(process.cwd(), 'ipconfig.json'))

// let templateFilePath = path.join(process.cwd(), '/resources/extraResources', 'template.zip')
// if (process.env.NODE_ENV === 'development') {
//   templateFilePath = path.join(process.cwd(), '/extraResources', 'template.zip')
// }

process.on('unhandledRejection', error => {
  console.error(error)
})
