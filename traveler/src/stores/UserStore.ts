import { defineStore } from "pinia";
import UserModel from "@/models/UserModel";
import * as Request from '@/api/Requests'
import router from '@/router/index';
import { useHeroStore } from '@/stores/HeroStore'

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: new UserModel().build(),
            error: ""
        };
    },
    getters: {
        isLoggedIn: (() => localStorage.getItem("uStatus") === "true")
    },
    actions: {
        async getUser() {
            const apiUser = await Request.getUser();
            if (!apiUser.loggedIn) {
                console.log(apiUser.username + " in not logged in");
                return;
            }
            this.user
                .setName(apiUser.name)
                .setUsername(apiUser.username);
        },

        async login(username: string, password: string) {
            const userFromApi = await Request.login(username, password);
            if (userFromApi == null) {
                this.error = username + " is not found."
                return false;
            }
            this.user
                .setName(userFromApi.name)
                .setUsername(userFromApi.username)
                .setId(userFromApi.id)
                .setLoggedIn(true);

            localStorage.setItem("uStatus", this.user.getStatus().toString());

            const heroStore = useHeroStore();
            heroStore.getHero();

            this.error = "";
            router.push("/home")

            return true;
        },
        async logout() {
            localStorage.clear();
            router.push("/login");
            location.reload();
        },
        async clearErrorMsg() {
            this.error = "";
        }
    }
});