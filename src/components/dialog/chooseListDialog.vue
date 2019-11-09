<template>
  <div class="dialog-cover" @click.self="close">
    <div class="dialog-box">
      <p class="dialog-box-titlt">请选择做题列表</p>
      <div class="dialog-box-list">
        <!-- 一级标题 -->
        <div v-for="(topLevelList,index) of 5" :key="index" :pIndex="index">
          <div class="dialog-box-item" @click="foldFirstLevel(index)">
            <img
              class="isadd"
              :src="firstLevel[index]?require('@/assets/image/s_class_unfold.png'):require('@/assets/image/s_class_fold.png')"
            />
            <p class="dialog-box-item-name">一级标题{{topLevelList}}</p>
            <img
              class="isopen"
              :src="firstLevel[index]?require('@/assets/image/list_arrow_up.png'):require('@/assets/image/list_arrow_down.png')"
            />
          </div>
          <!-- 二级标题
          <div ref="parentIndex" v-show="firstLevel[index]" :data="index" @click="setParentIndex(index)">
            <div v-for="(item,index) of 2" :key="index" @click="fold(index,$event)">
              <div class="dialog-box-item__small">
                <img
                  class="isadd"
                  :src="foldArray[index]?require('@/assets/image/s_class_unfold.png'):require('@/assets/image/s_class_fold.png')"
                />
                <p class="dialog-box-item-name">二级标题{{ item }}</p>
                <img
                  class="isopen"
                  :src="foldArray[index]?require('@/assets/image/list_arrow_up.png'):require('@/assets/image/list_arrow_down.png')"
                />
              </div>
              <transition>
                <div class="dialog-box-list-a" v-show="foldArray[index]">
                  <div class="dialog-box-item-a">
                    <p class="dialog-box-item-a-name">呼吸系统疾病撒大大啊实打实的啊实打实</p>
                    <p class="dialog-box-item-a-const">
                      题量：
                      <span>10/100</span>
                    </p>
                    <p class="dialog-box-item-a-correct">
                      正确率：
                      <span>90%</span>
                    </p>
                    <img
                      class="dialog-box-item-a-write"
                      src="@/assets/image/test_write_grey.png"
                      alt
                    />
                  </div>

                  <div class="dialog-box-item-a">
                    <p class="dialog-box-item-a-name">呼吸系统疾病</p>
                    <p class="dialog-box-item-a-const">
                      题量：
                      <span>10/100</span>
                    </p>
                    <p class="dialog-box-item-a-correct">
                      正确率：
                      <span>90%</span>
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
          </div>-->
          <child-list :parentIndex="index" v-if="firstLevel[index]"></child-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import childList from "./secondList"
export default {
  data() {
    return {
      /*
        firstLevelList: [ [false,false,false] ,[],[]]
      */
      firstLevel: [],
      firstLevelList: [],
      foldArray: []
    };
  },
  methods: {
    //关闭弹框
    close() {
      this.$emit("hidden", false);
    },
    foldFirstLevel(index) {
      this.$set(this.firstLevel, index, !this.firstLevel[index]);
    }
  },
  components: {
    childList
  }
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
        .dialog-box-item-a {
          width: 100%;
          display: flex;
          margin: 16px 0px;
          flex-direction: row;
          display: flex;
          align-items: center;
          justify-content: center;
          .dialog-box-item-a-name {
            font-size: 14px;
            color: #1e1e1e;
            line-height: 20px;
            text-align: left;
            /*margin-left: 30px;*/
            width: 200px;
          }

          .dialog-box-item-a-const {
            font-size: 12px;
            color: #999999;
            margin-left: 40px;
          }

          .dialog-box-item-a-correct {
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