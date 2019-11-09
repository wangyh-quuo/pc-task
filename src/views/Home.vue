<template>
  <div>
    <ylt-template>
      <template #content-top>
        <div class="center-top">
          <div class="center-top-list">
            <p class="list-p-1">
              <span>4</span>时
              <span>18</span>分
            </p>
            <p class="list-p-2">学习时间</p>
          </div>
          <div class="center-top-list">
            <p class="list-p-1">
              <span>135</span>题
            </p>
            <p class="list-p-2">做题数</p>
          </div>
          <div class="center-top-list">
            <p class="list-p-1">
              <span>70</span>%
            </p>
            <p class="list-p-2">正确率</p>
          </div>
        </div>
      </template>
      <template #content-center>
        <div class="menu-list">
          <div>
            <div class="menu-list-list" @click="toExercise">
              <img src="@/assets/image/home_yksj.png" alt />
              <p>月考试卷</p>
            </div>
            <div class="menu-list-list" @click="toExercise">
              <img src="@/assets/image/home_xkzt.png" alt />
              <p>学科真题</p>
            </div>
            <div class="menu-list-list" @click="toExercise">
              <img src="@/assets/image/home_pgmk.png" alt />
              <p>评估模考</p>
            </div>
          </div>
          <div>
            <div class="menu-list-list" @click="toExercise">
              <img src="@/assets/image/ztmn.png" alt />
              <p>真题模拟</p>
            </div>
            <div class="menu-list-list" @click="toPracticeTest">
              <img src="@/assets/image/jkmn.png" alt />
              <p>2019机考模拟</p>
            </div>
            <div class="menu-list-list" @click="toExercise">
              <img src="@/assets/image/home_txdx.png" alt />
              <p>特训专享</p>
            </div>
          </div>
        </div>
      </template>
      <template #content-right>
        <div class="bottom-right">
          <div class="bottom-right-top">
            <p>上次做题进度</p>
            <div class="last-time">
              <img src="@/assets/image/test_write.png" alt />
              <p class="last-time-name">代谢与内分泌讲解以及大小肠健康知识讲解···</p>
            </div>
          </div>
          <div class="bottom-right-content">
            <img src="@/assets/image/day_practice.png" alt />
            <p class="brc-p1">每日一练</p>
            <p class="brc-p2">每天二十题，相信坚持的力量。</p>
            <button class="Start-practicing">开始练习</button>
          </div>
        </div>
      </template>
    </ylt-template>
    <choose-list-dialog v-show="visible" @hidden="closeDialog"></choose-list-dialog>
  </div>
</template>

<script>
import yltTemplate from "@/components/common/yltTemplate";
import chooseListDialog from "@/components/dialog/chooseListDialog";
import { mapMutations } from "vuex";
export default {
  data() {
    return { visible: false };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations(["setMenuSideIndex"]),
    initPage() {
      this.setMenuSideIndex(0);
    },
    toPracticeTest() {
      this.$router.push({ name: "practiceLogin" });
    },
    toExercise() {
      //弹出选择框
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    }
  },
  components: {
    yltTemplate,
    chooseListDialog
  }
};
</script>

<style lang="scss" scoped>
.center-top {
  width: 760px;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  .center-top-list {
    width: 252px;
    height: 100%;
    background-color: #fff;
    .list-p-1 {
      font-size: 16px;
      color: #1e1e1e;
      margin-top: 30px;
      span {
        font-size: 28px;
        margin-right: 8px;
      }
    }
    .list-p-2 {
      font-size: 16px;
      color: #999999;
      margin-top: 8px;
    }
  }
}

.menu-list {
  width: 760px;
  height: 520px;
  margin-top: 20px;
  background-color: #fff;
  text-align: center;
  > div {
    width: 760px;
    display: flex;
    flex-direction: row;
  }
  .menu-list-list {
    width: 200px;
    height: 200px;
    margin-top: 40px;
    margin-left: 40px;
    box-shadow: 0px 0px 16px #f0f5f5;
    cursor: pointer;
    img {
      width: 80px;
      height: 80px;
      margin-top: 30px;
    }
    p {
      font-size: 18px;
      color: #1e1e1e;
      margin-top: 20px;
    }
  }
}

.bottom-right {
  top: 88px;
  margin-left: 40px;
  .bottom-right-top {
    width: 200px;
    height: 96px;
    background-color: #fff;
    padding-top: 24px;
    > p {
      font-size: 16px;
      color: #999999;
      text-align: left;
      margin-left: 16px;
    }

    .last-time {
      display: flex;
      flex-direction: row;
      margin-top: 16px;
      img {
        width: 16px;
        height: 16px;
        margin-left: 16px;
        margin-right: 8px;
      }
    }
    .last-time-name {
      width: 70%;
      font-size: 14px;
      color: #1e1e1e;
      line-height: 20px;
      max-height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
  }
  .bottom-right-content {
    width: 200px;
    height: 520px;
    margin-top: 20px;
    background-color: #fff;
    text-align: center;
    img {
      width: 138px;
      height: 150px;
      margin-top: 72px;
    }
    .brc-p1 {
      font-size: 22px;
      color: #1e1e1e;
      margin-top: 40px;
    }

    .brc-p2 {
      width: 85%;
      margin: 20px auto;
      font-size: 16px;
      color: #999999;
      text-align: left;
      line-height: 20px;
    }
    .Start-practicing {
      width: 160px;
      height: 40px;
      border-radius: 20px;
      background-color: #00b395;
      margin-top: 40px;
      border: none;
      font-size: 18px;
      color: #ffffff;
      outline: none;
    }
  }
}
</style>
