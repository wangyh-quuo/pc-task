import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuSideIndex: 0, //侧边栏位置
    chooseVisible: false, //列表选择框展示
  },
  mutations: {
    //设置侧边栏位置
    setMenuSideIndex(state,index) {
      state.menuSideIndex = index;
    },
    setChooseVisible(state,isShow){
      state.chooseVisible = isShow;
    }
  },
  actions: {
  },
  modules: {
  }
})
