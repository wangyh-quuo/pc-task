<template>
  <div class="practice-test">
    <div class="bottom-right__info">
      <test-info :signQuestionLength="signQuestionLength" :notDoLength="notDoLength"></test-info>
      <div class="box__right" id="practicExam">
        <div class="box__right-content">
          <p class="exam-type">
            题型：
            <span
              class="exam-type__name"
              v-show="currentIndex==index"
              v-for="(item,index) of computerExamList"
              :key="item.id"
            >{{item.questionType}}</span>
          </p>
          <div
            class="exam-headline"
          >每一道试题下面有A、B、C、D、E五个备选答案,请从中选择一个最佳答案,并用鼠标选中相应答案前的方框,以示正确答案,备选答案前的选择框中出现"√“即为选中。</div>
          <div class="exam-list" id="examList">
            <div
              v-for="(item,index1) of computerExamList"
              :key="index1"
              v-show="index1==currentIndex"
            >
              <p class="exam-index">第{{ index1+1 }}题</p>
              <div class="exam-title__desc" v-html="removeStyleFont(item.stem)"></div>
              <div
                class="exam-choose"
                v-for="(option,index2) of item.option"
                :key="option.id"
                @click="chooseOption(index2)"
              >
                <input type="radio" :name="index1" :v-model="cardList[index1]==index2" />
                <label for="sex1"></label>
                <div class="exam-option" v-html="removeStyleFont(option)"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="confirm-btn_box" v-show="mode==0">
          <button class="confirm-btn" @click="signQuestion">标疑</button>
          <button class="confirm-btn" @click="toNoAnswerPage">转到未答题</button>
          <button class="confirm-btn" @click="toSignQuestionPage">转到标疑题</button>
          <button class="confirm-btn" @click="prevQuestion">上一题</button>
          <button class="confirm-btn" @click="nextQuestion">下一题</button>
          <button class="confirm-btn" @click="finishTest">完成考试</button>
        </div>
        <div class="confirm-btn_box" v-show="mode==1">
          <button class="confirm-btn" @click="signQuestion">标疑</button>
          <button class="confirm-btn" @click="toNoAnswerPage">转到未答题</button>
          <button class="confirm-btn" @click="mode=0">返回</button>
          <button class="confirm-btn" @click="prevSignQuestion">上一题</button>
          <button class="confirm-btn" @click="nextSignQuestion">下一题</button>
          <button class="confirm-btn" @click="finishTest">完成考试</button>
        </div>
        <div class="confirm-btn_box" v-show="mode==2">
          <button class="confirm-btn" @click="signQuestion">标疑</button>
          <button class="confirm-btn" @click="mode=0">返回</button>
          <button class="confirm-btn" @click="toSignQuestionPage">转到标疑题</button>
          <button class="confirm-btn" @click="prevNotdo">上一题</button>
          <button class="confirm-btn" @click="nextNotdo">下一题</button>
          <button class="confirm-btn" @click="finishTest">完成考试</button>
        </div>
        <p class="exam-statement">
          颜色说明：
          <span class="has-question">黄色</span>
          表示标疑试题，
          <span class="no-answer">红色</span>
          表示未做答试题，灰色
          表示已做答试题。点击题号数字即可跳转至该题。
        </p>
        <div class="exam-index__choose" v-show="mode==0">
          <div class="exam-index__arrow" @click="prevPage">&lt;</div>
          <div class="exam-index__content">
            <div
              class="exam-index__box"
              v-for="(pages,index1) of pageList"
              :key="index1"
              v-show="currentPage==index1"
            >
              <div>
                <span
                  v-for="(item,index2) of pages"
                  :key="item.id"
                  class="no-answer"
                  :class="indexClass(index2+index1*60)"
                  @click="currentIndex = index2+index1*60"
                >{{ index2+index1*60+1 }}</span>
              </div>
            </div>
          </div>
          <div class="exam-index__arrow" @click="nextPage">&gt;</div>
        </div>
        <div class="exam-index__choose" v-show="mode==1">
          <div class="exam-index__arrow" @click="prevPage">&lt;</div>
          <div class="exam-index__content">
            <div
              class="exam-index__box"
              v-for="(pages,index1) of signQuestionListPage"
              :key="index1"
              v-show="currentPage==index1"
            >
              <div>
                <span
                  v-for="item of pages"
                  :key="item.id"
                  class="has-question"
                  @click="currentIndex = item"
                >{{ item+1 }}</span>
              </div>
            </div>
          </div>
          <div class="exam-index__arrow" @click="nextPage">&gt;</div>
        </div>
        <div class="exam-index__choose" v-show="mode==2">
          <div class="exam-index__arrow" @click="prevPage">&lt;</div>
          <div class="exam-index__content">
            <div
              class="exam-index__box"
              v-for="(pages,index1) of notDoListPage"
              :key="index1"
              v-show="currentPage==index1"
            >
              <div>
                <span
                  v-for="item of pages"
                  :key="item.id"
                  class="no-answer"
                  @click="currentIndex = item"
                >{{ item+1 }}</span>
              </div>
            </div>
          </div>
          <div class="exam-index__arrow" @click="nextPage">&gt;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import testInfo from "@/components/exam/testInfo";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentIndex: 0, //当前题号
      cardList: [], //答题卡
      signQuestionList: [], //标疑题列表
      currentSignQuestionIndex: 0, //当前标疑题
      signQuestionLength: 0, //标疑长度
      notDoLength: 0, //未做长度
      notDoList: [], //未做列表
      currentNotDoIndex: 0,
      pageList: [],
      pageSize: 60,
      pageCount: 0,
      currentPage: 0,
      mode: 0, // 0做题 1 答疑 2未做
      notDoListPage: [], // 未做分页
      signQuestionListPage: [] // 未做分页
    };
  },
  mounted() {
    for (let i = 0; i < this.computerExamList.length; i++) {
      this.notDoList.push(i);
    }
    this.notDoLength = this.notDoList.length;
    this.pageCount = Math.ceil(this.computerExamList.length / this.pageSize);
    //题号分页
    this.setPageList(this.pageSize);
    this.setNotDoListPage(this.pageSize);
    this.setSignQuestionListPage(this.pageSize);
  },
  computed: {
    ...mapState(["computerExamList"]),
    indexClass() {
      return function(index) {
        //是否标疑
        let isSign = false;
        this.signQuestionList.some(item => {
          if (item == index) {
            isSign = true;
            return item == index;
          }
        });
        if (isSign) {
          return "has-question";
        } else {
          if (this.cardList[index] != null) {
            return "has-do";
          }
        }
      };
    }
  },
  methods: {
    removeStyleFont(content) {
      return content.replace(/style="(.*)"/gi, "");
    },
    /**
     * 标疑
     */
    signQuestion() {
      if (this.signQuestionList.indexOf(this.currentIndex) == -1) {
        this.signQuestionList.push(this.currentIndex);
        this.signQuestionList.sort();
        this.signQuestionLength++;
        this.setSignQuestionListPage(this.pageSize);
      }
    },
    //转到标疑题
    toSignQuestionPage() {
      if (this.signQuestionList.length == 0) {
        this.$alert("没有标疑题", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      this.mode = 1;
    },
    //转到未答题页面
    toNoAnswerPage() {
      if (this.notDoLength.length == 0) {
        return;
      }
      this.mode = 2;
    },
    //转到未答题
    toNoAnswer() {
      if (this.notDoList.length == 0) {
        this.$alert("没有未答题", "提示", {
          confirmButtonText: "确定"
        });
        return;
      }
      let index = this.notDoList.indexOf(this.currentNotDoIndex);
      if (index != -1 && index < this.notDoList.length) {
        this.currentIndex = this.currentNotDoIndex;
        this.currentNotDoIndex = this.notDoList[
          ++index % this.notDoList.length
        ];
      } else {
        //初始为0
        this.currentNotDoIndex = this.notDoList[0];
        this.currentIndex = this.currentNotDoIndex;
      }
      this.getCurrentPages(this.currentIndex);
    },
    prevNotdo() {
      if (this.currentNotDoIndex <= 0) {
        return;
      }
      this.currentNotDoIndex--;
      this.currentIndex = this.notDoList[this.currentNotDoIndex];
      this.getCurrentPages(this.currentIndex);
    },
    nextNotdo() {
      if (this.currentNotDoIndex >= this.notDoLength.length) {
        return;
      }
      this.currentNotDoIndex++;
      this.currentIndex = this.notDoList[this.currentNotDoIndex];
      this.getCurrentPages(this.currentIndex);
    },
    /**
     * 点击转到标疑题
     * 从标疑题list中顺序循环显示标疑题
     */
    toSignQuestion() {
      if (this.signQuestionList.length == 0) {
        return;
      }
      let index = this.signQuestionList.indexOf(this.currentSignQuestionIndex);
      if (index != -1 && index < this.signQuestionList.length) {
        this.currentIndex = this.currentSignQuestionIndex;
        this.currentSignQuestionIndex = this.signQuestionList[
          ++index % this.signQuestionList.length
        ];
      } else {
        //初始为0
        this.currentSignQuestionIndex = this.signQuestionList[0];
        this.currentIndex = this.currentSignQuestionIndex;
      }
      this.getCurrentPages(this.currentIndex);
    },
    prevSignQuestion() {
      if (this.currentSignQuestionIndex <= 0) {
        return;
      }
      this.currentSignQuestionIndex--;
      this.currentIndex = this.signQuestionList[this.currentSignQuestionIndex];
    },
    nextSignQuestion() {
      if (this.currentSignQuestionIndex >= this.signQuestionList.length - 1) {
        return;
      }
      this.currentSignQuestionIndex++;
      this.currentIndex = this.signQuestionList[this.currentSignQuestionIndex];
    },
    //上一题
    prevQuestion() {
      if (this.currentIndex < 1) {
        this.$message({
          type: "info",
          message: "这是第一题!"
        });
        this.currentIndex = 0;
        return;
      }
      this.currentIndex--;
      this.getCurrentPages(this.currentIndex);
    },
    //下一题
    nextQuestion() {
      if (this.currentIndex >= this.computerExamList.length - 1) {
        this.currentIndex = this.computerExamList.length - 1;
        this.$message({
          type: "info",
          message: "这是最后一题!"
        });
        return;
      }
      this.currentIndex++;
      this.getCurrentPages(this.currentIndex);
    },
    //选择选项
    chooseOption(index) {
      this.$set(this.cardList, this.currentIndex, index);
      if(this.notDoList.indexOf(this.currentIndex)!=-1){
        this.notDoList.splice(this.notDoList.indexOf(this.currentIndex), 1);
      }
      this.notDoLength = this.notDoList.length;
      //
      this.setNotDoListPage(this.pageSize);
    },
    //完成考试
    finishTest() {
      if (this.notDoLength == 0) {
        this.$confirm("交卷", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: "info",
            message: "提交成功!"
          });
          this.$router.push({ name: "home" });
        });
      } else {
        this.$confirm(`您还有${this.notDoLength}题未答?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      }
    },
    setPageList(pageSize) {
      let page = 0;
      for (page; page < this.pageCount; page++) {
        if (!this.pageList[page]) {
          this.pageList[page] = [];
        }
        let start = page * pageSize;
        let end =
          (page + 1) * pageSize < this.computerExamList.length
            ? (page + 1) * pageSize
            : this.computerExamList.length;
        this.pageList[page] = this.computerExamList.slice(start, end);
      }
    },
    prevPage() {
      if (this.currentPage == 0) {
        return;
      }
      this.currentPage--;
    },
    nextPage() {
      if (this.currentPage == this.pageCount - 1) {
        return;
      }
      this.currentPage++;
    },
    getCurrentPages(index) {
      this.currentPage = Math.floor(index / this.pageSize);
    },
    setNotDoListPage(pageSize) {
      let page = 0;
      const pageCount = Math.ceil(this.notDoLength / pageSize);
      for (page; page < pageCount; page++) {
        if (!this.notDoListPage[page]) {
          this.notDoListPage[page] = [];
        }
        let start = page * pageSize;
        let end =
          (page + 1) * pageSize < this.notDoLength
            ? (page + 1) * pageSize
            : this.notDoLength;
        this.notDoListPage[page] = this.notDoList.slice(start, end);
      }
    },
    setSignQuestionListPage(pageSize) {
      let page = 0;
      const pageCount = Math.ceil(this.signQuestionLength / pageSize);
      for (page; page < pageCount; page++) {
        if (!this.signQuestionListPage[page]) {
          this.signQuestionListPage[page] = [];
        }
        let start = page * pageSize;
        let end =
          (page + 1) * pageSize < this.signQuestionLength
            ? (page + 1) * pageSize
            : this.signQuestionLength;
        this.signQuestionListPage[page] = this.signQuestionList.slice(
          start,
          end
        );
      }
    }
  },
  components: {
    testInfo
  }
};
</script>

<style lang="scss" scoped>
.practice-test {
  width: 100%;
  height: 100%;
  background: #fff;
}
.content-nav {
  width: 960px;
}
.bottom-right__info {
  height: 100%;
  position: relative;
  display: flex;
  margin: 0 auto;
  background: #fff;
  text-align: initial;
  flex-wrap: wrap;
  .box__right {
    position: relative;
    flex: 1;
    background: #fff;
    .confirm-btn_box {
      text-align: center;
    }
    .confirm-btn {
      padding: 8px 14px;
      font-size: 20px;
      background: #ccc;
      border: 1px solid #a7a7a7;
      border-radius: 2px;
    }
    .box__right-content {
      .exam-type {
        padding-top: 20px;
        padding-left: 6px;
        font-size: 0.2rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
        .exam-type__name {
          font-size: 0.24rem;
          color: #ff0000;
          line-height: 2;
        }
      }
      .exam-headline {
        padding: 14px 10px;
        margin-bottom: 16px;
        font-size: 0.2rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-index {
        margin: 16px 0 0 10px;
        font-size: 0.2rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-title__desc {
        padding-left: 10px;
        font-size: 0.2rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-choose {
        display: flex;
        position: relative;
        padding-left: 10px;
        margin-top: 10px;
        font-size: 0.2rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
        span {
          margin-left: 22px;
        }
        label {
          position: absolute;
          z-index: 10;
          left: 10px;
          top: 6px;
          width: 0.24rem;
          height: 0.24rem;
          border: 1px solid #9a9a9a;
          border-radius: 2px;
        }
        input[type="radio"i] {
          position: absolute;
          z-index: 12;
          left: 10px;
          top: 6px;
          width: 0.24rem;
          height: 0.24rem;
          appearance: none;
          -webkit-appearance: none;
          opacity: 0;
          cursor: pointer;
        }
        input:checked + label {
          background: #4684fd;
        }
        input:checked + label::after {
          content: "";
          position: absolute;
          left: 6px;
          top: -2px;
          /* 这里显示矩形的一半边框再旋转45度来实现对勾样式 */
          width: 10px;
          height: 20px;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transform: rotate(45deg);
        }
        .exam-option {
          margin-left: 40px;
          font-size: 0.2rem;
        }
      }
    }
    .exam-statement {
      padding-left: 4px;
      font-size: 0.2rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 2;
    }
    .exam-index__choose {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      .exam-index__arrow {
        margin: 0 10px;
        height: 100%;
        width: 20px;
        font-size: 20px;
        line-height: 6;
        text-align: center;
        background: #cccccc;
        border: 1px solid #a7a7a7;
        border-radius: 2px;
        cursor: pointer;
      }
      .exam-index__content {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: initial;
        color: #fff;
        .exam-index__box {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-left: 18px;
        }
        span {
          display: inline-block;
          margin: 4px;
          width: 70px;
          font-size: 16px;
          line-height: 2;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
.exam-list {
  border: 1px solid #c7c7c7;
  padding-bottom: 56px;
  min-height: 470px;
}

#practicExam .confirm-btn_box {
  display: flex;
  justify-content: space-around;
  border: 1px solid #c7c7c7;
}

.agree-txt {
  margin-top: 84px;
  text-align: center;
}

#joinTest .confirm-btn_box {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}
.no-answer {
  background: #ff8a94;
  color: #0a01d6;
}

.has-question {
  background: #fffa96 !important;
  color: #0a01d6;
}
.has-do {
  background: #dddddd !important;
  color: #fff;
}
</style>
<style lang="scss">
/* 提示 */
.join-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2001;
  padding-bottom: 10px;
  width: 185px;
  background: #fff;
  border: 1px solid #6d6d6d;
  border-radius: 3px;
  text-align: center;
}

.join-alert .el-message-box__header,
.el-message-box__title {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  font-size: 6px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 2;
}

.join-alert .el-message-box__content {
  margin: 10px auto;
  padding: 0;
  width: 160px;
  font-size: 10px;
  border: 2px solid rgba(114, 159, 250, 1);
  border-radius: 2px;
}

.join-alert .join-confirm__btn {
  width: 48px;
  height: 20px;
  background: #ccc;
  border: 1px solid #a7a7a7;
  border-radius: 2px;
}
</style>