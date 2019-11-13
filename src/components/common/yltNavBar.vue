<template>
  <div class="nav-bar">
    <div
      class="nav-bar-item"
      :class="currentMode==0?'nav-bar-item-select':''"
      @click.stop="chooseMode(0)"
    >全部</div>
    <div
      class="nav-bar-item"
      :class="currentMode==item.id?'nav-bar-item-select':''"
      v-for="item of modeClassifyList"
      :key="item.id"
      v-text="item.name"
      @click.stop="chooseMode(item.id)"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentMode: 0
    };
  },
  computed: {
    ...mapState(["modeClassifyList"])
  },
  methods: {
    chooseMode(id) {
      this.currentMode = id;
      this.$emit("setCurrentMode", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 72px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.16em;
  .nav-bar-item {
    width: 100px;
    height: 36px;
    font-size: 0.14rem;
    color: #999999;
    line-height: 36px;
    border-radius: 18px;
    background-color: #f0f2f5;
    margin: 0 20px;
    cursor: pointer;
  }
  .nav-bar-item-select {
    background-color: rgba(0, 179, 149, 0.2) !important;
    color: #00b395 !important;
  }
}
</style>