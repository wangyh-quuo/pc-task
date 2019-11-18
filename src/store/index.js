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
    currentIndex: localStorage.getItem("currentIndex") || 0, //当前选择的类别索引
    modeClassifyList: [], //报考类别下的试卷类型模块
    doExamList: [], //做题类别列表
    scoreReport: JSON.parse(localStorage.getItem("scoreReport")) || [], //交卷成绩
    computerExamList: JSON.parse(localStorage.getItem("computerExamList")) || [] //机考列表
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
    setCurrentIndex(state, index) {
      state.currentIndex = index;
      localStorage.setItem("currentIndex", index);
    },
    setmodeClassifyList(state, modeClassifyList) {
      state.modeClassifyList = modeClassifyList;
    },
    setDoExamList(state, doExamList) {
      state.doExamList = doExamList;
    },
    setScoreReport(state, scoreReport) {
      if(state.scoreReport.indexOf(scoreReport)==-1){
        state.scoreReport.push(scoreReport);
      }
      const _scoreReport = JSON.stringify(state.scoreReport);
      localStorage.setItem("scoreReport", _scoreReport);
    },
    setComputerExamList(state, computerExamList) {
      state.computerExamList = computerExamList;
      const _computerExamList = JSON.stringify(computerExamList);
      localStorage.setItem("computerExamList", _computerExamList);
    }
  },
  actions: {},
  modules: {}
});
