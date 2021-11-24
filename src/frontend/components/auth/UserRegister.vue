<template>
  <div>
    <base-dialog :show="form.config.isLoading" fixed title="در حال ثبت نام ...">
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
        :text="inputs.userName.text"
        id="userName"
        v-model.trim="inputs.userName.val"
        :isValid="inputs.userName.isValid"
        :errorMsg="inputs.userName.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <BaseInputText
        :text="inputs.email.text"
        id="email"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        :errorMsg="inputs.email.validate.message"
        :confirmErr="form.errors.confirmValid"
        placeholder="ما ایمیل شمارا محفوظ نگه میداریم"
      />
      <BaseInputPassword
        :text="inputs.password.text"
        id="password"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        :errorMsg="inputs.password.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <BaseInputCheckbox
        id="role"
        name="role"
        :text="inputs.role.text"
        v-model="inputs.role.val"
      />

      <div class="actions">
        <base-button>ثبت نام</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form/useForm";

export default {
  name: "UserRegister",
  setup() {
    // form data
    const inputs = reactive({
      userName: {
        val: "",
        text: "نام کاربری",
        isValid: true,
        validate: {
          required: true,
        },
      },
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
          min: 8,
        },
      },
      role: {
        val: false, // customer as default
        text: "من فروشنده هستم",
      },
    });
    const form = useForm();
    const submitForm = () => form.submit("auth/register", inputs);

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
