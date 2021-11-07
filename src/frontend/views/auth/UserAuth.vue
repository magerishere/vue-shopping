<template>
  <base-card mode="flat">
    <template #nav>
      <auth-nav></auth-nav>
    </template>
    <router-view v-slot="{ Component }">
      <transition name="auth" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </base-card>
</template>

<script>
import AuthNav from "../../components/auth/AuthNav.vue";
export default {
  components: {
    AuthNav,
  },
};
</script>

<style scoped>
.auth-enter-from {
  opacity: 0;
}
.auth-leave-to {
  opacity: 0;
}

.auth-enter-active {
  transition: all 0.3s ease-out;
}
.auth-leave-active {
  transition: all 0.3s ease-in;
}

.auth-enter-to {
  opacity: 1;
}
.auth-leave-from {
  opacity: 1;
}
</style>
