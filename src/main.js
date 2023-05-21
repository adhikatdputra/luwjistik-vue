import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify";
import "@/assets/css/styles.scss";

import axios from "axios";
import { tokenHelper } from "@/helpers/authHelper.js";
import { alertHelper } from "@/helpers/alertHelper.js";

Vue.config.productionTip = false;

var baseURL = "https://fe-screening.onrender.com";
axios.defaults.baseURL = baseURL;
axios.defaults.headers["Content-Type"] = "application/json";
new Vue({
  vuetify,
  router,
  data: {
    admin: null,
    baseURL: baseURL,
    menuActive: "",
    notifsuccess: false,
    notifdanger: false,
    textNotif: "",
    tokenExpired: "",
  },
  methods: {
    alert(msg, alert) {
      alertHelper(this, msg, alert);
    },
    token(key) {
      return tokenHelper(key);
    },

    axios: axios,
    upload: function (method, url, form) {
      return this.axios({
        method: method,
        url: url,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  },
  created() {
    axios.defaults.headers["Authorization"] = `Bearer ${this.token()}`;
  },
  render: (h) => h(App),
}).$mount("#app");
