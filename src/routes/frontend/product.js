import ProductsList from "@/frontend/views/products/ProductsList.vue";

export default [
  { path: "/", redirect: "/products", name: "home" },
  { path: "/products", component: ProductsList, name: "products" },
];
