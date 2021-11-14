<template>
  <base-spinner v-if="options.isLoading"></base-spinner>
  <base-dialog
    :show="!!options.errors"
    @close="confirmErrors"
    :messages="options.errors"
  >
  </base-dialog>
  <h6 v-if="options.done">با موفقیت انجام شد</h6>
  <form
    @submit.prevent="submitForm"
    v-if="!options.isLoading && !!!options.errors && !options.done"
  >
    <div class="mb-3">
      <textarea
        id="body"
        cols="30"
        rows="6"
        class="form-control"
        :class="{ error: !inputs.body.isValid }"
        v-model.trim="inputs.body.val"
        @blur="confirmValidError"
      ></textarea>
      <p v-if="!inputs.body.isValid" class="form-text-error">
        نظر خودرا وارد کنید
      </p>
    </div>
    <base-button>ثبت</base-button>
  </form>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";

export default {
  props: {
    blogId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const inputs = reactive({
      blogId: {
        val: props.blogId,
      },
      body: {
        val: "",
        isValid: true,
        validate: {
          required: true,
        },
      },
    });
    const options = useOptions();
    const submitForm = () => useForm(inputs, "comment/addComment", options);
    const { confirmErrors, confirmValidError } = useErrors(inputs, options);

    return {
      inputs,
      options,
      submitForm,
      confirmErrors,
      confirmValidError,
    };
  },
};
</script>
