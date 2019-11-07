<template>
  <div class="bottom-right-a-top">
    <div class="bottom-right-a-top-item bottom-right-a-top-item-select">全部</div>
    <div class="bottom-right-a-top-item">学科真题</div>
    <div class="bottom-right-a-top-item">评估模考</div>
    <div class="bottom-right-a-top-item">冲刺提分</div>
    <div class="bottom-right-a-top-item">易错精选</div>
    <div class="bottom-right-a-top-item">历年真题</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bottom-right-a-top {
  width: 100%;
  height: 72px;
  background-color: #fff;
  display: flex;
  text-align: center;
}

.bottom-right-a-top-item {
  width: 100px;
  height: 36px;
  font-size: 16px;
  color: #999999;
  line-height: 36px;
  margin-top: 18px;
  margin-left: 40px;
  border-radius: 18px;
  background-color: #f0f2f5;
}

.bottom-right-a-top-item-select {
  background-color: rgba(0, 179, 149, 0.2) !important;
  color: #00b395 !important;
}
</style>