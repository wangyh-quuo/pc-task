<template>
  <div class="page-404">
    <div>
      <img src="@/assets/image/404.gif" alt />
    </div>
    <div class="back">
      <p class="p">网页被外星人绑走了,HTTP404</p>
      <el-button type="success" @click="toHome">回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style lang="scss" scoped>
.page-404 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .back {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    line-height: 2;
  }
  .p {
    font-size: 20px;
  }
}
</style>