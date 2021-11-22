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
        <base-input-number
          id="amount"
          :text="inputs.amount.text"
          class="col-md-3"
          v-model="inputs.amount.val"
          :isValid="inputs.amount.isValid"
          :errorMsg="inputs.amount.validate.message"
          :confirmErr="form.errors.confirmValid"
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
          :confirmErr="form.errors.confirmValid"
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
          :confirmErr="form.errors.confirmValid"
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
        val: null,
        text: "عکس",
        isValid: true,
        validate: {},
        isFile: true,
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

    const store = useStore();
    const form = useForm();
    const productId = reactive({
      id: { val: props.id },
    });
    onMounted(async () => {
      await form.submit("product/getUserProduct", productId);
    });

    const product = computed(() => {
      return store.getters["product/userProduct"];
    });
    const setInitialData = inject("setInitialData");
    watch(product, (p) => {
      setInitialData(p, inputs);
    });

    function setImage(event) {
      inputs.image.val = event.target.files[0];
      inputs.image.isFile = true;
    }

    const submitForm = () => {
      form.submit("product/editProduct", inputs);
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
