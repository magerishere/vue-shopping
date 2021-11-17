import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./routes/auth";
import frontendBlogRoutes from "./routes/frontend/blog";
import backendBlogRoutes from "./routes/backend/blog";
import frontendProductRoutes from "./routes/frontend/product";
import backendProductRoutes from "./routes/backend/product";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,

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
