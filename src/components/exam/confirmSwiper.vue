<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <!-- slides -->
    <swiper-slide>
        <div class="icon-group__user">
          <div>
            <img src="@/assets/image/practiceTest/header-icon.png" alt />
          </div>
          <div>
            <img src="@/assets/image/practiceTest/header-icon.png" alt />
          </div>
        </div>
        <div class="instruction">
          <div class="instruction-content">
            <p>姓名:体验考生</p>
            <p>有效证件:test001</p>
            <p>准考证号:test001</p>
            <p>单位信息:</p>
            <p>考场:</p>
          </div>
          <div class="instruction-content">
            <p>考试科目</p>
            <p>试卷名称</p>
            <p>题量:70道</p>
            <p>总分：70分</p>
            <p>考室：</p>
          </div>
        </div>
        <div class="confirm-btn_box">
          <el-button class="confirm-btn">确认</el-button>
        </div>
    </swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <swiper-slide>I'm Slide 4</swiper-slide>
    <swiper-slide>I'm Slide 5</swiper-slide>
    <swiper-slide>I'm Slide 6</swiper-slide>
    <swiper-slide>I'm Slide 7</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(1, 1000, false);
  }
};
</script>

<style lang="scss" scoped>
.box__right {
  position: relative;
  flex: 1;
  .icon-group__user {
    display: flex;
    justify-content: space-around;
    padding-top: 24px;
    img {
      border: 1px dashed #888;
    }
    div {
      height: 280px;
    }
  }
  .instruction {
    display: flex;
    justify-content: space-around;
    .instruction-content {
      width: 50%;
    }
    p {
      padding-left: 10px;
      font-size: 6px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 4.5;
    }
  }
  .confirm-btn_box {
    text-align: center;
  }
  .confirm-btn {
    padding: 8px 14px;
    background: #ccc;
    border: 1px solid #a7a7a7;
    border-radius: 2px;
  }
}
</style>