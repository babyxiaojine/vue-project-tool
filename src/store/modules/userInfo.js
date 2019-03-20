import {setStore, getStore} from '@/util/utils'
let state = {
  data:{},
  login:false,
  base:{},
  auth:{},
  aliveList:[],
}

// getters
const getters = {
  getUserInfo: (state) => {
      return state.data;
  },
  getBaseInfo: (state) => {
      return state.base;
  },
  getAuthInfo: (state) => {
      return state.auth;
  },
  getdToken: (state) => {
      return state.data.dToken;
  },
  getAlive: (state) => {
      return state.aliveList;
  }
}

// actions
const actions = {
  loadUserData({ commit },data) {
    commit('loadUserDatas', data);
  },
  setUserInfo ({ commit },data) {
    commit('recordUserInfo', data);
  },
  setBaseInfo ({ commit },data) {
    commit('recordBaseInfo', data);
  },
  setAuthInfo ({ commit },data) {
    commit('recordAuthInfo', data);
  },
  clearUserInfo({ commit },data) {
    commit('clearUserInfo', data);
  },
  setAliveList({ commit },data) {
    commit('setAliveInfo', data);
  },
}

// mutations
const mutations = {
  loadUserData({ commit },data) {
    state.data = userInfo;
    state.base = baseInfo;
    state.auth = authInfo;
  },
  recordUserInfo (state, info) {
    state.data = info;
    setStore('userInfo',info)
  },
  recordBaseInfo (state, info) {
    state.base = info;
    setStore('baseInfo',info)
  },
  recordAuthInfo (state, info) {
    state.auth = info;
    setStore('authInfo',info)
  },
  clearUserInfo (state,info){
    state.data={},
    state.login = false;
    setStore('userInfo',info)
  },
  setAliveInfo (state, info) {
    state.aliveList = info;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}