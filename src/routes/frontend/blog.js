export default [
  // frontend routes
  {
    name: "blogs",
    path: "/blogs",
    component: () => import("@/frontend/views/blogs/BlogsList.vue"),
  },
  {
    name: "blogDetail",
    path: "/blog/:id",
    component: () => import("@/frontend/views/blogs/BlogDetail.vue"),
    props: (route) => ({ id: Number(route.params.id) }),
  },
];
