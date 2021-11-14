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
      <div class="mb-3">
        <label for="userName" class="form-label">نام کاربری</label>
        <input
          type="userName"
          id="userName"
          class="form-control"
          :class="{ error: !inputs.userName.isValid }"
          v-model.trim="inputs.userName.val"
          @blur="confirmValidError"
        />
        <div v-if="!inputs.userName.isValid" class="form-text-error">
          نام کاربری خود را وارد کنید
        </div>
      </div>
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
        <div v-if="inputs.email.isValid" class="form-text">
          ما ایمیل شمارا محفوظ نگه میداریم
        </div>
        <div v-else class="form-text-error">ایمیل معتبر وارد کنید</div>
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
        <div v-if="!inputs.password.isValid" class="form-text-error">
          رمزعبور معتبر وارد کنید (حداقل 8 کاراکتر)
        </div>
      </div>
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
