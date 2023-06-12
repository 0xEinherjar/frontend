<script setup lang="ts">
  import { ref } from 'vue';
  import { inject, onMounted } from 'vue';
  import { VehicleGateway } from '../infra/gateways/vehicle-gateway';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth-store';
  import { storeToRefs } from 'pinia';
  import Modal from '../components/modal.vue';

  const vehicleGateway = inject("vehicleGateway") as VehicleGateway;
  const router = useRouter();
  const store = useAuthStore();
  const { removeToken } = store;
  const { isAuthenticated } = storeToRefs(store);
  const vehicles: any = ref([]);
  const select = ref(false);
  const selected = ref("Prefixo");
  const searchValue = ref("");
  const field: any = {
    "Todos": "all",
    "Prefixo": "prefix",
    "Placa": "plate",
    "Veículo": "vehicle",
    "Modelo": "model",
    "Número de Patrimonio": "asset_number",
    "Combustível": "fuel",
    "Secretaria": "secretary",
    "Unidade": "unit" 
  }

  async function search() {
    if (field[selected.value] == "all") {
      vehicles.value = await vehicleGateway.getAll();
    } else {
      vehicles.value = await vehicleGateway.getBy(field[selected.value], searchValue.value);
    }
  }

  function getVehicle(prefix: any) {
    router.push({ name: "vehicle", params: { prefix } })
  }

  function logout() {
    removeToken()
  }

  onMounted(async () => {
    vehicles.value = await vehicleGateway.getAll();
  })
</script>

<template>
  <header class="l-header">
    <div class="l-header__wrapper">
      <router-link :to="{ name: 'home' }" class="c-logo">Patrimonio</router-link>
      <router-link v-if="isAuthenticated == false" :to="{ name: 'login' }" class="c-button"><span>Fazer login</span></router-link>
      <ul v-else class="nav-user">
        <li>
          <modal />
        </li>
        <li class="nav-user__dropdown">
          <div class="nav-user__avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z" fill="#292D32"/>
              <path d="M17.08 14.15C14.29 12.29 9.73996 12.29 6.92996 14.15C5.65996 15 4.95996 16.15 4.95996 17.38C4.95996 18.61 5.65996 19.75 6.91996 20.59C8.31996 21.53 10.16 22 12 22C13.84 22 15.68 21.53 17.08 20.59C18.34 19.74 19.04 18.6 19.04 17.36C19.03 16.13 18.34 14.99 17.08 14.15Z" fill="#292D32"/>
            </svg>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6004 7.45833L11.1671 12.8917C10.5254 13.5333 9.47539 13.5333 8.83372 12.8917L3.40039 7.45833" stroke="#292D32" stroke-opacity="0.6" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <ul class="nav-user__dropdown-group">
            <li>
              <button class="nav-user__dropdown-item" type="button" @click="logout">Sair da conta</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
  <main class="l-main">
    <form class="c-search" @submit.prevent="search">
      <div class="c-search__group">
        <button class="c-search__submit" type="submit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" fill="#292D32"/>
            <path d="M21.3005 22.0001C21.1205 22.0001 20.9405 21.9301 20.8105 21.8001L18.9505 19.9401C18.6805 19.6701 18.6805 19.2301 18.9505 18.9501C19.2205 18.6801 19.6605 18.6801 19.9405 18.9501L21.8005 20.8101C22.0705 21.0801 22.0705 21.5201 21.8005 21.8001C21.6605 21.9301 21.4805 22.0001 21.3005 22.0001Z" fill="#292D32"/>
          </svg>                    
        </button>
        <input class="c-search__input" type="text" name="" placeholder="Pesquisar" v-model="searchValue">
      </div>
      <div class="c-search__select">
        <div class="c-search__select-selected" @click="select = !select">
          <span>{{ selected }}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.02961 7.71744L6.81878 4.77161H3.54628C2.98628 4.77161 2.70628 5.44827 3.10294 5.84494L6.12461 8.86661C6.60878 9.35077 7.39628 9.35077 7.88044 8.86661L9.02961 7.71744Z" fill="white"/>
            <path d="M10.4535 4.77161H6.81934L9.03017 7.71744L10.9027 5.84494C11.2935 5.44827 11.0135 4.77161 10.4535 4.77161Z" fill="white"/>
          </svg>
        </div>
        <div class="c-search__select-group" id="dropdown-list" v-show="select">
          <template v-for="(_, key) in field">
            <div class="c-search__select-option" @click="selected = `${key}`">{{ key }}</div>
          </template>
        </div>
      </div>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th>Prefixo</th>
          <th>Veículo</th>
          <th>Modelo</th>
          <th>Placa</th>
          <th>Combustível</th>
          <th>Patrimonio</th>
          <th>Secretaria</th>
          <th>Unidade</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="vehicle in vehicles">
          <tr @click="getVehicle(vehicle.prefix)">
            <td>{{ vehicle.prefix }}</td>
            <td>{{ vehicle.vehicle }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.plate }}</td>
            <td>{{ vehicle.fuel }}</td>
            <td>{{ vehicle.asset_number }}</td>
            <td>{{ vehicle.secretary }}</td>
            <td>{{ vehicle.unit }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </main>
</template>
