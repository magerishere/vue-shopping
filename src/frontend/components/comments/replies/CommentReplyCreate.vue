<template>
  <base-dialog
    :show="!!form.errors.messages"
    :messages="form.errors.messages"
    @close="form.errors.confirm"
  >
  </base-dialog>
  <base-spinner v-if="form.config.isLoading"></base-spinner>
  <h6 v-if="form.config.done && !form.config.isLoading" class="text-success">
    پس از تایید ادمین،نمایش داده خواهد شد
  </h6>

  <form
    @submit.prevent="sendReply"
    v-if="!form.config.isLoading && !form.config.done"
  >
    <BaseTextarea
      id="body"
      :text="inputs.body.text"
      v-model.trim="inputs.body.val"
      :isValid="inputs.body.isValid"
      :errorMsg="inputs.body.validate.message"
      :rows="3"
      :confirmErr="form.errors.confirmValid"
    />

    <base-button>ثبت</base-button>
  </form>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form/useForm";
export default {
  props: {
    commentId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const inputs = reactive({
      commentId: {
        val: props.commentId,
      },
      body: {
        val: "",
        text: "نظر",
        isValid: true,
        validate: {
          required: true,
        },
      },
    });
    const form = useForm();
    const sendReply = () =>
      form.submit("comment/addReply", inputs, {
        withLoading: false,
        done: true,
      });

    return {
      inputs,
      sendReply,
      form,
    };
  },
};
</script>
