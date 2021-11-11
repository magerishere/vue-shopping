<template>
  <base-dialog :show="!!options.errors">
    <p v-for="error in options.errors" :key="error">{{ error }}</p>
  </base-dialog>
  <base-spinner v-if="options.isLoading"></base-spinner>
  <form @submit.prevent="sendReply" v-if="!options.isLoading && !options.done">
    <div class="mb-3">
      <label for="body" class="form-label">پاسخ شما</label>
      <textarea
        id="body"
        cols="30"
        rows="3"
        class="form-control"
        :class="{ error: !replyData.body.isValid }"
        v-model.trim="replyData.body.val"
        @blur="confirmValidError"
      ></textarea>
      <p class="form-text-error" v-if="!replyData.body.isValid">
        نظر خود را بنویسید
      </p>
    </div>
    <base-button>ثبت</base-button>
  </form>
  <p v-if="options.done">با موفقیت انجام شد</p>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";
export default {
  props: {
    commentId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const replyData = reactive({
      commentId: {
        val: props.commentId,
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
    const sendReply = () => useForm(replyData, "comment/addReply", options);
    const { confirmErrors, confirmValidError } = useErrors(replyData, options);

    return {
      replyData,
      options,
      sendReply,
      confirmErrors,
      confirmValidError,
    };
  },
};
</script>
