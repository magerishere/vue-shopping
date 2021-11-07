<template>
  <div class="row">
    <user-dashboard-sidebar></user-dashboard-sidebar>
    <section class="col-md-9">
      <base-card>
        <template #nav>
          <h5>
            {{ cardTitle }}
            <base-button @click="logout" class="float-end">خروج</base-button>
          </h5>
          <hr />
        </template>
        <router-view v-slot="{ Component }">
          <transition name="dashboard" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import UserDashboardSidebar from "../../components/dashboard/UserDashboardSidebar.vue";
export default {
  name: "UserDashboard",
  components: {
    UserDashboardSidebar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isAuth = computed(function () {
      return store.getters["auth/isAuth"];
    });

    async function logout() {
      try {
        await store.dispatch("auth/logout");
      } catch (error) {
        console.log(error);
      }
    }

    const cardTitle = computed(function () {
      return route.meta.title;
    });
    return {
      isAuth,
      logout,
      cardTitle,
    };
  },
};
</script>

<style scoped>
.dashboard-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.dashboard-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.dashboard-enter-active {
  transition: all 0.3s ease-out;
}

.dashboard-leave-active {
  transition: all 0.3s ease-in;
}

.dashboard-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dashboard-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
