import { createRouter, createWebHistory } from "vue-router";
import ProductsList from "./frontend/views/products/ProductsList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // frontend routes
    { path: "/", redirect: "/products", name: "home" },
    { path: "/products", component: ProductsList, name: "products" },
    {
      name: "blogs",
      path: "/blogs",
      component: () => import("./frontend/views/blogs/BlogsList.vue"),
    },
    {
      name: "blogDetail",
      path: "/blog/:id",
      component: () => import("./frontend/views/blogs/BlogDetail.vue"),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: "/auth",
      redirect: { name: "login" },
      component: () => import("./frontend/views/auth/UserAuth.vue"),
      name: "auth",
      children: [
        {
          path: "login",
          component: () => import("./frontend/components/auth/UserLogin.vue"),
          name: "login",
        },
        {
          path: "register",
          component: () =>
            import("./frontend/components/auth/UserRegister.vue"),
          name: "register",
        },
      ],
    },
    // backend routes
    {
      path: "/dashboard",
      component: () => import("./backend/views/dashboard/UserDashboard.vue"),
      children: [
        {
          name: "dashboard",
          path: "",
          component: () =>
            import("./backend/components/dashboard/UserDashboardContent.vue"),
          meta: {
            title: "داشبورد",
          },
        },
        {
          name: "userBlogs",
          path: "blogs",
          component: () => import("./backend/views/blogs/UserBlogsList.vue"),
          meta: {
            title: "مطالب من",
          },
        },
        {
          name: "blogCreate",
          path: "blog/create",
          component: () =>
            import("./backend/components/blogs/UserBlogCreate.vue"),
          meta: {
            title: "ایجاد مطلب",
          },
        },
        {
          name: "blogEdit",
          path: "blog/:id/edit",
          component: () =>
            import("./backend/components/blogs/UserBlogEdit.vue"),
          meta: {
            title: "ویرایش مطلب",
          },
          props: (route) => ({ id: Number(route.params.id) }),
        },
      ],
    },
  ],
});

export default router;
