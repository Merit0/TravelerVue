import {defineStore} from "pinia";
import UserModel from "@/models/UserModel";
import * as Request from '@/api/Requests'
import router from '@/router/index';
import {useHeroStore} from '@/stores/HeroStore'
import {useBagStore} from '@/stores/BagStore'
import {useMapStore} from '@/stores/MapStore'

export const useUserStore = defineStore("user", {

    state: () => {
        return {
            user: new UserModel().build(),
            error: "",
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

            const mapStore = useMapStore();
            await mapStore.resetMap(); // Reset map on login

            const bagStore = useBagStore();
            await bagStore.resetBag();
            this.error = "";
            router.push("/home")

            return true;
        },
        async logout(): Promise<void> {
            console.log('Logout initiated');
            const mapStore = useMapStore();
            const bagStore = useBagStore();
            await mapStore.resetMap().then(async () => {
                await bagStore.resetBag().then(() => {
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