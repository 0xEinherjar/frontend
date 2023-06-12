import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { VehicleGateway } from './infra/gateways/vehicle-gateway';
import AxiosHttpClient from './infra/http/axios-adapter';
import router from "./routes"
import AuthGateway from './infra/gateways/auth-gateway';

const pinia = createPinia();
const app = createApp(App);
const httpClient = new AxiosHttpClient();
const authGateway = new AuthGateway(httpClient, import.meta.env.VITE_BASEURL);
const vehicleGateway = new VehicleGateway(httpClient, import.meta.env.VITE_BASEURL);
app.provide("authGateway", authGateway);
app.provide("vehicleGateway", vehicleGateway);
app.use(pinia);
app.use(router);
app.mount('#app');
