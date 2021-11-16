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
      <BaseInputText
        text="ایمیل"
        id="email"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        errorMsg="ایمیل معتبر وارد کنید"
        :confirmErr="confirmValidError"
      />
      <BaseInputPassword
        text="رمزعبور"
        id="password"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        errorMsg="رمزعبور خودرا وارد کنید"
        :confirmErr="confirmValidError"
      />

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
