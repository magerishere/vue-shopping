<template>
  <teleport to="body">
    <div v-if="show" @click="close" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header :class="mode">
          <h1>{{ title }}</h1>
        </header>
        <section class="messages">
          <slot>
            <div v-if="messages">
              <p v-for="message in messages" :key="message">{{ message }}</p>
            </div>
            <p v-if="confirm" class="text-center">
              آیا از انجام این کار مطمئن هستید؟
            </p>
          </slot>
        </section>
        <menu class="actions" v-if="!fixed">
          <slot name="actions">
            <base-button v-if="confirm" :mode="mode" @click="confirmed"
              >تایید</base-button
            >
            <base-button @click="close">بستن</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  emits: {
    close: {
      type: Function,
      required: true,
    },
    confirmed: {
      type: Function,
      required: true,
    },
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    confirm: {
      type: Boolean,
      required: false,
      default: false,
    },
    title: {
      type: String,
      required: false,
      default: "در حال انجام ...",
    },
    messages: {
      type: Array,
      required: false,
      default: null,
    },
    mode: {
      type: String,
      required: false,
    },
  },
  setup(props, context) {
    function close() {
      if (props.fixed) {
        return;
      }
      context.emit("close");
    }

    function confirmed() {
      if (!props.confirm) {
        return;
      }
      context.emit("confirmed");
    }
    return { close, confirmed };
  },
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  top: 0;
  left: 0;
}
dialog {
  position: fixed;
  top: 30%;
  z-index: 100;
  width: 80%;
  border-radius: 18px;
  padding: 0;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}
.messages {
  padding: 0 2rem;
}
header {
  background-color: darkviolet;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}
header h1 {
  color: #fff;
  text-align: center;
}

.actions {
  float: left;
  margin-left: 1rem;
}

.actions > * {
  margin: 0 0.5rem;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.dialog-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

.danger {
  background-color: darkred;
}
</style>
