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
// inputs
app.component("BaseInputText", BaseInputText);
app.component("BaseInputPassword", BaseInputPassword);

app.provide("StringFormat", StringFormat);
app.provide("BASIC_DATA", BasicData);

app.mount("#app");
