<template>
  <header>
    <nav class="container">
      <ul>
        <li>
          <base-button link :to="{ name: 'products' }">محصولات</base-button>
        </li>
        <li><base-button link :to="{ name: 'blogs' }">بلاگ</base-button></li>
        <div class="float-end">
          <li>
            <base-button link :to="{ name: 'userCart' }"
              ><i class="fa fa-cart-plus" aria-hidden="true"></i
            ></base-button>
          </li>
          <li v-if="isAuth">
            <base-button link :to="{ name: 'dashboard' }">داشبورد</base-button>
          </li>
          <li v-else>
            <base-button link :to="{ name: 'login' }">ورود</base-button>
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "TheHeader",
  setup() {
    const store = useStore();
    const isAuth = computed(function () {
      return store.getters["auth/isAuth"];
    });

    return {
      isAuth,
    };
  },
};
</script>

<style scoped>
header {
  background-color: darkviolet;
  /* padding: 0 6rem; */
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 1rem;
  display: inline-block;
}
</style>
