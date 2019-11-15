<template>
  <div class="page-box">
    <ylt-header></ylt-header>
    <!-- 题目 -->
    <section class="exam-box">
      <div class="exam-list_box">
        <div class="exam-list_content" v-for="(item,index1) of collectionList" :key="item.id">
          <transition>
            <div v-show="currentIndex==index1">
              <div class="exam-title">
                <h2 style="font-size: 20px;">消化系统</h2>
                <span
                  class="collection"
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
        <div class="exam-card_content">
          <div class="exam-card_title">
            <h2>答题卡</h2>
            <p>共{{ examLength }}题</p>
          </div>
          <div class="exam-card_index">
            <span
              v-for="(item,index) of collectionList"
              :key="item.id"
              @click="currentIndex=index"
            >{{ index+1 }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 解析 -->
    <section class="solution-box">
      <div v-for="(item,index) of collectionList" :key="item.id">
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
  </div>
</template>

<script>
import yltHeader from "@/components/common/yltHeader";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentIndex: 0, //当前试题索引
      examLength: 0, //试题总数量
      collectionList: [], //答题卡内容
      records: [], // 做题记录
      isSaveLocalStorage: false //是否数据存储在本地
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
  methods: {
    ...mapMutations(["setScoreReport"]),
    initPage() {
      //获得错题
      this.getCollection(this.$route.params.id);
    },
    //请求数据
    getCollection(id) {
      this.api.getCollection(id).then(res => {
        console.log(res);
        this.collectionList = res;
        this.examLength = res.length;
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
          message: "到顶了!"
        });
        return;
      }
      this.currentIndex--;
    },
    //下一题
    nextExam() {
      if (this.currentIndex == this.examLength - 1) {
        this.$message({
          type: "info",
          message: "到底了!"
        });
        return;
      }
      this.currentIndex++;
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
      min-height: 668px;
      background: #fff;
      .exam-card_content {
        padding: 0 15px 40px;
        margin-top: 40px;
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
        height: 500px;
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