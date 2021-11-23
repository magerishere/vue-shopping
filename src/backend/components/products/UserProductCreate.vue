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
        :text="inputs.catNames.text"
        v-model="inputs.catNames.val"
        :isValid="inputs.catNames.isValid"
        :errorMsg="inputs.catNames.validate.message"
        :confirmErr="form.errors.confirmValid"
        :options="BASIC_DATA.productCatNames"
      />
      <BaseInputText
        id="title"
        :text="inputs.title.text"
        v-model.trim="inputs.title.val"
        :isValid="inputs.title.isValid"
        :errorMsg="inputs.title.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <base-input-file
        id="image"
        :text="inputs.image.text"
        @change="setImage"
        :isValid="inputs.image.isValid"
        :errorMsg="inputs.image.validate.message"
        :confirmErr="form.errors.confirmValid"
      >
        عکس <small>(حداکثر 1 مگابایت)</small>
      </base-input-file>
      <div class="row">
        <base-input-text
          id="amount"
          :text="inputs.amount.text"
          class="col-md-3"
          v-model.number="inputs.amount.val"
          :isValid="inputs.amount.isValid"
          :errorMsg="inputs.amount.validate.message"
          :confirmErr="form.errors.confirmValid"
        >
          مبلغ هر واحد <small>(به تومان)</small>
        </base-input-text>
        <base-input-number
          id="qty"
          :text="inputs.qty.text"
          class="col-md-3"
          v-model.number="inputs.qty.val"
          :isValid="inputs.qty.isValid"
          :errorMsg="inputs.qty.validate.message"
          :confirmErr="form.errors.confirmValid"
        >
          تعداد محصول <small>(در انبار)</small>
        </base-input-number>
      </div>
      <div class="row">
        <base-input-text
          id="phone"
          :text="inputs.phone.text"
          class="col-md-5"
          v-model.number="inputs.phone.val"
          :isValid="inputs.phone.isValid"
          :errorMsg="inputs.phone.validate.message"
          :confirmErr="form.errors.confirmValid"
          mode="ltr"
        >
          شماره تلفن شرکت یا کارخانه <small>(8 رقم)</small>
        </base-input-text>
        <BaseSelect
          id="city"
          :text="inputs.city.text"
          :options="BASIC_DATA.cities"
          v-model="inputs.city.val"
          :isValid="inputs.city.isValid"
          :errorMsg="inputs.city.validate.message"
          :confirmErr="form.errors.confirmValid"
          class="col-md-4"
        />
      </div>
      <BaseInputText
        id="address"
        :text="inputs.address.text"
        v-model="inputs.address.val"
        :isValid="inputs.address.isValid"
        :errorMsg="inputs.address.validate.message"
        :confirmErr="form.errors.confirmValid"
      />
      <BaseTextarea
        id="content"
        :text="inputs.content.text"
        v-model.trim="inputs.content.val"
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
          number: true,
        },
      },
      qty: {
        val: null,
        text: "تعداد",
        isValid: true,
        validate: {
          required: true,
          number: true,
          max: 4,
        },
      },
      phone: {
        val: null,
        text: "شماره تلفن",
        isValid: true,
        validate: {
          required: true,
          number: true,
          equal: 8,
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
    const form = useForm();
    const submitForm = () => {
      form.submit("product/addProduct", inputs);
    };

    return {
      inputs,
      form,
      setImage,
      submitForm,
    };
  },
};
</script>

<style scoped>
.actions {
  text-align: center;
}
</style>
