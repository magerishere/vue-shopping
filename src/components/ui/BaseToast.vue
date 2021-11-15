<template>
  <teleport to="body">
    <transition appear name="toast" @after-leave="afterLeave">
      <div class="custom-toast" :class="mode" v-if="alive">
        <h4>با موفقیت انجام شد</h4>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "BaseToast",
  props: {
    mode: {
      type: String,
      required: false,
      default: "success",
    },
  },
  data() {
    return {
      alive: true,
    };
  },
  created() {
    setInterval(() => {
      this.alive = false;
    }, 5000);
  },
  methods: {
    afterLeave() {
      this.$store.commit("setToastStatus", "");
    },
  },
};
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateX(300px);
}

.toast-enter-active {
  transition: all 0.7s ease-out;
}

.toast-leave-active {
  transition: all 0.7s ease-in;
}

.toast-enter-to,
.toast-leave-from {
  transform: translateX(0);
}

.custom-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  color: #fff;
}

.success {
  background-color: darkslategray;
}
</style>
