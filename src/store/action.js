import * as types from './types'
export default {
    setUserInfo: ({commit},userInfo) => {
        commit(types.RECORD_USERINFO, userInfo);
    },
    setDdConfig: ({commit},ddConfig) => {
      commit(types.RECORD_DDCONFIG, ddConfig);
    },
    showLoading: ({ commit },isShow) => {
      commit(types.SHOW_LOADING,isShow)
    }
}