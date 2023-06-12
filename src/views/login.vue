<script setup lang="ts">
    import { inject, ref } from 'vue';
    import AuthGateway from '../infra/gateways/auth-gateway';
    import { useAuthStore } from '../store/auth-store';
    import { useRouter } from 'vue-router';
    const authGateway = inject("authGateway") as AuthGateway;
    
    const router = useRouter()
    const store = useAuthStore();
    const { setToken } = store;
    const username = ref("")
    const password = ref("")
    
    async function login() {
        if (!username.value || !password.value) return;
        const result = await authGateway.auth(username.value, password.value);
        if (result.status == 200) {
            setToken(result.token);
            router.push({ name: "home" })
        }
    }
    
</script>
<template>
    <main class="l-main">
        <form class="form" @submit.prevent="login">
            <div class="form__group">
                <div class="form__field">
                    <label class="form__label" for="username">Usuário</label>
                    <input class="form__input" type="text" name="username" id="username" v-model="username" placeholder="Digite seu usuário">
                </div>
                <div class="form__field">
                    <label class="form__label" for="password">Senha</label>
                    <input class="form__input" type="password" name="password" id="password" v-model="password" placeholder="Digite sua senha">
                </div>
            </div>
            <button class="form__submit" type="submit">Entrar</button>
        </form>
    </main>
</template>

<style>
    .form {
        display: grid;
        gap: 32px;
        width: min(380px, 100% - 48px);
        margin-inline: auto;
    }
    .form__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .form__title {
        font-size: 20px;
        font-weight: 500;
        color: #17191C;
    }
    .form__close {
        padding: 5px 0 5px 10px;
        cursor: pointer;
    }
    .form__field {
        display: grid;
        gap: 8px;
    }
    .form__column {
        display: flex;
        align-items: center;
        gap: 24px;
    }
    .form__group {
        display: grid;
        gap: 24px;
    }
    .form__label {
        font-size: 14px;
        font-weight: 500;
    }
    .form__input {
        height: 56px;
        width: 100%;
        border-radius: 8px;
        border: 2px solid #000000;
        color: #17191C;
        padding-inline: 16px;
    }
    .form__input::placeholder {
        font-size: 16px;
        color: rgba(41, 45, 50, 0.6);
    }
    .form__submit {
        height: 48px;
        width: 100%;
        border-radius: 8px;
        background-color: #17191C;
        color: #ffffff;
    }
</style>