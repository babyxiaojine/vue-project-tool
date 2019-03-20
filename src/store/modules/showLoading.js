let state = {
  isShow:false
}

// getters
const getters = {
  loading: (state) => {
    return state.isShow;
  }
}

// actions
const actions = {
  showLoading ({ commit },data) {
    commit('setLoading', data);
  }
}

// mutations
const mutations = {
  setLoading (state,info) {
    state.isShow = info;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}