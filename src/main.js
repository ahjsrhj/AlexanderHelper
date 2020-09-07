/** @format */

import { createApp } from "vue";
import App from "./App.vue";
import initActWebSocket from "./libs/actwebsocket";
import "./index.css";


initActWebSocket();

createApp(App).mount("#app");
