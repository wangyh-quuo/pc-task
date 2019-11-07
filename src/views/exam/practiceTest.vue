<template>
  <div class="practice-test">
    <ylt-template>
      <template #content-top>
        <div class="content-nav">
          <ylt-nav-bar></ylt-nav-bar>
        </div>
      </template>
      <template #content-center>
        <div id="firstConfirmBox" class="bottom-right__info">
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
          <!-- 报考科目 -->
          <div class="box__right" v-show="confirmIndex==1">
            <div class="icon-group__user">
              <div>
                <img src="@/assets/image/practiceTest/header-icon.png" alt />
              </div>
              <div>
                <img src="@/assets/image/practiceTest/header-icon.png" alt />
              </div>
            </div>
            <div class="instruction">
              <div class="instruction-content">
                <p>姓名:体验考生</p>
                <p>有效证件:test001</p>
                <p>准考证号:test001</p>
                <p>单位信息:</p>
                <p>考场:</p>
              </div>
              <div class="instruction-content">
                <p>考试科目</p>
                <p>试卷名称</p>
                <p>题量:70道</p>
                <p>总分：70分</p>
                <p>考室：</p>
              </div>
            </div>
            <div class="confirm-btn_box">
              <el-button class="confirm-btn" @click="confirmIndex=2">确认</el-button>
            </div>
          </div>
          <!-- 考生须知 -->
          <div class="box__right" v-show="confirmIndex==2">
            <div class="box__right-content">
              <h1 class="box__right-title">考生须知</h1>
              <p class="box-info__txt">1.考生进入考室后，须在《签到表》上潜质，对号入座后将本人《准考证》、有效身份证明放在课桌右上角，以便核验。</p>
              <p
                class="box-info__txt"
              >2.开考前15分钟，考生可按准考证号和身份证号信息登录考试系统（证件输入应注意括号和大小写），核对并确认基本信息无误后，进入考</p>
              <p
                class="box-info__txt"
              >3.考生进入考试系统后,应注意考试界面的左侧显示的开始时间、结束时间和剩余时间,考试过程中把控好考试时间。完成并提交答题信息前</p>
              <p class="box-info__txt">4.提前结束答的考生,可点击“完成考试按钮。</p>
              <p class="box-info__txt">5.考试结束后,系统将自动提示"时间到,考试结束,未完成的考生将不能继续答题。</p>
              <p class="box-info__txt">6.监考员离场指令发出后,考生方可离场。</p>
            </div>
            <div class="confirm-btn_box" style="margin-top: 160px;">
              <el-button class="confirm-btn" @click="confirmIndex=3">确认须知</el-button>
            </div>
          </div>
          <!-- 考试规则 -->
          <div class="box__right" v-show="confirmIndex==3">
            <div class="box__right-content">
              <h1 class="box__right-title">考试规则</h1>
              <p
                class="box-info__txt"
              >1.考生入场除准考证、有效身份证明、签字笔和计算器外,禁止携带任何书籍、纸张、手表、手机等各种无线通讯工具以及一切与考试无关但</p>
              <p
                class="box-info__txt"
              >2.开考30分钟后考生不得进入考室。考试期间考生不得离开考室,在考试规定时间前完成答题或要求提前结東考试的考生,须按考试工作人</p>
              <p class="box-info__txt">3.考生不得要求监考员解释试题,如遇计算机系统问题,可举手询问。外籍或台湾、香港、澳门考生进入考场后,必须使用中文普通。</p>
              <p class="box-info__txt">4.考生在考场内必须保持安静,不准交头接耳、左顾右盼;不准偷窥;不准吸烟。</p>
              <p
                class="box-info__txt"
              >5.考生应自觉服从监考员管理,不得以任何理由妨碍监考员进行正常工作。对违反《考试规则》、考试纪律,不服从监考员管理的违规考生,</p>
            </div>
            <div class="confirm-btn_box" style="margin-top: 160px;">
              <el-button class="confirm-btn" @click="confirmIndex=4">确认规则</el-button>
            </div>
          </div>
          <!-- 考试承诺 -->
          <div id="examPromise" class="box__right" v-show="confirmIndex==4">
            <div class="box__right-content">
              <h1 class="box__right-title">考试承诺</h1>
              <p
                class="box-info__txt"
              >我是报考参加计算机化考试的考生,我已阅读并知悉了《考试规则》、《医师资格考试违纪违规处理规定》等医师资格考试相关文件和规定。经认真考虑,郑重承诺以下事项：</p>
              <p class="box-info__txt">1.自觉服从考试组织管理部门的统一安排,接受监考人员的检查、监督和管理。</p>
              <p class="box-info__txt">2.保证在考试过程中遵纪守法、诚实守信。</p>
              <p
                class="box-info__txt"
              >3.考生进入考试系统后,应注意考试界面的左侧显示的开始时间、结束时间和剩余时间,考试过程中把控好考试时间。完成并提交答题信息前</p>
              <p class="box-info__txt">如违反上述承诺,自愿按相关规定接受处罚,并愿意承担由此而引起的一切后果。</p>
              <p class="box-info__txt agree-txt">我已仔细阅读以上承诺并确认同意</p>
            </div>
            <div class="confirm-btn_box">
              <el-button class="confirm-btn" @click="confirmIndex=5">同意</el-button>
              <el-button class="confirm-btn" @click="confirmIndex=4">否</el-button>
            </div>
          </div>
          <!-- 进入考试 -->
          <div id="joinTest" class="box__right" v-show="confirmIndex==5">
            <div class="box__right-content">
              <div class="confirm-btn_box">
                <el-button class="confirm-btn" @click="joinTest">进入考试</el-button>
              </div>
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
    return { confirmIndex: 1 };
  },
  methods: {
    //进入考试
    joinTest() {
      this.$confirm("注意:考试已经开始!", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
        customClass: "join-alert"
      })
        .then(() => {
          //进入考试页面
          this.$router.push("doExam");
        })
        .catch(() => {
          //进入考试页面
          this.$router.push("doExam");
        });
    }
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
    .icon-group__user {
      display: flex;
      justify-content: space-around;
      padding-top: 24px;
      img {
        border: 1px dashed #888;
      }
      div {
        height: 280px;
      }
    }
    .instruction {
      display: flex;
      justify-content: space-around;
      .instruction-content {
        width: 50%;
      }
      p {
        padding-left: 10px;
        font-size: 6px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 4.5;
      }
    }
    .confirm-btn_box {
      text-align: center;
    }
    .confirm-btn {
      padding: 8px 14px;
      background: #ccc;
      border: 1px solid #a7a7a7;
      border-radius: 2px;
    }
    .box__right-title {
      padding: 24px 0;
      font-size: 10px;
      font-family: Source Han Sans CN;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: 10px;
      text-align: center;
    }
    .box__right-content {
      .box-info__txt {
        padding: 0 40px;
        font-size: 6px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 2;
      }
    }
  }
}

#examPromise .box-info__txt {
  line-height: 4;
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