<script setup lang="ts">
    import { inject, onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { VehicleGateway } from '../infra/gateways/vehicle-gateway';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '../store/auth-store';
    import Modal from '../components/modal.vue';

    const route = useRoute();
    const store = useAuthStore();
    const { removeToken } = store;
    const { isAuthenticated } = storeToRefs(store);

    const vehicleGateway = inject("vehicleGateway") as VehicleGateway;
    const vehicles: any = ref();

    function logout() {
        removeToken()
    }
    
    onMounted(async () => {
        console.log(route.params.prefix)
        vehicles.value = await vehicleGateway.getBy("prefix", route.params.prefix as string);
    })

</script>
<template>
  <header class="l-header">
    <div class="l-header__wrapper">
        <router-link :to="{ name: 'home' }" class="l-header__back">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.2499 14.9401L6.35988 10.0501C5.78238 9.47256 5.78238 8.52756 6.35988 7.95006L11.2499 3.06006" stroke="#292D32" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Voltar
        </router-link>
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
    <div v-for="vehicle in vehicles" class="vehicle">
        <div class="vehicle__item">
            <h4 class="vehicle__field">Prefixo:</h4>
            <span class="vehicle__value">{{ vehicle.prefix }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Veículo:</h4>
            <span class="vehicle__value">{{ vehicle.vehicle }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Marca:</h4>
            <span class="vehicle__value">{{ vehicle.brand }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Cor:</h4>
            <span class="vehicle__value">{{ vehicle.color }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Modelo:</h4>
            <span class="vehicle__value">{{ vehicle.model }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Placa:</h4>
            <span class="vehicle__value">{{ vehicle.plate }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Combustível:</h4>
            <span class="vehicle__value">{{ vehicle.fuel }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Patrimonio:</h4>
            <span class="vehicle__value">{{ vehicle.asset_number }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Ano do modelo:</h4>
            <span class="vehicle__value">{{ vehicle.year_model }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Ano de fabricação:</h4>
            <span class="vehicle__value">{{ vehicle.year_manufacture }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Secretaria:</h4>
            <span class="vehicle__value">{{ vehicle.secretary }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Unidade:</h4>
            <span class="vehicle__value">{{ vehicle.unit }}</span>
        </div>
        <div class="vehicle__item">
            <h4 class="vehicle__field">Observação:</h4>
            <span class="vehicle__value">{{ vehicle.observation }}</span>
        </div>
    </div>
  </main>
</template>
<style>
    .vehicle {
        border-radius: 16px;
        padding: 8px 32px;
        border: 1px solid #EBEBEB;
        width: min(600px, 100%);
    }
    .vehicle__item {
        display: flex;
        align-items: center;
        gap: 8px;
        height: 48px;
    }
    .vehicle__item:not(:last-child) {
        border-bottom: 1px solid #EBEBEB;
    }
</style>
