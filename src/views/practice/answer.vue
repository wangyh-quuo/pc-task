<template>
  <div class="page-box">
    <ylt-header></ylt-header>
    <!-- 题目 -->
    <section class="exam-box">
      <div class="exam-list_box" v-show="type==0">
        <div class="exam-list_content" v-for="(item,index1) of answerCardList" :key="item.id">
          <transition>
            <div v-show="type==0&&currentIndex==index1">
              <div class="exam-title">
                <h2 style="font-size: 20px;">消化系统</h2>
                <span
                  class="collection el-icon-star-on"
                  :style="item.isCollection?{color: '#ffdd46'}:{color: '#e1e3e6'}"
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
                  :class="optionClass(item,index2)"
                >{{ String.fromCharCode(0x41+index2) }}</div>
                <div
                  v-html="removeStyleFont(option)"
                  class="exam-option__detail"
                  :style="fontColor(item,index2)"
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
      <div class="exam-list_box" v-show="type==1">
        <div class="exam-list_content" v-for="(item,index1) of mistakeList" :key="item.id">
          <transition>
            <div v-show="type==1&&mistakeCurrentIndex==index1">
              <div class="exam-title">
                <h2 style="font-size: 20px;">消化系统</h2>
                <span
                  class="collection el-icon-star-on"
                  :style="item.isCollection?{color: '#ffdd46'}:{color: '#e1e3e6'}"
                  @click.stop="addCollection(item.id,$event)"
                ></span>
              </div>
              <div class="exam-type__box">
                <h2 class="exam-type" v-text="item.questionType"></h2>
                <p style="margin-right: 40px;">
                  <span style="color: #00b395;">{{ index1+1 }}</span>/
                  <span>{{ mistakeList.length }}</span>
                </p>
              </div>
              <div class="exam-headline" v-html="removeStyleFont(item.stem)"></div>
              <div class="exam-option" v-for="(option,index2) of item.option" :key="index2">
                <div
                  class="exam-option__index"
                  :class="optionClass(item,index2)"
                >{{ String.fromCharCode(0x41+index2) }}</div>
                <div
                  v-html="removeStyleFont(option)"
                  class="exam-option__detail"
                  :style="fontColor(item,index2)"
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
        <p class="exam-card_time">总用时: {{ payTime.h }}:{{ payTime.m }}:{{ payTime.s }}</p>
        <div class="exam-card_content">
          <div class="exam-card_title">
            <h2>答题卡</h2>
            <p>共{{ examLength }}题</p>
          </div>
          <!-- 答题卡内容 -->
          <div class="exam-card_index">
            <span
              :class="isDo(item,index)"
              v-for="(item,index) of answerCardList"
              :key="item.id"
              @click="currentIndex=index"
            >{{ index+1 }}</span>
          </div>
          <div class="exam-card_tips">
            <div style="color: #00b395;">
              <span class="icon_ok"></span>
              <span>已做</span>
            </div>
            <div style="color: #ff695e;">
              <span class="icon_error"></span>
              <span>错误</span>
            </div>
            <div style="color: #999;">
              <span class="icon_no"></span>
              <span>未做</span>
            </div>
          </div>
        </div>
        <div class="submit-test">
          <el-button @click="showAllAnswer" :type="type==0?'success':'default'">所有解析</el-button>
          <el-button @click="showOnlyMistake" :type="type==1?'success':'default'">只看错题</el-button>
        </div>
      </div>
    </section>
    <!-- 解析 -->
    <section class="solution-box" v-show="type==0">
      <div v-for="(item,index) of answerCardList" :key="item.id">
        <transition>
          <div class="solution-content" v-show="index==currentIndex">
            <div class="solution-content__headline">
              <p>
                <span class="dajx">【答案解析】</span>
              </p>
              <p>
                <span>正确答案：</span>
                <span style="color: #00b395;" v-text="item.answer"></span>
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
    <section class="solution-box" v-show="type==1">
      <div v-for="(item,index) of mistakeList" :key="item.id">
        <transition>
          <div class="solution-content" v-show="index==mistakeCurrentIndex">
            <div class="solution-content__headline">
              <p>
                <span class="dajx">【答案解析】</span>
              </p>
              <p>
                <span>正确答案：</span>
                <span style="color: #00b395;" v-text="item.answer"></span>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      answerCardList: [], //试题列表
      currentIndex: 0, //当前试题索引
      mistakeCurrentIndex: 0, //当前错题索引
      examLength: 0, //试题总数量
      cardList: [], //答题卡内容
      mistakeList: [], //错题
      type: 0 //0 所有解析 ，1 只看错题
    };
  },
  computed: {
    ...mapState(["userInfo", "scoreReport"]),
    //第一题禁止按钮
    firstExam() {
      return this.currentIndex == 0 ? "button-disabled" : "button-active";
    },
    payTime() {
      return {
        h: this.formatTime(parseInt(this.scoreReport.useTime / 3600)),
        m: this.formatTime(parseInt((this.scoreReport.useTime / 60) % 60)),
        s: this.formatTime(parseInt(this.scoreReport.useTime % 60))
      };
    },
    optionClass() {
      return function(item, index) {
        if (String.fromCharCode(0x41 + index) == item.answer) {
          //this.typeColor = "#00b395";
          return "exam-option__index__ok";
        } else {
          if (item.userSelect != "N") {
            if (String.fromCharCode(0x41 + index) == item.userSelect) {
              //this.typeColor = "#ff965e";
              return "exam-option__index__error";
            }
          }
        }
      };
    },
    fontColor() {
      return function(item, index) {
        if (String.fromCharCode(0x41 + index) == item.answer) {
          return { color: "#00b395" };
        } else {
          if (item.userSelect != "N") {
            if (String.fromCharCode(0x41 + index) == item.userSelect) {
              return { color: "#ff965e" };
            }
          }
        }
      };
    },
    isDo() {
      return function(item) {
        if (item.userSelect == "N") {
          return "card-no";
        } else if (item.answer != item.userSelect) {
          return "card-error";
        } else {
          return "card-active";
        }
      };
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      //获得做题列表
      this.getAnswerCard(this.$route.params.id, 0);
      this.type = this.$route.params.type;
    },
    //请求数据
    getAnswerCard(id, range) {
      this.api
        .getAnswerCard(id, range)
        .then(res => {
          this.answerCardList = res;
          this.examLength = res.length;
          this.mistakeList = this.getMistake();
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
      if (this.type == 0) {
        if (this.currentIndex == 0) {
          this.$message({
            type: "info",
            message: "这是第一题!"
          });
          return;
        }
        this.currentIndex--;
      } else if (this.type == 1) {
        if (this.mistakeCurrentIndex == 0) {
          this.$message({
            type: "info",
            message: "这是第一题!"
          });
          return;
        }
        this.mistakeCurrentIndex--;
      }
    },
    //下一题
    nextExam() {
      if (this.type == 0) {
        if (this.currentIndex == this.examLength - 1) {
          return;
        }
        this.currentIndex++;
      } else if (this.type == 1) {
        if (this.mistakeCurrentIndex == this.mistakeList.length - 1) {
          return;
        }
        this.mistakeCurrentIndex++;
      }
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
    },
    showAllAnswer() {
      this.$router.push({
        name: "answer",
        params: { id: this.$route.params.id, type: 0 }
      });
      this.type = 0;
    },
    showOnlyMistake() {
      this.$router.push({
        name: "answer",
        params: { id: this.$route.params.id, type: 1 }
      });
      this.type = 1;
    },
    getMistake() {
      //过滤错题
      return this.answerCardList.filter(item => {
        return item.userSelect != item.answer;
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
          .exam-option__index__error {
            color: #fff;
            border: none;
            background: linear-gradient(0, #ff8f70, #ff7c6e);
          }
          .exam-option__index__ok {
            color: #fff;
            border: none;
            background: linear-gradient(0, #00c9ab, #00b295);
          }
          .exam-option__detail {
            margin-left: 20px;
            line-height: 1.5;
          }
        }
      }
      .button-box {
        position: absolute;
        left: 50%;
        bottom: 40px;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-around;
        width: 300px;
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
           cursor: pointer;
        }
        .card-active {
          background: linear-gradient(0, #00c9a8, #00b295);
          color: #fff;
        }
        .card-no {
          background: transparent;
          color: #999;
          border: 1px solid #999;
        }
        .card-error {
          color: #fff;
          background: linear-gradient(0, #ff8f70, #ff7c6e);
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
          border: 1px solid #999;
        }
        .icon_error {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ff695e;
        }
      }
      .submit-test {
        display: flex;
        justify-content: center;
        margin: 40px 0;
        /deep/ .el-button--default {
          margin: 0;
          width: 180px;
          height: 56px;
          color: #999;
          font-size: 18px;
          background-color: #f0f2f5;
        }
        /deep/ .el-button--success {
          margin: 0;
          width: 180px;
          height: 56px;
          color: #fff;
          font-size: 18px;
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
        line-height: 2;
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