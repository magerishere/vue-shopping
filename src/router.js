import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import authRoutes from "./routes/auth";
import cartRoutes from "./routes/cart";
import frontendBlogRoutes from "./routes/frontend/blog";
import frontendProductRoutes from "./routes/frontend/product";
import backendBlogRoutes from "./routes/backend/blog";
import backendProductRoutes from "./routes/backend/product";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    ...cartRoutes,
    // frontend routes
    ...frontendProductRoutes,
    ...frontendBlogRoutes,

    // backend routes
    {
      path: "/dashboard",
      component: () => import("./backend/views/dashboard/UserDashboard.vue"),
      children: [...backendBlogRoutes, ...backendProductRoutes],
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isAuth = store.getters["auth/isAuth"];
  if (to.meta.auth && !isAuth) {
    next({ name: "auth" });
  } else if (!to.meta.auth && isAuth) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
