<template>
  <div>
    <base-dialog :show="options.isLoading" fixed title="در حال وارد شدن ...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!options.errors"
      title="خطایی رخ داد."
      :messages="options.errors"
      @close="confirmErrors"
    >
    </base-dialog>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="email" class="form-label">ایمیل</label>
        <input
          type="text"
          id="email"
          class="form-control"
          :class="{ error: !inputs.email.isValid }"
          v-model.trim="inputs.email.val"
          @blur="confirmValidError"
        />
        <div v-if="!inputs.email.isValid" class="form-text-error">
          ایمیل معتبر وارد کنید
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">رمز عبور</label>
        <input
          type="password"
          id="password"
          class="form-control"
          :class="{ error: !inputs.password.isValid }"
          v-model.trim="inputs.password.val"
          autocomplete
          @blur="confirmValidError"
        />
      </div>
      <div v-if="!inputs.password.isValid" class="form-text-error">
        رمزعبور خودرا وارد کنید
      </div>

      <div class="actions">
        <base-button>ورود</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useOptions from "@/hooks/options";
import useForm from "@/hooks/form";
import useErrors from "@/hooks/errors";

export default {
  name: "UserLogin",
  setup() {
    const inputs = reactive({
      email: {
        val: "",
        isValid: true,
        validate: {
          required: true,
          email: true,
        },
      },
      password: {
        val: "",
        isValid: true,
        validate: {
          required: true,
          min: 8,
        },
      },
    });

    const options = useOptions();
    const submitForm = () => useForm(inputs, "auth/login", options);
    const { confirmErrors, confirmValidError } = useErrors(inputs, options);

    return {
      inputs,
      options,
      submitForm,
      confirmValidError,
      confirmErrors,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
