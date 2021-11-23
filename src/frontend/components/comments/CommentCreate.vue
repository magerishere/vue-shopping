<template>
  <base-spinner v-if="form.config.isLoading"></base-spinner>
  <base-dialog
    :show="!!form.errors.messages"
    @close="form.errors.confirm"
    :messages="form.errors.messages"
  >
  </base-dialog>
  <h6 v-if="form.config.done && !form.config.isLoading" class="text-success">
    پس از تایید ادمین،نمایش داده خواهد شد
  </h6>
  <form
    @submit.prevent="submitForm"
    v-if="
      !form.config.isLoading && !!!form.errors.messages && !form.config.done
    "
  >
    <BaseTextarea
      id="body"
      :text="inputs.body.text"
      v-model.trim="inputs.body.val"
      :isValid="inputs.body.isValid"
      :errorMsg="inputs.body.validate.message"
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
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const inputs = reactive({
      commentableType: {
        val: props.type,
      },
      commentableId: {
        val: props.id,
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
    const submitForm = () =>
      form.submit("comment/addComment", inputs, {
        withLoading: false,
        done: true,
      });

    return {
      inputs,
      submitForm,
      form,
    };
  },
};
</script>
