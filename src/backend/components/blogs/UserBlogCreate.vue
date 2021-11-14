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
      <div class="mb-3">
        <label for="catName" class="form-label">دسته بندی</label>
        <select
          id="catName"
          class="form-select"
          :class="{ error: !inputs.catName.isValid }"
          ref="catNameSelect"
          @change="setCatName"
          value=""
          @blur="confirmValidError"
        >
          <option
            v-for="catName in BASIC_DATA.blogCatNames"
            :key="catName[0]"
            :value="catName"
          >
            {{ catName[1] }}
          </option>
        </select>
        <div v-if="!inputs.catName.isValid" class="form-text-error">
          دسته بندی مطلب را انتخاب کنید
        </div>
      </div>
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
  inject: {
    BASIC_DATA: {
      type: JSON,
      required: true,
    },
  },
  setup() {
    const inputs = reactive({
      catNameKey: {
        val: "",
      },
      catName: {
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
        val: null,
        isValid: true,
        validate: {
          required: true,
        },
        isFile: false,
      },
    });

    function setCatName(event) {
      const catKeyAndName = event.target.value.split(",");
      inputs.catNameKey.val = catKeyAndName[0];
      inputs.catName.val = catKeyAndName[1];
    }

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
      setCatName,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
