export default [
  {
    path: "/auth",
    redirect: { name: "login" },
    component: () => import("../frontend/views/auth/UserAuth.vue"),
    name: "auth",
    children: [
      {
        path: "login",
        component: () => import("../frontend/components/auth/UserLogin.vue"),
        name: "login",
      },
      {
        path: "register",
        component: () => import("../frontend/components/auth/UserRegister.vue"),
        name: "register",
      },
    ],
  },
];
