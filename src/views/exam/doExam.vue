<template>
  <div class="practice-test">
    <ylt-template>
      <template #content-top>
        <div class="content-nav">
          <ylt-nav-bar></ylt-nav-bar>
        </div>
      </template>
      <template #content-center>
        <div class="bottom-right__info">
          <div class="box__left">
            <div class="info-avater">
              <img src="@/assets/image/practiceTest/avater_icon.png" alt />
            </div>
            <div class="info-txt">
              <p>考生:体验考生</p>
              <p>test001</p>
            </div>
            <div class="info-txt">体验试卷</div>
            <div class="info-txt">
              <p>考试时间</p>
              <p>2018-08-08 10:30-</p>
              <p>2020-07-07 10:30</p>
              <p style="color: #FF0000;">剩余时间</p>
              <p style="color: #FF0000;">5878小时1分</p>
            </div>
            <div class="info-txt">
              <p>
                未答题数：
                <span class="no-answer">0</span>
              </p>
              <p>
                标疑题数：
                <span class="has-question">0</span>
              </p>
            </div>
            <div class="info-txt" style="text-align: center;">
              <button class="refresh-btn">刷新</button>
            </div>
          </div>
          <div class="box__right" id="practicExam">
            <div class="box__right-content">
              <p class="exam-type">
                题型：
                <span class="exam-type__name">A1</span>
              </p>
              <div
                class="exam-headline"
              >每一道试题下面有A、B、C、D、E五个备选答案,请从中选择一个最佳答案,并用鼠标选中相应答案前的方框,以示正确答案,备选答案前的选择框中出现"√“即为选中。</div>
              <div class="exam-list" id="examList">
                <div v-for="(item,index) of examList" :key="index" v-show="index==currentIndex">
                  <p class="exam-index">第{{ index+1 }}题</p>
                  <p class="exam-title__desc">xxxxxx德威尔（Dever）将影响健康的因素分为四大类，除了</p>
                  <p class="exam-choose">
                    <input type="radio" name="choose" id />
                    <label for="sex1"></label>
                    <span>A. 环境因素x</span>
                  </p>
                  <p class="exam-choose">
                    <input type="radio" name="choose" id />
                    <label for="sex1"></label>
                    <span>B. 环境因素x</span>
                  </p>
                  <p class="exam-choose">
                    <input type="radio" name="choose" id />
                    <label for="sex1"></label>
                    <span>C. 环境因素x</span>
                  </p>
                  <p class="exam-choose">
                    <input type="radio" name="choose" id />
                    <label for="sex1"></label>
                    <span>D. 环境因素x</span>
                  </p>
                  <p class="exam-choose">
                    <input type="radio" name="choose" id />
                    <label for="sex1"></label>
                    <span>E. 环境因素x</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="confirm-btn_box">
              <button class="confirm-btn" @click="signQuestion">标疑</button>
              <button class="confirm-btn" @click="toNoAnswer">转到未答题</button>
              <button class="confirm-btn" @click="toSignQuestion">转到标疑题</button>
              <button class="confirm-btn" @click="prevQuestion">上一题</button>
              <button class="confirm-btn" @click="nextQuestion">下一题</button>
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
            <div class="exam-index__choose">
              <div class="exam-index__arrow">&lt;</div>
              <div class="exam-index__content">
                <span>1</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span class="has-question">8</span>
                <span>9</span>
                <span>10</span>
                <span class="no-answer">11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
              </div>
              <div class="exam-index__arrow">&gt;</div>
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
export default {
  data() {
    return {
      examList: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      currentIndex: 1, //当前题号
      signQuestionList: [2, 5], //标疑题列表
      currentSignQuestionIndex: "" //当前标疑题
    };
  },
  methods: {
    signQuestion() {
      this.signQuestionList.push(this.currentIndex);
      this.signQuestionList.sort();
      //TODO: 下方list标黄色
    },
    //转到未答题
    toNoAnswer() {},
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
      }
    },
    //上一题
    prevQuestion() {
      if (this.currentIndex < 1) {
        this.$message({
            type: 'info',
            message: '这是第一题!'
          });
        this.currentIndex = 0;
        return;
      }
      this.currentIndex--;
    },
    //下一题
    nextQuestion() {
      if (this.currentIndex >= 19) {
        this.currentIndex = 19;
        this.$message({
            type: 'info',
            message: '这是最后一题!'
          });
        return;
      }
      this.currentIndex++;
    },
    //完成考试
    finishTest() {}
    //显示当前题号
  },
  components: {
    yltTemplate,
    yltNavBar
  }
};
</script>

<style lang="scss" scoped>
.content-nav {
  width: 960px;
}
.bottom-right__info {
  position: relative;
  display: flex;
  margin-top: 20px;
  width: 100%;
  background: #fff;
  text-align: initial;
  flex-wrap: wrap;
  .box__left {
    padding-left: 200px;
    border-right: 1px solid #e9e9e9;
    div {
      border-bottom: 1px solid #e9e9e9;
    }
    .info-avater {
      padding-top: 2px;
      padding-left: 10px;
    }
    .info-avater img {
      width: 66px;
      height: 78px;
      border: 1px dashed #888;
    }
    .info-txt {
      position: relative;
      padding: 5px 10px;
      font-size: 6px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 2;
      border-bottom: 1px solid #e9e9e9;
    }
    .refresh-btn {
      width: 60px;
      line-height: 1.5;
      font-size: 6px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      color: #9a9a9a;
      background: #c7c7c7;
      border: none;
    }
  }
  .box__right {
    position: relative;
    flex: 1;

    .confirm-btn_box {
      text-align: center;
    }
    .confirm-btn {
      padding: 8px 14px;
      background: #ccc;
      border: 1px solid #a7a7a7;
      border-radius: 2px;
    }
    .box__right-content {
      .exam-type {
        padding-top: 20px;
        padding-left: 6px;
        font-size: 6px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
        .exam-type__name {
          font-size: 10px;
          color: #ff0000;
          line-height: 2;
        }
      }
      .exam-headline {
        padding: 14px 10px;
        font-size: 6px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-index {
        margin: 16px 0 0 10px;
        font-size: 6px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-title__desc {
        padding-left: 10px;
        font-size: 8px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
      .exam-choose {
        position: relative;
        padding-left: 10px;
        margin-top: 10px;
        font-size: 8px;
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
          width: 12px;
          height: 12px;
          border: 1px solid #9a9a9a;
          border-radius: 2px;
        }
        input[type="radio"i] {
          position: absolute;
          z-index: 12;
          left: 10px;
          top: 6px;
          width: 12px;
          height: 12px;
          appearance: none;
          -webkit-appearance: none;
          opacity: 0;
        }
        input:checked + label {
          background: #4684fd;
        }
        input:checked + label::after {
          content: "";
          position: absolute;
          left: 4px;
          top: -2px;
          /* 这里显示矩形的一半边框再旋转45度来实现对勾样式 */
          width: 5px;
          height: 12px;
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
          transform: rotate(45deg);
        }
      }
    }
    .exam-statement {
      padding-left: 4px;
      font-size: 8px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 2;
    }
    .exam-index__choose {
      display: flex;
      align-items: center;
      padding: 10px 0;
      .exam-index__arrow {
        margin: 0 10px;
        width: 10px;
        height: 40px;
        font-size: 6px;
        line-height: 40px;
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
        span {
          display: inline-block;
          margin: 4px;
          width: 20px;
          font-size: 6px;
          line-height: 1;
          text-align: center;
          background: #dddddd;
        }
      }
    }
  }
}
.exam-list {
  border: 1px solid #c7c7c7;
  padding-bottom: 56px;
  min-height: 240px;
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
  background: #ff8a94 !important;
  color: #0a01d6;
}

.has-question {
  background: #fffa96 !important;
  color: #0a01d6;
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