<template>
  <the-header></the-header>

  <article>
    <router-view v-slot="{ Component }">
      <transition name="router" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </article>
  <base-toast v-if="!!toastStatus" :mode="toastStatus"></base-toast>

  <!-- <the-footer></the-footer> -->
</template>

<script>
import "./assets/css/bootstrap.rtl.min.css";
import "./assets/css/styles.css";
import "./assets/css/font-awesome.css";
import { computed } from "vue";
import TheHeader from "./components/header/TheHeader.vue";
import TheFooter from "./components/footer/TheFooter.vue";

import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  setup() {
    const store = useStore();
    store.dispatch("auth/tryLogin");

    const toastStatus = computed(() => {
      return store.getters["getToastStatus"];
    });

    return { toastStatus };
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: Vazir, sans-serif;
}

body {
  margin: 0;
  direction: rtl;
  overflow-x: hidden;
  height: 100vh;
  position: relative;
  font-family: Vazir, sans-serif;
}
@media screen and (min-width: 768px) {
  article {
    padding: 0 7rem;
  }
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.router-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.router-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.router-enter-active {
  transition: all 0.3s ease-out;
}

.router-leave-active {
  transition: all 0.3s ease-in;
}

.router-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.router-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.form-control {
  border-color: rgba(0, 0, 0, 0.3);
  direction: rtl;
}
.form-control:focus {
  border-color: darkviolet;
  box-shadow: 0 0 0 0.25rem rgba(148, 0, 211, 0.4);
}

.error {
  border-color: red;
}

.form-text-error {
  margin-top: 0.25 rem;
  font-size: 0.875em;
  color: red;
}

.row {
  width: 100%;
}

/* table transition */

.table-list-enter-from {
  opacity: 0.5;
  transform: translateX(-60px);
}

.table-list-enter-active {
  transition: all 1s ease-out;
}

.table-list-enter-to,
.table-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.table-list-leave-active {
  transition: all 1s;
}
.table-list-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

th {
  position: relative;
}
</style>
