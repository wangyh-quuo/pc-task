<template>
  <div class="content-top">
    <div class="top-content">
      <img class="logo" src="@/assets/image/ylt_logo.png" @click="toYlt" />
      <div class="top-Navigation" @click="openMenu">
        <div class="select-a">
          <p class="Medical-type">{{ typeList[currentIndex].name }}</p>
          <img class="select-Medical-type" :src="arrowImg" alt />
        </div>
      </div>
      <div class="top-information">
        <p class="ifo-iphone" v-text="userInfo.name">telephone</p>
        <img class="ifo-avatar" :src="userInfo.headPortrait" alt />
      </div>
    </div>
    <!-- 分类 -->
    <div class="select-list" v-show="menuShow">
      <div
        class="select-list__item"
        :class="currentIndex==index?'select-list__active':''"
        v-for="(type,index) of typeList"
        :key="type.id"
        v-text="type.name"
        @click="chooseType(type.id,index)"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      menuShow: false //显示类别下拉选择
    };
  },
  computed: {
    ...mapState(["userInfo", "typeList", "currentIndex"]),
    arrowImg() {
      return this.menuShow
        ? require("@/assets/image/choose_arrow.png")
        : require("@/assets/image/choose_arrow_up.png");
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations([
      "setmodeClassifyList",
      "setCurrentIndex",
      "isLoading",
      "loadingSuccess"
    ]),
    initPage() {
      //进入请求当前列表下的试题列表
      const type = this.typeList[this.currentIndex];
      this.getModeClassifyList(type.id);
    },
    openMenu() {
      this.menuShow = !this.menuShow;
    },
    closeMenu() {
      this.menuShow = false;
    },
    toYlt() {
      if(this.$route.name=='home'){
        location.href = "https://www.zgylt.com";
      }else {
        this.$router.push({name: 'home'})
      }
    },
    //选择类别
    chooseType(id, index) {
      this.setCurrentIndex(index);
      //请求该类别下的所有试题列表分类
      this.getModeClassifyList(id);
    },
    /**
     * 获取列表下的试题类型列表
     */
    getModeClassifyList(id) {
      this.isLoading();
      this.closeMenu();
      this.api.getModeClassifyList(id).then(res => {
        this.setmodeClassifyList(res);
        setTimeout(() => {
          this.loadingSuccess();
        }, 500);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content-top {
  width: 100%;
  height: 72px;
  background-color: #00b295;
}

.top-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}

.top-Navigation {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.select-a {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}

.select-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  z-index: 10;
  top: 72px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 30px;
  width: 700px;
  font-size: 16px;
  background-color: #00b295;
}

.select-list__item {
  margin: 8px 10px;
  padding: 0 16px;
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
}
.select-list__active {
  color: #00b295;
  background-color: #fff;
}
.Medical-type {
  height: 100%;
  line-height: 72px;
  font-size: 18px;
  color: #ffffff;
}

.select-Medical-type {
  height: 24px;
  width: 24px;
  margin-left: 8px;
  margin-top: 24px;
}

.top-information {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.ifo-iphone {
  line-height: 72px;
  font-size: 18px;
  color: #ffffff;
}

.ifo-avatar {
  height: 48px;
  width: 48px;
  margin-top: 12px;
  border-radius: 55px;
  margin-left: 16px;
}
</style>