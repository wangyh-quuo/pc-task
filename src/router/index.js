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
        /* webpackChunkName: "practiceLogin" */ "../views/notFound/notFound.vue"
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
    path: "/exam/practiceTest",
    name: "practiceTest",
    component: () =>
      import(
        /* webpackChunkName: "practiceTest" */ "../views/exam/practiceTest.vue"
      )
  },
  {
    path: "/exam/doExam",
    name: "doExam",
    component: () =>
      import(/* webpackChunkName: "doExam" */ "../views/exam/doExam.vue")
  },
  {
    path: "/report",
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
    path: "/doExercise/:id",
    name: "doExercise",
    component: () =>
      import(
        /* webpackChunkName: "doExercise" */ "../views/practice/doExercise.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
