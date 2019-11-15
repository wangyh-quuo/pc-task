<template>
  <div class="bottom-right__practice">
    <div class="practice-banner">
      <div class="practice-banner__image">
        <img src="@/assets/image/practiceTest/logo.png" alt />
      </div>
      <div class="practice-banner__title">
        <p class="title-CN">国家医学考试系统</p>
        <p class="title-en">National Medical Examination</p>
      </div>
    </div>
    <!-- 登录表单 -->
    <div class="login-form">
      <div class="form-content">
        <div class="form-title">
          <img src="@/assets/image/practiceTest/login_logo.png" alt />
          <span>考试登录</span>
        </div>
        <div class="form">
          <div class="form-group">
            <label>准考证号</label>
            <div class="form-input">
              <input type="text" v-model="userInfo.uid" />
            </div>
          </div>
          <div class="form-group">
            <label>确认准考证号</label>
            <div class="form-input">
              <input type="text" v-model="userInfo.uid" />
            </div>
          </div>
          <div class="form-group">
            <label>有效证件号</label>
            <div class="form-input">
              <input type="text" v-model="idNumber" />
            </div>
          </div>
          <div class="form-group">
            <div class="form-btn">
              <el-tooltip class="item" effect="dark" content="点我登录" placement="left-start">
                <button @click="enterTest">进入</button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点我退出" placement="right-end">
                <button style="margin-left: 10px;" @click="quit">退出</button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="form-bottom">v3.2.2</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import yltNavBar from "@/components/common/yltNavBar";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"]),
    idNumber() {
      return Math.random(15) * 100000000000000000;
    }
  },
  methods: {
    enterTest() {
      this.$router.push({
        name: "practiceTest",
        params: { idNumber: this.idNumber }
      });
    },
    quit() {
      this.$confirm("您要退出考试系统吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "error",
          message: "退出成功！"
        });
        this.$router.push({ name: "home" });
      });
    }
  },
  components: {
    // yltNavBar
  }
};
</script>

<style lang="scss" scoped>
.content-nav {
  width: 960px;
}
.bottom-right__practice {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  height: 800px;
  background: url("~@/assets/image/practiceTest/login_bg@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
  .practice-banner {
    display: flex;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1200px;
    height: 110px;
    background: #4b6073;
  }
  .practice-banner__image {
    padding: 25px 0 34px 205px;
  }
  .practice-banner__title {
    margin-left: 8px;
    padding-top: 36px;
    .title-CN {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #fff;
      line-height: 1.5;
    }
    .title-en {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #fff;
      line-height: 1.5;
    }
  }
}

/* 考试登录表单*/
.login-form {
  position: absolute;
  right: 230px;
  top: 50%;
  transform: translateY(-50%);
  width: 226px;
  height: 260px;
  background: rgba(255, 255, 255, 1);
  border: 2px solid rgba(255, 0, 0, 1);
}

.login-form .form-content {
  padding: 18px 18px 0;
}

.login-form .form-content .form-title {
  display: flex;
  align-items: center;
  width: 190px;
  height: 30px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  line-height: 30px;
  background: #03434f;
}

.login-form .form-content .form-title img {
  padding-left: 8px;
}

.login-form .form-content .form-title span {
  margin-left: 5px;
}

.login-form .form-content .form {
  margin-top: 12px;
}

.login-form .form-content .form-group {
  margin-top: 12px;
}

.login-form .form-content .form-group label {
  display: block;
  padding-left: 4px;
  font-size: 8px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #03434f;
  line-height: 24px;
  text-align: left;
}

.login-form .form-content .form-group .form-input {
  display: flex;
  align-items: center;
}

.login-form .form-content .form-group input {
  width: 170px;
  padding: 0 5px;
  height: 12px;
  font-size: 12px;
  background: #f4f4f4;
  border: 1px solid#BEBEBE;
}

.login-form .form-content .form-group .form-btn {
  display: flex;
  justify-content: center;
  text-align: justify;
}

.login-form .form-content .form-group .form-btn button {
  margin: 0 10px;
  flex: 1;
  width: 74px;
  height: 18px;
  font-size: 8px;
  line-height: 1;
  color: #23487f;
  background: #dcdcdc;
  border-radius: 3px;
  border: none;
}

.login-form .form-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 14px;
  font-size: 8px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fff;
  text-align: right;
  background: #bdbdbd;
}
</style>