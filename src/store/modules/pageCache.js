let state = {
  data:{},
  flowFormData: {},
  collectParam: {},
  monthPoints: {},
  calcStoreSelect: {}//定店测算参考门店
}

// getters
const getters = {
  getCache: (state) => {
    const cache = {...state.data};
    return cache;
  }
}

// actions
const actions = {
  setData ({ commit },data) {
    commit('recordCache', data);
  },
  clear({ commit },data) {
    commit('clearCache', data);
  },
}

// mutations
const mutations = {
  recordCache (state, data) {
    const keys = Object.keys(data)[0];
    state[keys] = {...state[keys],...data[keys]};
  },
  clearCache (state,info){
    state[info]= {};
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}