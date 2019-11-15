<template>
  <div class="page-content">
    <ylt-header></ylt-header>
    <div class="box">
      <div class="page-content__report">
        <div class="report-progress">
          <el-progress
            type="circle"
            :percentage="scoreReport.percent"
            :stroke-width="12"
            :width="160"
            color= "#00b395"
          ></el-progress>
          <p>正确率</p>
        </div>
        <div class="page-content__report-ifo">
          <div class="page-content__report-ifo-top">
            <div class="page-content__report-ifo-top-item">
              <p>{{ scoreReport.reCount }}</p>
              <p>答题总数</p>
            </div>
            <div class="page-content__report-ifo-top-item">
              <p>{{ scoreReport.rightCount }}</p>
              <p>正确数</p>
            </div>
            <div class="page-content__report-ifo-top-item">
              <p>{{ payTime.m }}分{{ payTime.s }}秒</p>
              <p>用时</p>
            </div>
          </div>
          <p class="page-content__report-ifo-bottom content-bottom-report-ifo-top-item">
            您已
            <span>超越{{ scoreReport.percentage }}</span>的用户！继续加油哦！
          </p>
        </div>
      </div>
      <div class="page-content__ifo">
        <div class="page-content__ifo-card">
          <div
            class="page-content__ifo-card-item"
            :class="isDo(item)"
            v-for="(item,index) of answerCardList"
            :key="item.id"
          >{{ index+1 }}</div>
        </div>
        <div class="page-content__ifo-report">
          <div class="page-content__ifo-report-item">
            <div class="isright"></div>
            <p class="isright-p">正确</p>
          </div>
          <div class="page-content__ifo-report-item">
            <div class="notright"></div>
            <p class="notright-p">错误</p>
          </div>
          <div class="page-content__ifo-report-item">
            <div class="notdo"></div>
            <p class="notdo-p">未做</p>
          </div>
        </div>
      </div>
      <div class="page-content__to">
        <div class="page-content__to-item" @click="showAnswer(0)">
          <img src="@/assets/image/report_check_answer.png" alt />
          <p>查看解析</p>
        </div>
        <div class="page-content__to-item" @click="showAnswer(1)">
          <img src="@/assets/image/report_check_wrong.png" alt />
          <p>只看错题</p>
        </div>
        <div class="page-content__to-item" @click="showAnswer">
          <img src="@/assets/image/report_back_list.png" alt />
          <p>做题列表</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yltHeader from "@/components/common/yltHeader";
import { mapState } from "vuex";
export default {
  data() {
    return {
      answerCardList: []
    };
  },
  computed: {
    ...mapState(["scoreReport"]),
    payTime() {
      return {
        m: parseInt(this.scoreReport.useTime / 60),
        s: parseInt(this.scoreReport.useTime % 60)
      };
    },
    isDo() {
      return function(item) {
        if (item.userSelect == "N") {
          return "card-no";
        } else if (item.answer != item.userSelect) {
          return "card-error";
        }
      };
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.getAnswerCard(this.$route.params.id, 0);
    },
    //查看解析
    showAnswer(type) {
      this.$router.push({
        name: "answer",
        params: { id: this.$route.params.id, type: type }
      });
    },
    //请求数据
    getAnswerCard(id, range) {
      this.api
        .getAnswerCard(id, range)
        .then(res => {
          this.answerCardList = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    yltHeader
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 1200px;
  height: 712px;
  margin: 40px auto;
  background-color: #fff;
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  .page-content__report {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .report-progress {
      margin-left: 80px;
      p {
        margin-top: 20px;
        font-size: 24px;
        color: #00b395;
        text-align: center;
      }
    }
    .report-progress /deep/ .el-progress__text {
      font-size: 56px!important;
      color: #00b395;
    }
    .page-content__report-ifo {
      height: 100%;
      margin-left: 40px;
      .page-content__report-ifo-top {
        display: flex;
        flex-direction: row;
        margin-top: 80px;
        .page-content__report-ifo-top-item {
          width: 200px;
          height: 70px;
          border-right: 1px solid #e5e5e5;
          p:nth-child(1) {
            height: 30px;
            line-height: 30px;
            font-size: 24px;
            color: #1e1e1e;
          }
          p:nth-child(2) {
            height: 20px;
            font-size: 20px;
            line-height: 20px;
            color: #999999;
            margin-top: 20px;
          }
        }
      }
      .page-content__report-ifo-bottom {
        margin-top: 55px;
        text-align: left;
        margin-left: 55px;
        font-size: 20px;
        color: #00b395;
        span {
          color: #ff695e;
        }
      }
    }
  }
  .page-content__ifo {
    width: 880px;
    height: 240px;
    background-color: #f0f2f5;
    margin-top: 40px;
    margin-left: 80px;
    display: flex;
    flex-direction: row;
    position: relative;
    .page-content__ifo-card {
      padding: 30px 25px;
      display: flex;
      flex-wrap: wrap;
      height: 180px;
      width: 700px;
      overflow: auto;
    }
  }
  .page-content__ifo-card::-webkit-scrollbar {
    display: none;
  }
  .page-content__ifo-card-item {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #00b395;
    color: #ffffff;
    margin: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  .card-no {
    background: transparent;
    color: #999;
    border: 1px solid #999;
  }
  .card-error {
    background: linear-gradient(0, #ff8f70, #ff7c6e);
  }
  .page-content__ifo-report {
    position: absolute;
    right: 40px;
    top: 40px;
  }
  .page-content__ifo-report-item {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    .isright {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      margin-right: 20px;
      background-color: #00b395;
    }
    .isright-p {
      color: #00b395;
      font-size: 16px;
    }
    .notright {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      margin-right: 20px;
      background: linear-gradient(0, #ff8f70, #ff7c6e);
    }
    .notright-p {
      color: #fa7a73;
      font-size: 16px;
    }
    .notdo {
      box-sizing: border-box;
      height: 20px;
      width: 20px;
      border-radius: 50%;
      margin-right: 20px;
      border: 1px solid #999999;
      background-color: #ffffff;
    }
    .notdo-p {
      color: #999999;
      font-size: 16px;
    }
  }
  .page-content__to {
    width: 880px;
    height: 80px;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-left: 80px;
    margin-top: 48px;
    .page-content__to-item {
      width: 180px;
      height: 64px;
      //box-shadow: 0 0 20px #e1e3e5;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      cursor: pointer;
      img {
        width: 30px;
        height: 30px;
        margin-right: 16px;
      }
      p {
        font-size: 20px;
        color: #333333;
      }
    }
  }
}
</style>