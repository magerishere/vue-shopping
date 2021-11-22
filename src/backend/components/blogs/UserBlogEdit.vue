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
    <img :src="inputs.image.oldVal" alt="Blog Image" loading="lazy" />
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
        v-model.trim="inputs.title.val"
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
        v-model.trim="inputs.content.val"
        :isValid="inputs.content.isValid"
        :errorMsg="inputs.content.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <div class="text-center">
        <base-button>به روزرسانی</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch, inject } from "vue";
import { useStore } from "vuex";
import useForm from "@/hooks/form/useForm";

export default {
  inject: {
    BASIC_DATA: {
      type: JSON,
      required: true,
    },
    setInitialData: {
      type: Function,
      required: true,
    },
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const inputs = reactive({
      id: {
        val: "",
      },
      catNames: {
        val: "",
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
        oldVal: "",
        val: "",
        text: "عکس",
        isValid: true,
        isFile: true,
        validate: {
          required: false,
        },
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

    const store = useStore();
    const form = useForm();
    const blogId = reactive({
      id: { val: props.id },
    });
    onMounted(async () => {
      await form.submit("blog/getUserBlog", blogId);
    });

    const blog = computed(() => {
      return store.getters["blog/userBlog"];
    });

    const setInitialData = inject("setInitialData");
    watch(blog, (b) => {
      setInitialData(b, inputs);
    });

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const submitForm = () => {
      form.submit("blog/editBlog", inputs);
    };

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
img {
  width: 40px;
  height: 40px;
}
</style>
