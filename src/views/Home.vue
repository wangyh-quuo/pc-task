<template>
  <div>
    <ylt-template>
      <template #content-top>
        <div class="center-top">
          <div class="center-top-list">
            <p class="list-p-1">
              <span v-text="learnTime.h"></span>时
              <span v-text="learnTime.m">18</span>分
            </p>
            <p class="list-p-2">学习时间</p>
          </div>
          <div class="center-top-list">
            <p class="list-p-1">
              <span v-text="userInfo.anserSum"></span>题
            </p>
            <p class="list-p-2">做题数</p>
          </div>
          <div class="center-top-list">
            <p class="list-p-1">
              <span v-text="userInfo.rate"></span>%
            </p>
            <p class="list-p-2">正确率</p>
          </div>
        </div>
      </template>
      <template #content-center>
        <div class="menu-list" v-loading="loading">
          <div
            class="menu-list__content"
            @click="popDialog(classify)"
            v-for="classify of modeClassifyList"
            :key="classify.id"
          >
            <img :src="classify.pic" alt />
            <p v-text="classify.name"></p>
          </div>
        </div>
      </template>
      <template #content-right>
        <div class="bottom-right">
          <div class="bottom-right-top">
            <p>上次做题进度</p>
            <div class="last-time" @click="toDoExamPage">
              <img src="@/assets/image/test_write.png" alt />
              <p class="last-time-name" v-text="doExamProgress"></p>
            </div>
          </div>
          <div class="bottom-right-content">
            <img src="@/assets/image/jkmn_side .png" alt />
            <p class="brc-p1">机考模拟</p>
            <p class="brc-p2">真实模拟计算机考试<br/> 合理把控做题时间</p>
            <button class="Start-practicing" @click="toPracticeTest">开始机考</button>
          </div>
        </div>
      </template>
    </ylt-template>
    <choose-list-dialog :classifyId="classifyId" v-show="visible" @hidden="closeDialog"></choose-list-dialog>
  </div>
</template>

<script>
import yltTemplate from "@/components/common/yltTemplate";
import chooseListDialog from "@/components/dialog/chooseListDialog";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      visible: false,
      classifyId: 0 //
    };
  },
  computed: {
    ...mapState(["loading", "userInfo", "modeClassifyList"]),
    //学习时长
    learnTime() {
      return {
        h: parseInt(this.userInfo.learnTime / 3600),
        m: parseInt((this.userInfo.learnTime / 60) % 60)
      };
    },
    doExamProgress() {
      if (this.userInfo.unfinished) {
        return `${this.userInfo.unfinished.title}（共${this.userInfo.unfinished.count}题）`;
      } else {
        return "暂无做题记录";
      }
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations([
      "setMenuSideIndex",
      "setUserInfo",
      "setTypeList",
      "setDoExamList"
    ]),
    initPage() {
      this.setMenuSideIndex(0);
      this.getUserInfo();
      this.getTypeList();
    },
    toPracticeTest() {
      this.$router.push({ name: "practiceLogin" });
    },
    popDialog(classify) {
      //每日一练
      if (classify.dailyPractice) {
        this.$router.push({
          name: "dailyPractice",
          params: { classifyId: classify.id }
        });
        return;
      }
      //请求试题多级列表
      this.getTestTypeList(classify.id);
      //设置classifyId
      this.classifyId = classify.id;
    },
    closeDialog() {
      this.visible = false;
    },
    //请求数据
    getUserInfo() {
      this.api.getUserInfo().then(res => {
        this.setUserInfo(res);
      });
    },
    getTypeList() {
      this.api.getTypeList().then(res => {
        this.setTypeList(res);
      });
    },
    //请求数据
    getTestTypeList(id) {
      this.api.getTestTypeList(id).then(res => {
        const jsonRes = JSON.parse(res);
        this.setDoExamList(jsonRes);
        if (jsonRes.length > 0) {
          //弹出选择框
          this.visible = true;
        } else {
          this.$alert("该题库暂时还没有题哦，敬请期待！", "提示", {
            confirmButtonText: "选择其他类别吧"
          });
        }
      });
    },
    //做题页面
    toDoExamPage() {
      this.$router.push({
        name: "doExercise",
        params: {
          classifyId: this.userInfo.unfinished.mid,
          id: this.userInfo.unfinished.tid
        }
      });
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-evenly;
  width: 760px;
  height: 465px;
  margin-top: 20px;
  background-color: #fff;
  text-align: center;
  .menu-list__content {
    padding: 27px 0 28px;
    margin: 0 20px;
    width: 150px;
    box-shadow: 0px 0px 16px #f0f5f5;
    text-align: center;
    cursor: pointer;
    img {
      width: 56px;
      height: 56px;
      transform: translateX(-6px);
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
    cursor: pointer;
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
    height: 465px;
    margin-top: 20px;
    background-color: #fff;
    text-align: center;
    img {
      width: 138px;
      height: 150px;
      margin-top: 40px;
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
      text-align: center;
      line-height: 24px;
    }
    .Start-practicing {
      width: 160px;
      height: 40px;
      border-radius: 20px;
      background-color: #00b395;
      margin-top: 30px;
      border: none;
      font-size: 18px;
      color: #ffffff;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
