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
    <img :src="inputs.image.oldVal" alt="Blog Image" loading="lazy" />
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
        v-model.trim="inputs.title.val"
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
        v-model.trim="inputs.content.val"
        :isValid="inputs.content.isValid"
        errorMsg="محتوای مطلب را وارد کنید"
        :confirmErr="confirmValidError"
      />
      <div class="text-center">
        <base-button>به روزرسانی</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
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
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const inputs = reactive({
      id: {
        val: props.id,
      },
      catNames: {
        val: "",
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
        oldVal: "",
        val: "",
        isValid: true,
        isFile: false,
      },
    });

    const options = useOptions();
    const blogId = reactive({
      id: { val: props.id },
    });
    onMounted(async () => {
      await useForm(blogId, "blog/getUserBlog", options);
    });

    const blog = computed(() => {
      return store.getters["blog/userBlog"];
    });

    watch(blog, (b) => {
      inputs.catNames.val = b.catNames;
      inputs.title.val = b.title;
      inputs.content.val = b.content;
      inputs.image.oldVal = b.image;
    });

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const submitForm = () => {
      useForm(inputs, "blog/editBlog", options);
    };
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
img {
  width: 40px;
  height: 40px;
}
</style>
