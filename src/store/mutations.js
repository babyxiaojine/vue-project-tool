import {
  RECORD_USERINFO,
  RETSET_USERINFO,
  GET_USERINFO,
  RECORD_DDCONFIG,
  GET_DDCONFIG,
  SHOW_LOADING
} from './types.js'

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
  },
  //修改用户信息
  [RETSET_USERINFO](state,editInfo) {
    state.userInfo = Object.assign({}, state.userInfo,{editInfo})
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
    } else {
      state.userInfo = null;
    }
  },
  //保存钉钉配置信息
  [RECORD_DDCONFIG](state, ddConfig) {
    state.ddConfig = ddConfig;
  },
  //加载动画
  [SHOW_LOADING](state,isShow){
    state.showLoading = isShow;
  }

}