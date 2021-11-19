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
        id="email"
        :text="inputs.email.text"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        :errorMsg="inputs.email.validate.message"
        :confirmErr="confirmValidError"
      />
      <BaseInputPassword
        id="password"
        :text="inputs.password.text"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        :errorMsg="inputs.password.validate.message"
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
        text: "ایمیل",
        isValid: true,
        validate: {
          required: true,
          email: true,
        },
      },
      password: {
        val: "",
        text: "رمزعبور",
        isValid: true,
        validate: {
          required: true,
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
