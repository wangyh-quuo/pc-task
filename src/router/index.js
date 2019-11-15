import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "*",
    name: "404",
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ "../views/notFound/notFound.vue"
      )
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/exam/practiceLogin",
    name: "practiceLogin",
    component: () =>
      import(/* webpackChunkName: "practiceLogin" */ "../views/exam/login.vue")
  },
  {
    path: "/exam/practiceTest/:idNumber",
    name: "practiceTest",
    component: () =>
      import(
        /* webpackChunkName: "practiceTest" */ "../views/exam/practiceTest.vue"
      )
  },
  {
    path: "/exam/doExam/:idNumber",
    name: "doExam",
    component: () =>
      import(/* webpackChunkName: "doExam" */ "../views/exam/doExam.vue")
  },
  {
    path: "/report/:testId/:id",
    name: "report",
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/practice/report.vue")
  },
  {
    path: "/subjectList/:type",
    name: "subjectList",
    component: () =>
      import(
        /* webpackChunkName: "subjectList" */ "../views/practice/subjectList.vue"
      )
  },
  {
    path: "/doExercise/:classifyId/:id",
    name: "doExercise",
    component: () =>
      import(
        /* webpackChunkName: "doExercise" */ "../views/practice/doExercise.vue"
      )
  },
  {
    path: "/answer/:id/:type",
    name: "answer",
    component: () =>
      import(/* webpackChunkName: "answer" */ "../views/practice/answer.vue")
  },
  {
    path: "/mistake/:id",
    name: "mistake",
    component: () =>
      import(/* webpackChunkName: "mistake" */ "../views/practice/mistake.vue")
  },
  {
    path: "/dailyPractice/:classifyId",
    name: "dailyPractice",
    component: () =>
      import(
        /* webpackChunkName: "dailyPractice" */ "../views/practice/dailyPractice.vue"
      )
  },
  {
    path: "/collection/:id",
    name: "collection",
    component: () =>
      import(
        /* webpackChunkName: "collection" */ "../views/practice/collection.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
