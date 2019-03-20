import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './action'
// import getters from './getters'
import userInfo from './modules/userInfo'
import showLoading from './modules/showLoading'
import ddConfig from './modules/ddConfig'
import pageCache from './modules/pageCache'
import location from './modules/location'


Vue.use(Vuex);

const state = {
  userInfo: {}, // 用户信息
  ddConfig: {}, // 钉钉配置
  showLoading: true // 加载状态
};

export default new Vuex.Store({
	modules:{
		userInfo,
		showLoading,
		ddConfig,
    pageCache,
    location
	}
  // state,
  // getters,
  // actions,
  // mutations,
})