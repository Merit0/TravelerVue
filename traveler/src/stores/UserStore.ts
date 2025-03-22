import {defineStore} from "pinia";
import UserModel from "@/models/UserModel";
import * as Request from '@/api/Requests'
import router from '@/router/index';
import {useHeroStore} from '@/stores/HeroStore'
import {useBagStore} from '@/stores/BagStore'
import {useMapStore} from '@/stores/MapStore'

export const useUserStore = defineStore("user", {

    state: () => {
        const mapStore = useMapStore();
        const bagStore = useBagStore();
        return {
            user: new UserModel().build(),
            error: "",
            mapStore,
            bagStore
        };
    },
    getters: {
        isLoggedIn: (() => localStorage.getItem("uStatus") === "true")
    },
    actions: {
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
        async logout(): Promise<void> {
            console.log('Logout initiated');
            await this.mapStore.resetMap().then(async () => {
                await this.bagStore.resetBag().then(() => {
                    localStorage.removeItem("map");
                    localStorage.clear();
                    router.push("/login");
                });
            });
        },
        async clearErrorMsg() {
            this.error = "";
        }
    }
});