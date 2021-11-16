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
        text="نام کاربری"
        id="userName"
        v-model.trim="inputs.userName.val"
        :isValid="inputs.userName.isValid"
        errorMsg="نام کاربری خود را وارد کنید"
        :confirmErr="confirmValidError"
      />
      <BaseInputText
        text="ایمیل"
        id="email"
        v-model.trim="inputs.email.val"
        :isValid="inputs.email.isValid"
        errorMsg="ما ایمیل شمارا محفوظ نگه میداریم"
        :confirmErr="confirmValidError"
      />
      <BaseInputPassword
        text="رمزعبور"
        id="password"
        v-model.trim="inputs.password.val"
        :isValid="inputs.password.isValid"
        errorMsg="رمزعبور معتبر وارد کنید (حداقل 8 کاراکتر)"
        :confirmErr="confirmValidError"
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
        isValid: true,
        validate: {
          required: true,
        },
      },
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
