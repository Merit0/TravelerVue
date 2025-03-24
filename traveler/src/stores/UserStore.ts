import { defineStore } from 'pinia';
import UserModel from '@/models/UserModel';
import * as Request from '@/api/Requests';
import router from '@/router/index';
import { useHeroStore } from '@/stores/HeroStore';
import { useMapStore } from '@/stores/MapStore';
import { useBagStore } from '@/stores/BagStore';
import { useChestStore } from '@/stores/ChestStore';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: new UserModel().build(),
        error: '',
    }),
    getters: {
        isLoggedIn: () => localStorage.getItem('uStatus') === 'true',
        loggedIn(): boolean {
            return this.user.getStatus();
        }
    },
    actions: {
        async login(username: string, password: string) {
            const userFromApi = await Request.login(username, password);
            if (userFromApi == null) {
                this.error = `${username} is not found.`;
                return false;
            }
            this.user
                .setName(userFromApi.name)
                .setUsername(userFromApi.username)
                .setId(userFromApi.id)
                .setLoggedIn(true);

            localStorage.clear();
            localStorage.setItem('uStatus', 'true');

            const heroStore = useHeroStore();
            heroStore.getHero();

            this.error = '';
            router.push('/home');
            return true;
        },
        async logout(): Promise<void> {
            console.log('Logout initiated');
            const mapStore = useMapStore();
            const bagStore = useBagStore();
            const chestStore = useChestStore();

            await Promise.all([
                mapStore.resetMap(),
                bagStore.resetBag(),
                chestStore.resetChest(),
            ]).then(() => {
                chestStore.isShown = false;
                localStorage.clear();
                localStorage.setItem('uStatus', 'false');
                this.user.setLoggedIn(false);
                router.push('/login');
            });
        },
        async clearErrorMsg() {
            this.error = '';
        },
    },
});