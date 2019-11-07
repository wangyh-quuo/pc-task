<template>
  <div class="content-top">
    <div class="top-content">
      <img class="logo" src="@/assets/image/ylt_logo.png" alt />
      <div class="top-Navigation" @click="openMenu">
        <div class="select-a">
          <p class="Medical-type">临床执业助理医师</p>
          <img class="select-Medical-type" :src="arrowImg" alt />
        </div>
      </div>
      <div class="top-information">
        <p class="ifo-iphone">18802020395</p>
        <img class="ifo-avatar" src="@/assets/image/home_pgmk.png" alt />
      </div>
    </div>
    <!-- 分类 -->
    <div class="select-list" v-show="meunShow">
      <div class="list-top">
        <div>临床执业医师</div>
        <div>临床执业助理医师</div>
        <div>乡村全科执业助理医师</div>
        <div>中医执业医师</div>
      </div>
      <div class="list-bottom">
        <div>中医执业助理医师</div>
        <div>执业中药师</div>
        <div>职业西药师</div>
        <div>口腔执业助理医师</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meunShow: false
    };
  },
  computed: {
    arrowImg() {
      return this.meunShow
        ? require("@/assets/image/choose_arrow.png")
        : require("@/assets/image/choose_arrow_up.png");
    }
  },
  methods: {
    openMenu() {
      this.meunShow = !this.meunShow;
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
  position: absolute;
  z-index: 10;
  width: 760px;
  height: 132px;
  font-size: 16px;
  left: 50%;
  top: 72px;
  transform: translateX(-50%);
  background-color: #00b295;
}

.list-top,
.list-bottom {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  height: 36px;
}

.list-top div,
.list-bottom div {
  height: 36px;
  line-height: 36px;
  padding-right: 16px;
  padding-left: 16px;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-left: 10px;
  margin-right: 10px;
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