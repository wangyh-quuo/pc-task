import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: '/exam/login',
    name: 'practiceLogin',
    component: () => import(/* webpackChunkName: "practiceLogin" */ '../views/exam/login.vue')
  },
  {
    path: '/exam/practiceTest',
    name: 'practiceTest',
    component: () => import(/* webpackChunkName: "practiceTest" */ '../views/exam/practiceTest.vue')
  },
  {
    path: '/exam/doExam',
    name: 'doExam',
    component: () => import(/* webpackChunkName: "practiceTest" */ '../views/exam/doExam.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
