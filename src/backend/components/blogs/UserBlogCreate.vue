<template>
  <div>
    <base-dialog :show="form.config.isLoading" fixed title="در حال ثبت ...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!form.errors.messages"
      title="خطایی رخ داد."
      :messages="form.errors.messages"
      @close="form.errors.confirm"
    >
    </base-dialog>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <BaseSelect
        id="catNames"
        v-model="inputs.catNames.val"
        :text="inputs.catNames.text"
        :options="BASIC_DATA.blogCatNames"
        :isValid="inputs.catNames.isValid"
        :errorMsg="inputs.catNames.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <BaseInputText
        id="title"
        v-model="inputs.title.val"
        :text="inputs.title.text"
        :isValid="inputs.title.isValid"
        :errorMsg="inputs.title.validate.message"
        :confirmErr="form.errors.confirmValid"
      />

      <base-input-file
        id="image"
        @change="setImage"
        :text="inputs.image.text"
        :isValid="inputs.image.isValid"
        :errorMsg="inputs.image.validate.message"
        :confirmErr="form.errors.confirmValid"
        >عکس <small>(حداکثر 1 مگابایت)</small></base-input-file
      >

      <BaseTextarea
        id="content"
        :text="inputs.content.text"
        v-model="inputs.content.val"
        :isValid="inputs.content.isValid"
        :errorMsg="inputs.content.validate.message"
        :confirmErr="form.errors.confirmValid"
      />

      <div class="text-center">
        <base-button>ثبت</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useForm from "@/hooks/form/useForm";
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
        text: "دسته بندی",
        isValid: true,
        validate: {
          required: true,
        },
      },
      title: {
        val: "",
        text: "عنوان",
        isValid: true,
        validate: {
          required: true,
        },
      },
      image: {
        val: null,
        text: "عکس",

        isValid: true,
        validate: {
          required: true,
        },
        isFile: false,
      },
      content: {
        val: "",
        text: "محتوا",
        isValid: true,
        validate: {
          required: true,
        },
      },
    });

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const form = useForm();

    const submitForm = () => form.submit("blog/addBlog", inputs);

    return {
      inputs,
      submitForm,
      setImage,
      form,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
