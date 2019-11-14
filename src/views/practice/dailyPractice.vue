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
                  class="collection"
                  :class="item.isCollection?'el-icon-star-on':'el-icon-star-off'"
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
              <div class="exam-option" v-for="(option,index2) of item.option" :key="index2">
                <div
                  class="exam-option__index"
                  :class="cardList[index1]==index2?'exam-option__index__active':''"
                  @click="chooseAnswer(index1,item.id,index2,item.answer)"
                >{{ String.fromCharCode(0x41+index2) }}</div>
                <div v-html="removeStyleFont(option)" class="exam-option__detail"></div>
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
        <p class="exam-card_time">总用时: {{ distance.h }}:{{ distance.m }}:{{ distance.s }}</p>
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
    <section class="solution-box">
      <div v-for="(item,index) of analysisList" :key="item.id">
        <transition>
          <div class="solution-content" v-show="index==currentIndex&&cardList[index]!=null">
            <div class="solution-content__headline">
              <p>
                <span class="dajx">【答案解析】</span>
              </p>
              <p>
                <span>正确答案：</span>
                <span style="color: #00b395;" v-text="item.rightOption"></span>
              </p>
              <p>
                <span>您选择的答案：</span>
                <span style="color: #ff695e;" v-text="item.userSelect=='N'?'无':item.userSelect"></span>
              </p>
            </div>
            <div class="solution-content_desc" v-html="item.analysis"></div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import yltHeader from "@/components/common/yltHeader";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      examList: [], //试题列表
      currentIndex: 0, //当前试题索引
      examLength: 0, //试题总数量
      answerList: [], //用户选择答案列表
      cardList: [], //答题卡内容
      payTime: 0, //费时
      timer: null,
      analysisList: [] // 解析 做一题直接显示答案
    };
  },
  mounted() {
    this.initPage();
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
      this.getDailyExercise(this.typeList[this.currentTypeIndex].id);
    },
    //请求数据
    getDailyExercise(id) {
      this.api
        .getDailyExercise(id)
        .then(res => {
          this.examList = res;
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
          //初始化解析
          for (let i = 0; i < this.examList.length; i++) {
            this.analysisList[i] = {
              index: 1,
              id: this.examList[i].id,
              userSelect: "N",
              rightOption: this.examList[i].answer,
              analysis: this.examList[i].analysis
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
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
      console.log(
        index,
        id,
        String.fromCharCode(0x41 + userSelect),
        rightOption
      );
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
      //显示做完题的答案
      this.analysisList[index].userSelect = String.fromCharCode(
        0x41 + userSelect
      );
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
        this.$confirm(
          `您还有${this.examLength - this.cardList.length}题未做, 请继续答题!`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "继续做题"
            });
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
            this.requestSubmitDailyPractice(
              this.typeList[this.currentTypeIndex].id,
              rquestModel
            );
          })
          .catch(() => {
            return;
          });
      }
    },
    requestSubmitDailyPractice(id, rquestModel) {
      this.api.submitDailyPractice(id, rquestModel).then(res => {
        this.setScoreReport(res);
        this.$message({
          type: "success",
          message: "交卷成功!"
        });
        this.$router.push({
          name: "report",
          params: { testId: 0, id: res.id } //testId=0 表示为每日一练
        });
      });
    },
    /* 收藏 */
    addCollection(id, el) {
      this.api
        .addCollection(id)
        .then(res => {
          this.$message({
            type: "success",
            message: res.message
          });
          for (const cl of el.target.classList) {
            if (cl == "el-icon-star-on") {
              el.target.classList.remove("el-icon-star-on");
              el.target.classList.add("el-icon-star-off");
              break;
            } else if (cl == "el-icon-star-off") {
              el.target.classList.remove("el-icon-star-off");
              el.target.classList.add("el-icon-star-on");
              break;
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "出错了!"
          });
        });
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
      width: 760px;
      min-height: 668px;
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
            color: #ffdd46;
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
          font-size: 22px;
          color: #1e1e1e;
          font-weight: bold;
          line-height: 28px;
        }
        .exam-option {
          display: flex;
          align-items: center;
          padding: 20px 0;
          font-size: 18px;
          color: #666;
          .exam-option__index {
            width: 24px;
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
          }
          .exam-option__detail {
            margin-left: 20px;
          }
        }
      }
      .button-box {
        display: flex;
        justify-content: space-around;
        margin: 80px 120px;
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
      min-height: 668px;
      background: #fff;
      .exam-card_time {
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        color: #666;
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
        height: 420px;
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
          font-size: 24px;
          background-color: #00b395;
        }
      }
    }
  }
  .solution-box {
    margin: 0 auto;
    width: 1200px;
    background: #fff;
    .solution-content {
      padding: 40px;
      .solution-content__headline {
        display: flex;
        p {
          margin-right: 40px;
          span {
            font-size: 20px;
            line-height: 24px;
          }
        }
        .dajx {
          color: #1e1e1e;
          font-weight: bold;
          font-size: 24px;
        }
      }
      .solution-content_desc {
        margin-top: 40px;
        width: 800px;
        font-size: 20px;
        color: #333;
        line-height: 1.5;
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