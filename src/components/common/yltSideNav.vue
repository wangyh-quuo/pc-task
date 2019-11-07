<template>
  <div class="bottom-left">
    <div class="left-Navigation">
      <div
        class="Navigation-list"
        :class="index==navBarIndex?'left-Navigation__active': ''"
        v-for="(item,index) of navList"
        :key="index"
        @click="changNav(index)"
      >
        <img :src="index==navBarIndex?item.imgUrlChoose:item.imgUrl" alt />
        <p>{{ item.title }}</p>
      </div>
    </div>
    <div class="left-qrCode">
      <img class="qrCode-code" src="@/assets/image/lc_code.png" alt />
      <p class="qrCode-name">下载临床针题库</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: "题库",
          imgUrl: require("@/assets/image/home_tiku_unchoosed.png"),
          imgUrlChoose: require("@/assets/image/home_tiku_choosed.png")
        },
        {
          title: "收藏",
          imgUrl: require("@/assets/image/home_favor_unchoosed.png"),
          imgUrlChoose: require("@/assets/image/home_favor_choosed.png")
        },
        {
          title: "错题集",
          imgUrl: require("@/assets/image/home_errors_unchoosed.png"),
          imgUrlChoose: require("@/assets/image/home_errors_choosed.png")
        },
        {
          title: "已完成",
          imgUrl: require("@/assets/image/home_finished_unchoosed.png"),
          imgUrlChoose: require("@/assets/image/home_finished_choosed.png")
        },
        {
          title: "未完成",
          imgUrl: require("@/assets/image/home_unfinished_unchoosed.png"),
          imgUrlChoose: require("@/assets/image/home_unfinished_choosed.png")
        }
      ],
      navBarIndex: 0
    };
  },
  methods: {
    changNav(index) {
      this.navBarIndex = index;
      //TODO: 跳转到对应页面
      switch (this.navBarIndex) {
        case 0:
          this.$router.push("/")
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        default:
          break;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.bottom-left {
  width: 160px;
  font-size: 16px;
}

.left-Navigation {
  width: 160px;
  background-color: #fff;
}
.left-Navigation__active {
  background-color: #00b395;
}
.left-Navigation__active p {
  color: #fff !important;
}
.Navigation-list {
  width: 160px;
  height: 72px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
}

.Navigation-list-end {
  width: 160px;
  height: 72px;
  display: flex;
  flex-direction: row;
}

.Navigation-list-end img {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: 24px;
}

.Navigation-list img {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-right: 8px;
  margin-top: 24px;
}

.Navigation-list-end p {
  font-size: 16px;
  color: #666666;
  line-height: 72px;
}

.Navigation-list p {
  font-size: 16px;
  color: #666666;
  line-height: 72px;
}

.left-qrCode {
  width: 160px;
  height: 200px;
  margin-top: 40px;
  text-align: center;
  background-color: #fff;
}

.qrCode-code {
  width: 120px;
  height: 120px;
  margin-top: 20px;
}

.qrCode-name {
  font-size: 16px;
  color: #333333;
  margin-top: 12px;
}
</style>