<template>
  <div>
    <base-dialog :show="options.isLoading" fixed title="در حال ثبت ...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!options.errors"
      title="خطایی رخ داد."
      @close="confirmErrors"
    >
      <p v-for="error in options.errors" :key="error">{{ error }}</p>
    </base-dialog>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="title" class="form-label">عنوان</label>
        <input
          type="text"
          class="form-control"
          :class="{ error: !inputs.title.isValid }"
          id="title"
          v-model.trim="inputs.title.val"
          @blur="confirmValidError"
        />
        <div v-if="!inputs.title.isValid" class="form-text-error">
          عنوان مطلب را وارد کنید
        </div>
      </div>
      <div class="mb-3">
        <label for="image" class="form-label"
          >عکس <small>(حداکثر 1 مگابایت)</small></label
        >
        <input
          class="form-control form-control-sm"
          :class="{ error: !inputs.image.isValid }"
          id="image"
          type="file"
          @change="setImage"
          @blur="confirmValidError"
        />
        <div v-if="!inputs.image.isValid" class="form-text-error">
          عکس مطلب را بارگذاری کنید
        </div>
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">محتوا</label>
        <textarea
          id="content"
          cols="30"
          rows="10"
          class="form-control"
          :class="{ error: !inputs.content.isValid }"
          v-model.trim="inputs.content.val"
          @blur="confirmValidError"
        ></textarea>
        <div v-if="!inputs.content.isValid" class="form-text-error">
          محتوای مطلب را وارد کنید
        </div>
      </div>
      <div class="text-center">
        <base-button>ثبت</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form";
import useOptions from "@/hooks/options";
import useErrors from "@/hooks/errors";

export default {
  setup() {
    const inputs = reactive({
      title: {
        val: "",
        isValid: true,
        validate: {
          required: true,
        },
      },
      content: {
        val: "",
        isValid: true,
        validate: {
          required: true,
        },
      },
      image: {
        val: null,
        isValid: true,
        validate: {
          required: true,
        },
        isFile: false,
      },
    });

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const options = useOptions();
    const submitForm = () => useForm(inputs, "blog/addBlog", options);
    const { confirmErrors, confirmValidError } = useErrors(inputs, options);

    return {
      inputs,
      submitForm,
      confirmValidError,
      confirmErrors,
      setImage,
      options,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
