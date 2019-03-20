let state = {
  data:{}
}

// getters
const getters = {
  getDdConfig:(state) => {
    return state.data;
  }
}

// actions
const actions = {
  setDdConfig ({ commit },data) {
    commit('recordDDConfig', data);
  }
}

// mutations
const mutations = {
  recordDDConfig (state,info) {
    state.data = info;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}