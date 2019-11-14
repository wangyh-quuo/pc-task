<template>
  <div class="dialog-cover" @click.self="close">
    <div class="dialog-box">
      <p class="dialog-box-titlt">请选择做题列表</p>
      <div class="dialog-box-list">
        <!-- 一级标题 -->
        <div v-for="(list,index1) of doExamList" :key="list.id">
          <div class="dialog-box-item" @click.stop="foldFirstLevel(index1)">
            <img
              class="isadd"
              :src="firstLevel[index1]?require('@/assets/image/s_class_unfold.png'):require('@/assets/image/s_class_fold.png')"
            />
            <p class="dialog-box-item-name">{{list.text}}</p>
            <img
              class="isopen"
              :src="firstLevel[index1]?require('@/assets/image/list_arrow_up.png'):require('@/assets/image/list_arrow_down.png')"
            />
          </div>
          <!-- 二级标题 -->
          <div ref="parentIndex" v-show="firstLevel[index1]">
            <div
              v-for="(item,index2) of list.ChildNodes"
              :key="item.id"
              @click.stop="fold(index1,index2,item.id)"
            >
              <div class="dialog-box-item__small">
                <img
                  class="isadd"
                  :src="secondLevel[index1][index2]?require('@/assets/image/s_class_unfold.png'):require('@/assets/image/s_class_fold.png')"
                />
                <p class="dialog-box-item-name">{{ item.text }}</p>
                <img
                  class="isopen"
                  :src="secondLevel[index1][index2]?require('@/assets/image/list_arrow_up.png'):require('@/assets/image/list_arrow_down.png')"
                />
              </div>
              <transition>
                <div class="dialog-box-list-a" v-show="secondLevel[index1][index2]">
                  <div
                    class="dialog-box-item-a"
                    v-for="exam of examList"
                    :key="exam.id"
                    @click.stop="toDoExercisePage(exam.id)"
                  >
                    <p class="dialog-box-item-a-name" v-text="exam.text"></p>
                    <p class="dialog-box-item-a-const">
                      题量：
                      <span v-text="exam.Progress"></span>
                    </p>
                    <p class="dialog-box-item-a-correct">
                      正确率：
                      <span v-text="exam.Rate"></span>
                    </p>
                    <img
                      class="dialog-box-item-a-write"
                      src="@/assets/image/test_write_grey.png"
                      alt
                    />
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <input type="hidden" v-model="flag" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    classifyId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      flag: 0,
      firstLevel: [], //二级列表展示与否 a[1] = true
      secondLevel: [], //对应三级列表是否展示 例如:a[1][2] = true;
      examList: [] //三级列表
    };
  },
  computed: {
    ...mapState(["doExamList"])
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initData() {
      //如果数据为空则初始化
      this.doExamList.length = 10;
      for (let i = 0; i < this.doExamList.length; i++) {
        if (!this.secondLevel[i]) {
          this.secondLevel[i] = [];
        }
      }
    },
    initPage() {},
    //关闭弹框
    close() {
      this.$emit("hidden", false);
    },
    foldFirstLevel(index) {
      this.$set(this.firstLevel, index, !this.firstLevel[index]);
    },
    fold(index1, index2, id) {
      this.$set(
        this.secondLevel[index1],
        index2,
        !this.secondLevel[index1][index2]
      );
      this.flag++; //强制刷新视图
      //TODO: id为test 开头则直接进入试卷，否则显示第三级列表
      if (this.secondLevel[index1][index2]) {
        this.showExamList(id);
      }
    },
    //第三级列表数据
    showExamList(id) {
      if (id.match(/test/g)) {
        const _id = parseInt(id.replace(/test-/g, ""));
        this.toDoExercisePage(_id);
        return;
      }
      this.api.getTestList(id).then(res => {
        this.examList = JSON.parse(res);
      });
    },
    //跳转做题页面
    toDoExercisePage(id) {
      this.$router.push({
        name: "doExercise",
        params: { classifyId: this.classifyId, id: id }
      });
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  top: 72px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
  .dialog-box {
    width: 600px;
    height: 700px;
    background-color: #fff;
    margin-top: 60px;
    border-radius: 12px;
    overflow-y: auto;
    .dialog-box-titlt {
      font-size: 24px;
      color: #1e1e1e;
      font-weight: bold;
      margin-top: 40px;
      margin-bottom: 20px;
      text-align: center;
    }
    .dialog-box-list {
      width: 520px;
      margin-left: 40px;
      overflow: hidden;
      .dialog-box-item {
        height: 60px;
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        cursor: pointer;
        .isadd {
          width: 20px;
          height: 20px;
          margin-top: 20px;
        }
        .dialog-box-item-name {
          font-size: 16px;
          color: #1e1e1e;
          line-height: 60px;
          margin-left: 16px;
        }

        .isopen {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 18px;
          right: 0px;
        }
      }
      .dialog-box-item__small {
        height: 48px;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        position: relative;
        cursor: pointer;
        .isadd {
          width: 16px;
          height: 16px;
          margin-top: 20px;
        }
        .dialog-box-item-name {
          font-size: 16px;
          color: #1e1e1e;
          line-height: 60px;
          margin-left: 16px;
        }

        .isopen {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 18px;
          right: 0px;
        }
      }
      .dialog-box-list-a {
        background-color: #f7f8fa;
        padding: 1px;
        cursor: pointer;
        .dialog-box-item-a {
          width: 100%;
          display: flex;
          margin: 16px 0px;
          flex-direction: row;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .dialog-box-item-a-name {
            font-size: 14px;
            color: #1e1e1e;
            line-height: 20px;
            text-align: left;
            margin-left: 30px;
            width: 200px;
          }

          .dialog-box-item-a-const {
            font-size: 12px;
            color: #999999;
            margin-left: 40px;
            min-width: 60px;
          }

          .dialog-box-item-a-correct {
            min-width: 100px;
            font-size: 12px;
            color: #999999;
            margin-left: 20px;
          }
          .dialog-box-item-a-write {
            margin-left: 20px;
          }
        }
      }
    }
  }
}
.dialog-cover ::-webkit-scrollbar {
  display: none;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-to,
.v-levae {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s ease;
}
</style>