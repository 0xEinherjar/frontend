<script setup lang="ts">
    import { inject, ref } from 'vue';
    import { VehicleGateway, CreateVehicleInput } from '../infra/gateways/vehicle-gateway';
    const vehicleGateway = inject("vehicleGateway") as VehicleGateway;
    const isOpen = ref(false);
    const formData = ref<CreateVehicleInput>({})

    async function create() {
        const result = await vehicleGateway.create(formData.value);
        console.log(result)
        isOpen.value = false;
    }

</script>
<template>
    <button @click="isOpen = true" class="c-button" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V8" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Adicionar</span>
    </button>
    <teleport to="body">
        <div v-if="isOpen" class="bg">
            <form class="form form-vehicle" @submit.prevent="create">
                <div class="form__header">
                    <h3 class="form__title">Adicionar um novo veículo</h3>
                    <button @click="isOpen = false" type="button" class="form__close">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16992 14.83L14.8299 9.17004" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.8299 14.83L9.16992 9.17004" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="form__group">
                    <div class="form__column">
                        <div class="form__field">
                            <label class="form__label" for="prefix">Prefixo</label>
                            <input v-model="formData.prefix" class="form__input" type="text" name="prefix" id="prefix" placeholder="Digite o prefixo">
                        </div>
                        <div class="form__field">
                            <label class="form__label" for="plate">Placa</label>
                            <input v-model="formData.plate" class="form__input" type="text" name="plate" id="plate" placeholder="Digite a placa">
                        </div>
                    </div>
                    <div class="form__column">
                        <div class="form__field">
                            <label class="form__label" for="asset_number">Patrimonio</label>
                            <input v-model="formData.asset_number" class="form__input" type="text" name="asset_number" id="asset_number" placeholder="Digite o patrimonio">
                        </div>
                        <div class="form__field">
                            <label class="form__label" for="color">Cor</label>
                            <input v-model="formData.color" class="form__input" type="text" name="color" id="color" placeholder="Digite a cor">
                        </div>
                    </div>
                    <div class="form__column">
                        <div class="form__field">
                            <label class="form__label" for="year_manufacture">Ano de fabricação</label>
                            <input v-model="formData.year_manufacture" class="form__input" type="text" name="year_manufacture" id="year_manufacture" placeholder="Digite o ano fabricação">
                        </div>
                        <div class="form__field">
                            <label class="form__label" for="year_model">Ano do modelo</label>
                            <input v-model="formData.year_model" class="form__input" type="text" name="year_model" id="year_model" placeholder="Digite o ano do modelo">
                        </div>
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="vehicle">Veículo</label>
                        <input v-model="formData.vehicle" class="form__input" type="text" name="vehicle" id="vehicle" placeholder="Digite o veículo">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="brand">Marca</label>
                        <input v-model="formData.brand" class="form__input" type="text" name="brand" id="brand" placeholder="Digite a marca">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="model">Modelo</label>
                        <input v-model="formData.model" class="form__input" type="text" name="model" id="model" placeholder="Digite o modelo">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="fuel">Combustível</label>
                        <input v-model="formData.fuel" class="form__input" type="text" name="fuel" id="fuel" placeholder="Digite o combustível">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="chassis_number">Número do chassi</label>
                        <input v-model="formData.chassis_number" class="form__input" type="text" name="chassis_number" id="chassis_number" placeholder="Digite o número do chassi">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="secretary">Secretaria</label>
                        <input v-model="formData.secretary" class="form__input" type="text" name="secretary" id="secretary" placeholder="Digite a secretaria">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="unit">Unidade</label>
                        <input v-model="formData.unit" class="form__input" type="text" name="unit" id="unit" placeholder="Digite a unidade">
                    </div>
                    <div class="form__field">
                        <label class="form__label" for="observation">Obeservação</label>
                        <input v-model="formData.observation" class="form__input" type="text" name="observation" id="observation" placeholder="Digite a obeservação">
                    </div>
                </div>
                <button class="form__submit" type="submit">Adicionar</button>
            </form>
        </div>
    </teleport>
</template>
<style>
    .bg {
        background-color: rgba(0, 0, 0, 0.91);
        position: fixed;
        inset: 0 0 0 0;
        display: grid;
        place-items: center;
        padding-block: 56px;
        overflow-y: auto;
    }
    .form-vehicle {
        padding: 56px;
        border-radius: 16px;
        background-color: #ffffff;
        width: min(600px, 100%) !important;
    }
</style>