<template>
  <div class="ylt-box">
    <ylt-header></ylt-header>
    <div class="page-content">
      <ylt-side-nav></ylt-side-nav>
      <div class="page-content__nav">
        <!-- <ylt-nav-bar></ylt-nav-bar> -->
        <slot name="content-top"></slot>
        <div class="page-content__center">
          <slot name="content-center"></slot>
        </div>
      </div>
      <div>
        <slot name="content-right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import yltHeader from "@/components/common/yltHeader";
import yltSideNav from "@/components/common/yltSideNav";
// import yltNavBar from "@/components/common/yltNavBar";
export default {
  // props: {
  //   visiable: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  components: {
    yltHeader,
    yltSideNav
    // yltNavBar
  }
};
</script>

<style lang="scss" scoped>
.page-content {
  width: 1200px;
  margin: 16px auto;
  display: flex;
  position: relative;
  justify-content: center;  
  .page-content__nav {
    max-width: 1000px;
    height: 632px;
    margin-left: 40px;
    .page-content__center {
      margin-top: 20px;
      min-height: 240px;
      background-color: #fff;
    }
  }
}
</style>