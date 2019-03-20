let state = {
  data:{}
}

// getters
const getters = {
  getLocation: (state) => {
      return state.data;
  }
}

// actions
const actions = {
  setLocation ({ commit },data) {
    commit('recordLocation', data);
  },
  clearLocation({ commit },data) {
    commit('clearLocation', data);
  },
}

// mutations
const mutations = {
  recordLocation (state, info) {
    state.data = info;
    state.login = true;
  },
  clearLocation (state,info){
    state.data={},
    state.login = false;
  },
  resetLocation (state,editInfo) {
    state.data = {...state.data,...editInfo}
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}