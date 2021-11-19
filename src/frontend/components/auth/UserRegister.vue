<template>
  <div>
    <base-dialog :show="options.isLoading" fixed title="در حال ثبت نام ...">
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
        :text="inputs.userName.text"
        id="userName"
        v-model.trim="inputs.userName.val"
        :isValid="inputs.userName.isValid"
        :errorMsg="inputs.userName.validate.message"
        :confirmErr="confirmValidError"
      />
      <BaseInputText
        :text="inputs.email.text"
        id="email"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        :errorMsg="inputs.email.validate.message"
        :confirmErr="confirmValidError"
        placeholder="ما ایمیل شمارا محفوظ نگه میداریم"
      />
      <BaseInputPassword
        :text="inputs.password.text"
        id="password"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        :errorMsg="inputs.password.validate.message"
        :confirmErr="confirmValidError"
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
import useForm from "@/hooks/form";
import useErrors from "@/hooks/errors";
import useOptions from "@/hooks/options";

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
    // form options
    const options = useOptions();
    // submit form
    const submitForm = () => useForm(inputs, "auth/register", options);
    // error handler after submit form
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
