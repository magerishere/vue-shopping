import ProductsList from "@/frontend/views/products/ProductsList.vue";

export default [
  { path: "/", redirect: "/products", name: "home" },
  { path: "/products", component: ProductsList, name: "products" },
  {
    path: "/product/:id",
    component: () => import("@/frontend/views/products/ProductDetail.vue"),
    name: "productDetail",
    props: (route) => ({ id: Number(route.params.id) }),
  },
];
