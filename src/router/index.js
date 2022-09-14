import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("../components/Manage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
  console.log("Hello me");
  console.log("to: ", to);
  console.log("from: ", from);

  next();
});

export default router;
