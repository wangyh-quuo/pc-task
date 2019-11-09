import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuSideIndex: 0, //侧边栏位置
    chooseVisible: false, //列表选择框展示
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("user-token")) || {},
    typeList: JSON.parse(localStorage.getItem("typeList")) || [],
    modeClassifyList: [], //报考类别下的试卷类型模块
    doExamList: [], //做题类别列表
  },
  mutations: {
    //设置侧边栏位置
    setMenuSideIndex(state, index) {
      state.menuSideIndex = index;
    },
    setChooseVisible(state, isShow) {
      state.chooseVisible = isShow;
    },
    isLoading(state) {
      state.loading = true;
    },
    loadingSuccess(state) {
      state.loading = false;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      const _userInfo = JSON.stringify(userInfo);
      localStorage.setItem("user-token", _userInfo);
    },
    setTypeList(state, typeList) {
      state.typeList = typeList;
      const _typeList = JSON.stringify(typeList);
      localStorage.setItem("typeList", _typeList);
    },
    setmodeClassifyList(state,modeClassifyList) {
      state.modeClassifyList = modeClassifyList;
    },
    setDoExamList(state,doExamList) {
      state.doExamList = doExamList;
    }
  },
  actions: {
  },
  modules: {}
});
