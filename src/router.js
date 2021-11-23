import { createRouter, createWebHistory } from "vue-router";
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

export default router;
