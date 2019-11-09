<template>
  <div>
    <ylt-template>
      <template #content-top>
        <div class="content-nav">
          <ylt-nav-bar></ylt-nav-bar>
        </div>
      </template>
      <template #content-center>
        <div class="bottom-right-a-con">
          <!-- 我的错题 -->
          <div v-if="menuSideIndex==2">
            <div class="bottom-right-a-con-item" v-for="item of mistakeList" :key="item">
              <div class="bottom-right-a-con-item-left">消化系统-食管、胃、十二指肠角度看疾病1</div>
              <div class="bottom-right-a-con-item-right-a">
                <p>4题</p>
                <img src="@/assets/image/list_arrow_right.png" alt />
              </div>
            </div>
          </div>
          <!-- 已完成的题目 -->
          <div v-if="menuSideIndex==3">
            <div class="bottom-right-a-con-item" v-for="item of finishList" :key="item">
              <div class="bottom-right-a-con-item-left">消化系统-食管、胃、十二指肠角度看疾病1</div>
              <div class="bottom-right-a-con-item-right-b">查看成绩</div>
            </div>
          </div>
          <!-- 未做完的题目 -->
          <div v-if="menuSideIndex==4">
            <div class="bottom-right-a-con-item" v-for="item of unFinishList" :key="item">
              <div class="bottom-right-a-con-item-left">消化系统-食管、胃、十二指肠角度看疾病1</div>
              <div class="bottom-right-a-con-item-right-c">
                <p>
                  已做：
                  <span>12</span>
                </p>
                <p>
                  未做：
                  <span>18</span>
                </p>
                <div>继续</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ylt-template>
  </div>
</template>

<script>
import yltTemplate from "@/components/common/yltTemplate";
import yltNavBar from "@/components/common/yltNavBar";
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    yltTemplate,
    yltNavBar
  },
  data() {
    return {
      mistakeList: [1, 2, 3, 4, 5],
      finishList: [1, 2, 3, 4, 5],
      unFinishList: [1, 2, 3, 4, 5]
    };
  },
  computed: {
    ...mapState(["menuSideIndex"])
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations(["setMenuSideIndex"]),
    initPage() {}
  },
  beforeRouteEnter(to, from, next) {
    let index = 0;
    switch (to.params.type) {
      case "mistake":
        index = 2;
        break;
      case "finish":
        index = 3;
        break;
      case "notFinish":
        index = 4;
        break;
      default:
        break;
    }
    next(vm => {
      vm.setMenuSideIndex(index);
    });
  }
};
</script>

<style lang="scss" scoped>
.content-nav {
  width: 960px;
}
.bottom-right-a-con {
  width: 100%;
  height: 540px;
  background-color: #fff;
  margin-top: 20px;
}

.bottom-right-a-con-item {
  width: 920px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.bottom-right-a-con-item-left {
  height: 100%;
  line-height: 80px;
  color: #333333;
  font-size: 18px;
}

.bottom-right-a-con-item-right-a {
  height: 100%;
  color: #999999;
  font-size: 14px;
  line-height: 80px;
  display: flex;
  flex-direction: row;
}

.bottom-right-a-con-item-right-a > img {
  height: 14px;
  margin-top: 33px;
  margin-left: 8px;
}

.bottom-right-a-con-item-right-b {
  width: 88px;
  height: 28px;
  margin-top: 26px;
  font-size: 15px;
  line-height: 28px;
  color: #00b395;
  text-align: center;
  border-radius: 15px;
  background-color: rgba(0, 179, 149, 0.23);
}

.bottom-right-a-con-item-right-c {
  height: 100%;
  color: #999999;
  font-size: 14px;
  line-height: 80px;
  display: flex;
  flex-direction: row;
  text-align: center;
}

.bottom-right-a-con-item-right-c > p {
  margin-left: 20px;
}

.bottom-right-a-con-item-right-c > div {
  width: 64px;
  height: 28px;
  margin-top: 26px;
  margin-left: 40px;
  line-height: 28px;
  font-size: 15px;
  color: #00b395;
  border-radius: 15px;
  background-color: rgba(0, 179, 149, 0.23);
}
</style>