import cookie from "js-cookie";

export default {
    login(_: any, __: any, next: any) {
        const isAuthenticated = cookie.get("patrimonio_token");
        if (isAuthenticated) next({ name: "home"})
        next()
    }
}