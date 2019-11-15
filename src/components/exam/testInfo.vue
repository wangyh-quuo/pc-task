<template>
  <div class="box__left">
    <div class="info-avater">
      <img src="@/assets/image/practiceTest/avater_icon@2x.png" alt />
    </div>
    <div class="info-txt">
      <p>考生:{{ userName }}</p>
      <p>{{ userIdNumber }}</p>
    </div>
    <div class="info-txt">体验试卷:{{ }}</div>
    <div class="info-txt">
      <p>考试时间</p>
      <p>{{ startTime }}-</p>
      <p>{{ endTime}}</p>
      <p style="color: #FF0000;">剩余时间</p>
      <p style="color: #FF0000;">{{ distance.h }}小时{{ distance.m}}分{{ distance.s }}秒</p>
    </div>
    <div class="info-txt">
      <p>
        未答题数：
        <span class="no-answer">{{ notDoLength }}</span>
      </p>
      <p>
        标疑题数：
        <span class="has-question">{{ signQuestionLength }}</span>
      </p>
    </div>
    <div class="info-txt" style="text-align: center;">
      <button class="refresh-btn">刷新</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    signQuestionLength: {
      type: Number,
      default: 0
    },
    notDoLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      confirmIndex: 1,
      examLength: 0,
      countDown: 2 * 60 * 60,
      timer: ""
    };
  },
  computed: {
    ...mapState(["userInfo", "typeList", "currentIndex"]),
    userName() {
      return this.userInfo.name;
    },
    userId() {
      return this.userInfo.uid;
    },
    userIdNumber() {
      return this.$route.params.idNumber;
    },
    startTime() {
      return this.dateFormat(new Date());
    },
    endTime() {
      const time = new Date().getTime() + 2 * 3600 * 1000;
      return this.dateFormat(new Date(time));
    },
    //计时器
    distance() {
      return {
        h: this.formatTime(parseInt((this.countDown / 3600) % 24)),
        m: this.formatTime(parseInt((this.countDown / 60) % 60)),
        s: this.formatTime(parseInt(this.countDown % 60))
      };
    }
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.timer = setInterval(() => {
        this.countDown--;
      }, 1000);
    },
    //格式化时间 00
    formatTime(date) {
      return date > 9 ? date : `0${date}`;
    },
    dateFormat(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.box__left {
  background: #fff;
  border-right: 1px solid #e9e9e9;
  div {
    border-bottom: 1px solid #e9e9e9;
  }
  .info-avater {
    padding-top: 2px;
    padding-left: 10px;
  }
  .info-avater img {
    border: 1px dashed #888;
  }
  .info-txt {
    position: relative;
    padding: 5px 10px;
    font-size: 0.2rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 2;
    border-bottom: 1px solid #e9e9e9;
  }
  .refresh-btn {
    width: 60px;
    line-height: 1.5;
    font-size: 0.2rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #9a9a9a;
    background: #c7c7c7;
    border: none;
  }
  .no-answer {
    background: #ff8a94 !important;
    color: #0a01d6;
  }

  .has-question {
    background: #fffa96 !important;
    color: #0a01d6;
  }
}
</style>