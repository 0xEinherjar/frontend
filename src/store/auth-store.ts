import cookie from "js-cookie";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(cookie.get("patrimonio_token"));
    const isAuthenticated =  computed(() => Boolean(token.value));

    function setToken(_token: string) {
        token.value = _token;
        cookie.set("patrimonio_token", _token);
    }
    
    function removeToken() {
        token.value = "";
        cookie.remove("patrimonio_token");
    }

    return { token, setToken, removeToken, isAuthenticated };
});