import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import { baseURL } from '../../windows'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    baseURL: baseURL,
    appActive: false,
    noticeInfo: {},
    printInfo: {}
  },
  mutations: {
    SET_APP_ACTIVE(state, bool) {
      state.appActive = bool
    },
    SET_NOTICE_INFO(state, info = {}) {
      state.noticeInfo = info
    },
    SET_PRINT_INFO(state, data = '') {
      state.printInfo = data
    }
  },
  modules,
  getters
})

export default store
