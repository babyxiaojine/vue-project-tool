export default {
    getUserInfo: (state) => {
        return state.userInfo;
    },
    getDdConfig:(state) => {
      return state.ddConfig;
    },
    loading: (state) => {
      return state.isShow;
    }
}
