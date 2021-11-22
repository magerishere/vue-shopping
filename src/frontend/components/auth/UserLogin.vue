<template>
  <div>
    <base-dialog
      :show="form.config.isLoading"
      fixed
      title="در حال وارد شدن ..."
    >
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!form.errors.messages"
      title="خطایی رخ داد."
      :messages="form.errors.messages"
      @close="form.errors.confirm"
    >
    </base-dialog>
    <form @submit.prevent="submitForm">
      <BaseInputText
        id="email"
        :text="inputs.email.text"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        :errorMsg="inputs.email.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <BaseInputPassword
        id="password"
        :text="inputs.password.text"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        :errorMsg="inputs.password.validate.message"
        :confirmErr="form.errors.confirmValid"
      />

      <div class="actions">
        <base-button>ورود</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form/useForm";

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

    const form = useForm();

    const submitForm = () => form.submit("auth/login", inputs);

    return {
      inputs,
      submitForm,
      form,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
