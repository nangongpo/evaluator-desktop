const ipc = window.ipcRenderer
// 窗口通讯
export function connect(winName, eventName, params) {
  ipc.on('response', (event, winID) => {
    if (winID && eventName && params) {
      console.log('connect', winName, winID)
      ipc.sendTo(winID, eventName, params)
    }
    ipc.removeAllListeners(['response'])
  })
  ipc.send('connect', winName)
}
