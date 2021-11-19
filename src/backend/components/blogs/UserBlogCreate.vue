<template>
  <div>
    <base-dialog :show="options.isLoading" fixed title="در حال ثبت ...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!options.errors"
      title="خطایی رخ داد."
      :messages="options.errors"
      @close="confirmErrors"
    >
    </base-dialog>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <BaseSelect
        id="catNames"
        v-model="inputs.catNames.val"
        text="دسته بندی"
        :options="BASIC_DATA.blogCatNames"
        :isValid="inputs.catNames.isValid"
        errorMsg="دسته بندی مطلب را انتخاب کنید"
        :confirmErr="confirmValidError"
      />
      <BaseInputText
        id="title"
        v-model="inputs.title.val"
        text="عنوان"
        :isValid="inputs.title.isValid"
        errorMsg="عنوان مطلب را وارد کنید"
        :confirmErr="confirmValidError"
      />

      <base-input-file
        id="image"
        @change="setImage"
        :isValid="inputs.image.isValid"
        errorMsg="عکس مطلب را بارگذاری کنید"
        :confirmErr="confirmValidError"
        >عکس <small>(حداکثر 1 مگابایت)</small></base-input-file
      >

      <BaseTextarea
        id="content"
        text="محتوا"
        v-model="inputs.content.val"
        :isValid="inputs.content.isValid"
        errorMsg="محتوای مطلب را وارد کنید"
        :confirmErr="confirmValidError"
      />

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
  inject: {
    BASIC_DATA: {
      type: JSON,
      required: true,
    },
  },
  setup() {
    const inputs = reactive({
      catNames: {
        val: [],
        isValid: true,
        validate: {
          required: true,
        },
      },
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
