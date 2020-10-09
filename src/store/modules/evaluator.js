const state = {
  noticeInfo: {}
}

const mutations = {
  SET_NOTICE_INFO(state, info = {}) {
    state.noticeInfo = info
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
