export default [
  {
    name: "dashboard",
    path: "",
    component: () =>
      import("@/backend/components/dashboard/UserDashboardContent.vue"),
    meta: {
      title: "داشبورد",
    },
  },
  {
    name: "userBlogs",
    path: "blogs",
    component: () => import("@/backend/views/blogs/UserBlogsList.vue"),
    meta: {
      title: "مطالب من",
    },
  },
  {
    name: "blogCreate",
    path: "blog/create",
    component: () => import("@/backend/components/blogs/UserBlogCreate.vue"),
    meta: {
      title: "ایجاد مطلب",
    },
  },
  {
    name: "blogEdit",
    path: "blog/:id/edit",
    component: () => import("@/backend/components/blogs/UserBlogEdit.vue"),
    meta: {
      title: "ویرایش مطلب",
    },
    props: (route) => ({ id: Number(route.params.id) }),
  },
];
