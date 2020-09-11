/** @format */

import { createApp } from "vue";
import App from "./App.vue";
import initActWebSocket from "./libs/actwebsocket";
import "./index.css";

window.oncontextmenu = function (e) {
  //取消默认的浏览器自带右键
  e.preventDefault();
};

initActWebSocket();

createApp(App).mount("#app");
