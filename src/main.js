import { createApp, defineAsyncComponent } from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseInput from "./components/ui/BaseInput.vue";
import StringFormat from "./helpers/StringFormat";
import BasicData from "./basic-data.json";

const BaseDialog = defineAsyncComponent(() =>
  import("./components/ui/BaseDialog.vue")
);

const BaseSpinner = defineAsyncComponent(() =>
  import("./components/ui/BaseSpinner.vue")
);

const BasePagination = defineAsyncComponent(() =>
  import("./components/ui/BasePagination")
);

const BaseToast = defineAsyncComponent(() =>
  import("./components/ui/BaseToast.vue")
);

const BaseInputText = defineAsyncComponent(() =>
  import("./components/ui/inputs/BaseInputText.vue")
);

const BaseInputPassword = defineAsyncComponent(() =>
  import("./components/ui/inputs/BaseInputPassword.vue")
);

const BaseInputCheckbox = defineAsyncComponent(() =>
  import("./components/ui/inputs/BaseInputCheckbox.vue")
);

const BaseInputRadio = defineAsyncComponent(() =>
  import("./components/ui/inputs/BaseInputRadio.vue")
);

const BaseSelect = defineAsyncComponent(() =>
  import("./components/ui/BaseSelect.vue")
);

const BaseInputFile = defineAsyncComponent(() =>
  import("./components/ui/inputs/BaseInputFile.vue")
);

const BaseTextarea = defineAsyncComponent(() =>
  import("./components/ui/BaseTextarea.vue")
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("BaseInput", BaseInput);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);
app.component("base-pagination", BasePagination);
app.component("base-toast", BaseToast);
app.component("BaseSelect", BaseSelect);
app.component("BaseTextarea", BaseTextarea);
// inputs
app.component("BaseInputText", BaseInputText);
app.component("BaseInputPassword", BaseInputPassword);
app.component("BaseInputCheckbox", BaseInputCheckbox);
app.component("BaseInputRadio", BaseInputRadio);
app.component("BaseInputFile", BaseInputFile);

app.provide("StringFormat", StringFormat);
app.provide("BASIC_DATA", BasicData);

app.mount("#app");
