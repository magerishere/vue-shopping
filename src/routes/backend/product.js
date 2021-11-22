export default [
  {
    name: "userProducts",
    path: "products",
    component: () => import("@/backend/views/products/UserProductsList.vue"),
    meta: {
      title: "محصولات من",
    },
  },
  {
    name: "productCreate",
    path: "product/create",
    component: () =>
      import("@/backend/components/products/UserProductCreate.vue"),
    meta: {
      title: "ایجاد محصول",
    },
  },
  {
    name: "productEdit",
    path: "product/:id/edit",
    component: () =>
      import("@/backend/components/products/UserProductEdit.vue"),
    meta: {
      title: "ویرایش محصول",
    },
    props: (route) => ({ id: Number(route.params.id) }),
  },
];
