/**
 * Author: Meng
 * Date: 2024-04-16
 * Modify: 2024-04-16
 * Desc: 
 *  import { useRouter, useRoute } from 'vue-router'
 *  const router = useRouter()
    const route = useRoute()
    router.push({ name: 'search', query: { ...route.query, id: 1} })

    const id = route.params.id
 * 
 */
import { createRouter, createWebHistory } from "vue-router";
import LaunchView from "../pages/LaunchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
    // 延迟滚动到顶部
    // return new Promise((resolve, reject) => { setTimeout(() => { resolve({ left: 0, top: 0 }); }, 500) });
  },
  routes: [
    // {
    //   path: "",
    //   name: "launch",
    //   component: LaunchView,
    // },
    {
      path: "/",
      name: "Main",
      redirect: "/home",
      component: () => import("../pages/main/MainView.vue"),
      children: [
        {
          path: "home",
          name: "Home",
          meta: { transition: "slide-left" },
          component: () => import("../pages/main/HomeView.vue"),
        },
        {
          path: "hot",
          name: "Hot",
          meta: { transition: "slide-left" },
          component: () => import("../pages/main/HotView.vue"),
        },
        {
          path: "my",
          name: "My",
          meta: { transition: "slide-left" },
          component: () => import("../pages/main/MyView.vue"),
        },
        {
          path: "account",
          name: "Account",
          meta: { transition: "slide-left" },
          // component: () => import("../components/layout/Layout.vue"),
          children: [
            {
              path: "info",
              name: "Info",
              meta: { transition: "slide-left" },
              component: () => import("../pages/account/UserView.vue"),
            },
          ],
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      meta: { transition: "slide-left" },
      component: () => import("../pages/account/LoginView.vue"),
    },
    {
      path: "/notfound",
      name: "Notfound",
      meta: { transition: "slide-left" },
      component: () => import("../pages/warn/NotfoundView.vue"),
    },
    {
      path: "/*",
      name: "NotFound",
      meta: { title: "404", hidden: true },
      component: () => import("../pages/warn/NotfoundView.vue"),
    },
  ],
});

export default router;
