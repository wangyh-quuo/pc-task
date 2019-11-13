<template>
  <div>
    <ylt-template>
      <template #content-top>
        <div class="content-nav">
          <ylt-nav-bar @setCurrentMode="setCurrentMode"></ylt-nav-bar>
        </div>
      </template>
      <template #content-center>
        <div class="page-box">
          <!-- 我的收藏 -->
          <div v-if="menuSideIndex==1">
            <div
              class="page-box-item"
              v-for="item of collectionList.results"
              :key="item.id"
              @click="toMistakePage(item.id)"
            >
              <div class="page-box-item-left" v-text="item.title"></div>
              <div class="page-box-item-right-a">
                <p>{{ item.count }}题</p>
                <img src="@/assets/image/list_arrow_right.png" alt />
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="mistakeList.rows"
                :page-count="mistakeList.total"
                :current-page="collectionCurrentPage"
                @current-change="queryCollectionByPage"
              ></el-pagination>
            </div>
          </div>
          <!-- 我的错题 -->
          <div v-if="menuSideIndex==2">
            <div
              class="page-box-item"
              v-for="item of mistakeList.results"
              :key="item.id"
              @click="toMistakePage(item.id)"
            >
              <div class="page-box-item-left" v-text="item.title"></div>
              <div class="page-box-item-right-a">
                <p>{{ item.count }}题</p>
                <img src="@/assets/image/list_arrow_right.png" alt />
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="mistakeList.rows"
                :page-count="mistakeList.total"
                :current-page="mistakeCurrentPage"
                @current-change="queryMistakeByPage"
              ></el-pagination>
            </div>
          </div>
          <!-- 已完成的题目 -->
          <div v-if="menuSideIndex==3">
            <div
              class="page-box-item"
              v-for="item of finishList.results"
              :key="item.id"
              @click="toReportPage(item)"
            >
              <div class="page-box-item-left" v-text="item.title"></div>
              <div class="page-box-item-right-b">查看成绩</div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="finishList.rows"
                :page-count="finishList.total"
                :current-page="finishCurrentPage"
                @current-change="queryFinshByPage"
              ></el-pagination>
            </div>
          </div>
          <!-- 未做完的题目 -->
          <div v-if="menuSideIndex==4">
            <div
              class="page-box-item"
              v-for="item of unFinishList.results"
              :key="item.id"
              @click="toDoExamPage(item)"
            >
              <div class="page-box-item-left" v-text="item.title"></div>
              <div class="page-box-item-right-c">
                <p>
                  已做：
                  <span>12</span>
                </p>
                <p>
                  未做：
                  <span>18</span>
                </p>
                <div>继续</div>
              </div>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="unFinishList.rows"
                :page-count="unFinishList.total"
                :current-page="unFinishCurrentPage"
                @current-change="queryUnfinshByPage"
              ></el-pagination>
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
import { mapMutations, mapState } from "vuex";
export default {
  components: {
    yltTemplate,
    yltNavBar
  },
  data() {
    return {
      currentMode: 0,
      collectionList: {},
      mistakeList: {},
      finishList: {},
      unFinishList: {},
      collectionCurrentPage: 1,
      mistakeCurrentPage: 1,
      finishCurrentPage: 1,
      unFinishCurrentPage: 1
    };
  },
  computed: {
    ...mapState(["menuSideIndex", "typeList", "currentIndex"])
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapMutations(["setMenuSideIndex"]),
    initPage() {},
    setCurrentMode(id) {
      this.currentMode = id;
      switch (this.menuSideIndex) {
        case 1:
          //请求数据
          this.getCollectionList(
            this.typeList[this.currentIndex].id,
            1,
            this.currentMode
          );
          break;
        case 2:
          //请求数据
          this.getMistakeList(
            this.typeList[this.currentIndex].id,
            1,
            this.currentMode
          );
          break;
        case 3:
          //请求数据
          this.getDoExamRecords(
            1,
            1,
            this.typeList[this.currentIndex].id,
            this.currentMode
          );
          break;
        case 4:
          //请求数据
          this.getDoExamRecords(
            0,
            1,
            this.typeList[this.currentIndex].id,
            this.currentMode
          );
          break;
      }
    },
    //收藏列表
    getCollectionList(moduleTypeId, page, mid) {
      this.api.getCollectionList(moduleTypeId, page, mid)
        .then(res => {
          this.collectionList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },

    queryCollectionByPage(pageIndex) {
      console.log(pageIndex);
    },
    //错题列表
    getMistakeList(moduleTypeId, page, mid) {
      this.api
        .getMistakeList(moduleTypeId, page, mid)
        .then(res => {
          this.mistakeList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 错题列表页号修改后
     * @param {Number} pageIndex 页号
     */
    queryMistakeByPage(pageIndex) {
      //请求改变页后的数据
      this.getMistakeList(
        this.typeList[this.currentIndex].id,
        pageIndex,
        this.currentMode
      );
    },
    /**
     * 错题页面
     */
    toMistakePage(id) {
      this.$router.push({
        name: "mistake",
        params: { id: id }
      });
    },
    /**
     * 做题记录
     * @param {Number} complete 0未完成,1已完成
     * @param {Number} page 页号默认0
     * @param {Number} moduleTypeId
     * @param {Number} mid 试题类型默认0
     */
    getDoExamRecords(complete, page, moduleTypeId, mid) {
      this.api
        .getDoExamRecords(complete, page, moduleTypeId, mid)
        .then(res => {
          if (complete == 0) {
            this.unFinishList = res;
          } else if (complete == 1) {
            this.finishList = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 第n页已完成
     */
    queryFinshByPage(pageIndex) {
      //请求第n页数据
      this.getDoExamRecords(
        1,
        pageIndex,
        this.typeList[this.currentIndex].id,
        this.currentMode
      );
    },
    /**
     * 第n页未完成
     */
    queryUnfinshByPage(pageIndex) {
      //请求第n页数据
      this.getDoExamRecords(
        0,
        pageIndex,
        this.typeList[this.currentIndex].id,
        this.currentMode
      );
    },
    //查看我的成绩
    toReportPage(item) {
      this.$router.push({
        name: "report",
        params: { testId: item.mid, id: item.id }
      });
    },
    toDoExamPage(item) {
      //doExercise/3/5248
      this.$router.push({
        name: "doExercise",
        params: { classifyId: item.mid, id: item.tid }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    let index = 0;
    switch (to.params.type) {
      case "collection":
        index = 1;
        break;
      case "mistake":
        index = 2;
        break;
      case "finish":
        index = 3;
        break;
      case "notFinish":
        index = 4;
        break;
      default:
        break;
    }
    next(vm => {
      vm.setMenuSideIndex(index);
      const typeId = vm.typeList[vm.currentIndex].id;
      switch (index) {
        case 1:
          vm.getCollectionList(typeId, 1, 0);
          break;
        case 2:
          //请求数据
          vm.getMistakeList(typeId, 1, 0);
          break;
        case 3:
          //请求数据
          vm.getDoExamRecords(1, 1, typeId, 0);
          break;
        case 4:
          //请求数据
          vm.getDoExamRecords(0, 1, typeId, 0);
          break;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    let index = 0;
    const typeId = this.typeList[this.currentIndex].id;
    switch (to.params.type) {
      case "mistake":
        index = 2;
        this.getMistakeList(typeId, 1, 0);
        break;
      case "finish":
        index = 3;
        this.getDoExamRecords(1, 1, typeId, 0);
        break;
      case "notFinish":
        index = 4;
        this.getDoExamRecords(0, 1, typeId, 0);
        break;
      default:
        break;
    }
    next();
    this.setMenuSideIndex(index);
  }
};
</script>

<style lang="scss" scoped>
.content-nav {
  width: 960px;
}
.page-box {
  position: relative;
  width: 100%;
  height: 540px;
  background-color: #fff;
  margin-top: 20px;
}

.page-box-item {
  width: 920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.page-box-item:hover {
  background: rgba(0, 0, 0, 0.1);
}
.page-box-item-left {
  height: 60px;
  line-height: 60px;
  color: #333333;
  font-size: 18px;
}

.page-box-item-right-a {
  color: #999999;
  font-size: 14px;
  display: flex;
  flex-direction: row;
}

.page-box-item-right-a > img {
  height: 14px;
  margin-left: 8px;
}

.page-box-item-right-b {
  width: 88px;
  height: 28px;
  font-size: 15px;
  line-height: 28px;
  color: #00b395;
  text-align: center;
  border-radius: 15px;
  background-color: rgba(0, 179, 149, 0.23);
}

.page-box-item-right-c {
  height: 100%;
  color: #999999;
  font-size: 14px;
  line-height: 80px;
  display: flex;
  flex-direction: row;
  text-align: center;
}

.page-box-item-right-c > p {
  margin-left: 20px;
}

.page-box-item-right-c > div {
  width: 64px;
  height: 28px;
  margin-top: 26px;
  margin-left: 40px;
  line-height: 28px;
  font-size: 15px;
  color: #00b395;
  border-radius: 15px;
  background-color: rgba(0, 179, 149, 0.23);
}
.page-box .pagination {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}
</style>