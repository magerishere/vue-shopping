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
        :text="inputs.catNames.text"
        v-model="inputs.catNames.val"
        :isValid="inputs.catNames.isValid"
        :errorMsg="inputs.catNames.validate.message"
        :options="BASIC_DATA.productCatNames"
        :confirmErr="confirmValidError"
      />
      <BaseInputText
        id="title"
        :text="inputs.title.text"
        v-model.trim="inputs.title.val"
        :isValid="inputs.title.isValid"
        :errorMsg="inputs.title.validate.message"
        :confirmErr="confirmValidError"
      />
      <base-input-file
        id="image"
        :text="inputs.image.text"
        @change="setImage"
        :isValid="inputs.image.isValid"
        :errorMsg="inputs.image.validate.message"
        :confirmErr="confirmValidError"
      >
        عکس <small>(حداکثر 1 مگابایت)</small>
      </base-input-file>
      <div class="row">
        <base-input-number
          id="amount"
          :text="inputs.amount.text"
          class="col-md-3"
          v-model="inputs.amount.val"
          :isValid="inputs.amount.isValid"
          :errorMsg="inputs.amount.validate.message"
          :confirmErr="confirmValidError"
        >
          مبلغ هر واحد <small>(به تومان)</small>
        </base-input-number>
        <base-input-number
          id="qty"
          :text="inputs.qty.text"
          class="col-md-3"
          v-model="inputs.qty.val"
          :isValid="inputs.qty.isValid"
          :errorMsg="inputs.qty.validate.message"
          :confirmErr="confirmValidError"
        >
          تعداد محصول <small>(در انبار)</small>
        </base-input-number>
      </div>
      <div class="row">
        <base-input-number
          id="phone"
          :text="inputs.phone.text"
          class="col-md-5"
          v-model="inputs.phone.val"
          :isValid="inputs.phone.isValid"
          :errorMsg="inputs.phone.validate.message"
          :confirmErr="confirmValidError"
        >
          شماره تلفن شرکت یا کارخانه <small>(8 رقم)</small>
        </base-input-number>
        <BaseSelect
          id="city"
          :text="inputs.city.text"
          :options="BASIC_DATA.cities"
          v-model="inputs.city.val"
          :isValid="inputs.city.isValid"
          :errorMsg="inputs.city.validate.message"
          :confirmErr="confirmValidError"
          class="col-md-4"
        />
      </div>
      <BaseInputText
        id="address"
        :text="inputs.address.text"
        v-model="inputs.address.val"
        :isValid="inputs.address.isValid"
        :errorMsg="inputs.address.validate.message"
        :confirmErr="confirmValidError"
      />
      <BaseTextarea
        id="content"
        :text="inputs.content.text"
        v-model.trim="inputs.content.val"
        :isValid="inputs.content.isValid"
        :errorMsg="inputs.content.validate.message"
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
        val: null,
        text: "عکس",
        isValid: true,
        validate: {
          required: true,
        },
        isFile: false,
      },
      amount: {
        val: null,
        text: "مبلغ",
        isValid: true,
        validate: {
          required: true,
        },
      },
      qty: {
        val: null,
        text: "تعداد",
        isValid: true,
        validate: {
          required: true,
          max: 4,
        },
      },
      phone: {
        val: null,
        text: "شماره تلفن",
        isValid: true,
        validate: {
          required: true,
          max: 8,
        },
      },
      address: {
        val: "",
        text: "آدرس",
        isValid: true,
        validate: {
          required: true,
        },
      },
      city: {
        val: "",
        text: "شهر",
        isValid: true,
        validate: {
          required: true,
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

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const options = useOptions();
    const submitForm = () => useForm(inputs, "product/addProduct", options);
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
