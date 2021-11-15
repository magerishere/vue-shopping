<template>
  <base-dialog :show="!!options.errors" :messages="options.errors">
  </base-dialog>
  <base-spinner v-if="options.isLoading"></base-spinner>
  <h6 v-if="options.done" class="text-success">
    پس از تایید ادمین،نمایش داده خواهد شد
  </h6>

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
