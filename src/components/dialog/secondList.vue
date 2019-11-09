<template>
  <!-- 二级标题 -->
  <div>
    <div v-for="(item,index) of 2" :key="item+index" @click="fold(index,$event)">
      <div class="dialog-box-item__small">
        <img
          class="isadd"
          :src="firstLevelList[parentIndex][index]?require('@/assets/image/s_class_fold.png'):require('@/assets/image/s_class_fold.png')"
        />
        <p class="dialog-box-item-name">二级标题{{ item }}</p>
        <img
          class="isopen"
          :src="firstLevelList[parentIndex][index]?require('@/assets/image/list_arrow_up.png'):require('@/assets/image/list_arrow_down.png')"
        />
      </div>
      <transition>
        <div class="dialog-box-list-a" v-show="firstLevelList[parentIndex][index]">
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
            <img class="dialog-box-item-a-write" src="@/assets/image/test_write_grey.png" alt />
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
            <img class="dialog-box-item-a-write" src="@/assets/image/test_write_grey.png" alt />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    parentIndex: {
      type: Number
    }
  },
  data() {
    return {
      firstLevelList: []
    };
  },
  created() {
    //如果数据为空则给空
    if (!this.firstLevelList[this.parentIndex]) {
      this.firstLevelList[this.parentIndex] = [];
    }
    console.log(this.firstLevelList);
  },
  methods: {
    initPage() {
      //如果数据为空则给空
      if (!this.firstLevelList[this.parentIndex]) {
        this.firstLevelList[this.parentIndex] = [];
      }
    },
    fold(index) {
      this.$set(
        this.firstLevelList[this.parentIndex],
        index,
        !this.firstLevelList[this.parentIndex][index]
      );
      //TODO: 不更新视图
      let temp = this.firstLevelList[this.parentIndex].slice(0);
      this.firstLevelList[this.parentIndex] = temp;
      console.log(this.firstLevelList[this.parentIndex][index]);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>