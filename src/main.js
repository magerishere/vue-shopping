import { createApp, defineAsyncComponent } from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";
import BaseCard from "./components/ui/BaseCard.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import StringFormat from "./helpers/StringFormat";
import BasicData from "./basic-data.json";

const BaseDialog = defineAsyncComponent(() =>
  import("./components/ui/BaseDialog.vue")
);

const BaseSpinner = defineAsyncComponent(() =>
  import("./components/ui/BaseSpinner.vue")
);

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);

app.provide("StringFormat", StringFormat);
app.provide("BASIC_DATA", BasicData);

app.mount("#app");
