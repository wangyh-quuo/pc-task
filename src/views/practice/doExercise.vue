<template>
  <div class="page-box">
    <ylt-header></ylt-header>
    <!-- 题目 -->
    <section class="exam-box">
      <div class="exam-list_box">
        <div class="exam-list_content" v-for="(item,index1) of examList" :key="item.id">
          <transition>
            <div v-show="currentIndex==index1">
              <div class="exam-title">
                <h2 style="font-size: 20px;">消化系统</h2>
                <span
                  class="collection el-icon-star-on"
                  :style="item.isCollection?{color:'#ffdd46'}:{color: '#e1e3e6'}"
                  @click.stop="addCollection(item.id,$event)"
                ></span>
              </div>
              <div class="exam-type__box">
                <h2 class="exam-type" v-text="item.questionType"></h2>
                <p style="margin-right: 40px;">
                  <span style="color: #00b395;">{{ index1+1 }}</span>/
                  <span>{{ examLength }}</span>
                </p>
              </div>
              <div class="exam-headline" v-html="removeStyleFont(item.stem)"></div>
              <div
                class="exam-option"
                v-for="(option,index2) of item.option"
                :key="index2"
                @click="chooseAnswer(index1,item.id,index2,item.answer)"
                :style="cardList[index1]==index2?{'background-color': '#f7f8fa'}:''"
              >
                <div
                  class="exam-option__index"
                  :class="cardList[index1]==index2?'exam-option__index__active':''"
                >{{ String.fromCharCode(0x41+index2) }}</div>
                <div
                  v-html="removeStyleFont(option)"
                  class="exam-option__detail"
                  :class="cardList[index1]==index2?'exam-option__detail__active':''"
                ></div>
              </div>
            </div>
          </transition>
        </div>
        <div class="button-box">
          <button :class="firstExam" @click="lastExam">
            <i class="el-icon-arrow-left"></i>
            上一题
          </button>
          <button class="button-active" @click="nextExam">
            下一题
            <i class="el-icon-arrow-right"></i>
          </button>
        </div>
      </div>
      <!-- 答题卡 -->
      <div class="exam-card_box">
        <p class="exam-card_time">{{ distance.h }}:{{ distance.m }}:{{ distance.s }}</p>
        <div class="exam-card_content">
          <div class="exam-card_title">
            <h2>答题卡</h2>
            <p>共{{ examLength }}题</p>
          </div>
          <!-- 答题卡内容 -->
          <div class="exam-card_index">
            <span
              :class="cardList[index]!=null?'card-active':''"
              v-for="(item,index) of examLength"
              :key="item"
              @click="currentIndex=index"
            >{{ item }}</span>
          </div>
          <div class="exam-card_tips">
            <div style="color: #00b395;">
              <span class="icon_ok"></span>
              <span>已做</span>
            </div>
            <div style="color: #999;">
              <span class="icon_no"></span>
              <span>未做</span>
            </div>
          </div>
        </div>
        <div v-show="false">
          <el-button>所有解析</el-button>
          <el-button>只看错题</el-button>
        </div>
        <div class="submit-test">
          <el-button @click="submitExam">交卷</el-button>
        </div>
      </div>
    </section>
    <!-- 解析 -->
    <section></section>
  </div>
</template>

<script>
import yltHeader from "@/components/common/yltHeader";
import { mapState, mapMutations } from "vuex";
import { nextTick } from "q";
export default {
  data() {
    return {
      examList: [], //试题列表
      currentIndex: 0, //当前试题索引
      examLength: 0, //试题总数量
      answerList: [], //用户选择答案列表
      cardList: [], //答题卡内容
      lastAnswerCardList: [], //上次做题记录
      payTime: 0, //费时
      timer: null,
      records: [], // 本地做题记录
      isSaveLocalStorage: false, //是否数据存储在本地
      isQuit: true //是否离开页面
    };
  },
  mounted() {
    nextTick(() => {
      this.initPage();
    });
  },
  computed: {
    //...mapState(["userInfo", "typeList", "currentIndex"]),
    ...mapState({
      userInfo: "userInfo",
      typeList: "typeList",
      currentTypeIndex: "currentIndex"
    }),
    //第一题禁止按钮
    firstExam() {
      return this.currentIndex == 0 ? "button-disabled" : "button-active";
    },
    //计时器
    distance() {
      return {
        h: this.formatTime(parseInt((this.payTime / 3600) % 24)),
        m: this.formatTime(parseInt((this.payTime / 60) % 60)),
        s: this.formatTime(parseInt(this.payTime % 60))
      };
    }
  },
  methods: {
    ...mapMutations(["setScoreReport"]),
    initPage() {
      //获得做题列表
      this.getTestDetails(this.$route.params.id);
    },
    restoreData() {
      //从localStorage取回数据(做题记录)
      try {
        this.records = JSON.parse(localStorage.getItem("doExamRecord")) || [];
        //如果是当前试卷，则还原数据
        for (const record of this.records) {
          if (
            record.id ==
            `${this.$route.params.classifyId}/${this.$route.params.id}`
          ) {
            this.cardList = record.cardList;
            this.payTime = record.payTime;
            this.currentIndex = record.currentIndex;
            this.answerList = record.answerList;
            this.isSaveLocalStorage = true;
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
      //获得上次做题记录
      if (this.lastAnswerCardList.length == this.examLength) {
        this.examList = this.lastAnswerCardList;
        for (let i = 0; i < this.examLength; i++) {
          if (this.examList[i].userSelect != "N") {
            this.$set(this.cardList, i, i);
            this.answerList[i].userSelect = this.examList[i].userSelect;
          }
        }
      }
    },
    //请求数据
    async getTestDetails(id) {
      this.examList = await this.api.getTestDetails(id);
      this.examLength = this.examList.length;
      //开启定时器
      this.timer = setInterval(() => {
        this.payTime++;
      }, 1000);
      //初始化答题卡
      for (let i = 0; i < this.examList.length; i++) {
        this.answerList[i] = {
          index: i,
          id: this.examList[i].id,
          userSelect: "N",
          rightOption: this.examList[i].answer
        };
      }
      //恢复数据
      this.lastAnswerCardList = await this.getLastRecords(
        this.$route.query.id,
        0
      );
      this.restoreData();
    },
    removeStyleFont(content) {
      return content.replace(/style="\S+"/g, "");
    },
    //格式化时间 00
    formatTime(date) {
      return date > 9 ? date : `0${date}`;
    },
    //上一题
    lastExam() {
      if (this.currentIndex == 0) {
        this.$message({
          type: "info",
          message: "这是第一题!"
        });
        return;
      }
      this.currentIndex--;
    },
    //下一题
    nextExam() {
      if (this.currentIndex == this.examLength - 1) {
        this.submitExam();
        return;
      }
      this.currentIndex++;
    },
    /**
     * 选择答案
     * @param { Number } index 索引
     * @param { Number } id 题目id
     * @param { Number } userSelect 用户选择
     * @param { Number } rightOption 正确答案
     */
    chooseAnswer(index, id, userSelect, rightOption) {
      if (!this.answerList[index]) {
        this.answerList[index] = {};
      }
      //封装答案
      this.answerList[index] = {
        index,
        id,
        userSelect: String.fromCharCode(0x41 + userSelect),
        rightOption
      };
      if (!this.cardList[index]) {
        this.$set(this.cardList, index, "");
      }
      //填充答题卡
      this.$set(this.cardList, index, userSelect);
      setTimeout(() => {
        this.nextExam();
      }, 500);
    },
    /* 交卷     */
    submitExam() {
      let rquestModel = {
        complete: true, //保存做题记录
        moduleTypeId: this.typeList[this.currentTypeIndex].id,
        useTime: this.payTime,
        answerSheets: this.answerList,
        mid: this.$route.params.classifyId
      };
      //TODO: 提交试卷
      if (this.cardList.length != this.examLength) {
        rquestModel.complete = false; //未做完
        this.$confirm("您还有未做的题, 是否继续提交试卷?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.requestSubmitExam(this.$route.params.id, rquestModel);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      } else {
        this.$confirm("是否提交试卷?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.requestSubmitExam(this.$route.params.id, rquestModel);
          })
          .catch(() => {
            return;
          });
      }
    },
    requestSubmitExam(id, rquestModel) {
      this.api.submitTest(id, rquestModel).then(res => {
        this.setScoreReport(res);
        this.$message({
          type: "success",
          message: "交卷成功!"
        });
        this.isQuit = false;
        this.$router.push({
          name: "report",
          params: {
            testId: this.$route.params.id,
            id: res.id
          },
          query: {
            classifyId: this.$route.params.classifyId
          }
        });
      });
    },
    addCollection(id, el) {
      this.api
        .addCollection(id)
        .then(res => {
          this.$message({
            type: "success",
            message: res.message
          });
          if (el.target.style.color == "rgb(255, 221, 70)") {
            el.target.style.color = "#e1e3e6";
          } else if (el.target.style.color == "rgb(225, 227, 230)") {
            el.target.style.color = "#ffdd46";
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "出错了!"
          });
        });
    },
    //获得上次做题结果
    async getLastRecords(id, range) {
      if (id) {
        return await this.api.getAnswerCard(id, range);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if(this.isQuit){
      if (this.cardList.length != this.examLength) {
        this.$confirm(
          "您的答题记录尚未提交，未提交下次则重新开始, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //离开前保存数据
            if (!this.isSaveLocalStorage) {
              this.records.push({
                id: `${from.params.classifyId}/${from.params.id}`,
                payTime: this.payTime,
                currentIndex: this.currentIndex,
                cardList: this.cardList,
                answerList: this.answerList
              });
            } else {
              for (let i = 0; i < this.records.length; i++) {
                if (
                  this.records[i].id ==
                  `${from.params.classifyId}/${from.params.id}`
                ) {
                  this.records[i] = {
                    id: `${from.params.classifyId}/${from.params.id}`,
                    payTime: this.payTime,
                    currentIndex: this.currentIndex,
                    cardList: this.cardList,
                    answerList: this.answerList
                  };
                  break;
                }
              }
            }
            localStorage.setItem("doExamRecord", JSON.stringify(this.records));
            next();
          })
          .catch(err => {
            console.log(err);
            next(false);
          });
      } else {
        next();
      }
    }else {
      next();
    }
  },
  components: {
    yltHeader
  }
};
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  background-color: #f0f2f5;
  .exam-box {
    display: flex;
    justify-items: center;
    margin: 16px auto;
    width: 1200px;
    .exam-list_box {
      position: relative;
      width: 760px;
      min-height: 400px;
      background: #fff;
      .exam-list_content {
        padding-left: 40px;
        .exam-title {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          font-size: 20px;
          color: #1e1e1e;
          .collection {
            position: absolute;
            right: 40px;
            font-size: 24px;
            cursor: pointer;
          }
        }
        .exam-type__box {
          display: flex;
          align-items: center;
          .exam-type {
            flex: 1;
            padding: 20px 0;
            font-size: 18px;
            color: #00b295;
          }
        }
        .exam-headline {
          margin-bottom: 16px;
          margin-right: 20px;
          font-size: 20px;
          color: #1e1e1e;
          font-weight: bold;
          line-height: 28px;
        }
        .exam-option {
          display: flex;
          align-items: center;
          padding: 20px 0;
          margin-right: 20px;
          font-size: 18px;
          color: #666;
          cursor: pointer;
          .exam-option__index {
            box-sizing: border-box;
            min-width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            border: 1px solid #666;
            border-radius: 50%;
            cursor: pointer;
          }
          .exam-option__index__active {
            color: #fff;
            background: linear-gradient(0, #ffd073, #ffca4f);
            border: none;
          }
          .exam-option__detail {
            margin-left: 20px;
            line-height: 1.5;
          }
          .exam-option__detail__active {
            color: #ffd073;
          }
        }
        .exam-option:hover {
          background: #f2f4f7;
        }
      }
      .button-box {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-around;
        width: 500px;
        font-size: 14px;
        button {
          -webkit-appearance: none;
        }
      }
      .button-disabled {
        width: 120px;
        height: 36px;
        color: #999;
        background-color: #f0f2f5;
        border: none;
        border-radius: 4px;
      }
      .button-active {
        width: 120px;
        height: 36px;
        color: #fff;
        background-color: #00b395;
        border: none;
        border-radius: 4px;
      }
    }
    .exam-card_box {
      margin-left: 40px;
      flex: 1;
      width: 400px;
      padding: 0 20px;
      min-height: 400px;
      background: #fff;
      .exam-card_time {
        height: 56px;
        line-height: 56px;
        font-size: 16px;
        color: #666;
        text-align: center;
      }
      .exam-card_content {
        padding: 0 15px 40px;
        background: #f5f7fa;
      }
      .exam-card_title {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 20px 0;
        font-size: 20px;
        color: #1e1e1e;
        p {
          position: absolute;
          right: 25px;
          font-size: 16px;
          color: #999;
        }
      }
      .exam-card_index {
        display: flex;
        align-items: center;
        align-content: flex-start;
        flex-wrap: wrap;
        height: 300px;
        overflow: auto;
        span {
          box-sizing: border-box;
          margin: 20px 15px 0;
          width: 36px;
          height: 36px;
          font-size: 16px;
          line-height: 36px;
          color: #00b395;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #00b395;
          cursor: pointer;
        }
        .card-active {
          background: #00b395;
          color: #fff;
        }
      }
      .exam-card_index::-webkit-scrollbar {
        display: none;
      }
      .exam-card_tips {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 40px;
        div {
          display: flex;
          align-items: center;
          margin-left: 20px;
        }
        span {
          box-sizing: border-box;
          margin: 0 4px;
        }
        .icon_ok {
          width: 18px;
          height: 18px;
          background-color: #00b395;
          border-radius: 50%;
        }
        .icon_no {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1px solid #00b395;
        }
      }
      .submit-test {
        /deep/ .el-button {
          margin: 40px 0;
          width: 360px;
          height: 56px;
          color: #fff;
          font-size: 20px;
          background-color: #00b395;
        }
      }
    }
  }
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-levae {
  opacity: 1;
}
.v-enter-active,
.v-levae-active {
  transition: all 1s ease;
}
</style>