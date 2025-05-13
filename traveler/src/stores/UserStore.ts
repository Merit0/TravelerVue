import {defineStore} from 'pinia';
import UserModel from '@/models/UserModel';
import * as Request from '@/api/Requests';
import router from '@/router/index';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {useBagStore} from '@/stores/BagStore';
import {useChestStore} from '@/stores/ChestStore';
import MapModel from "@/models/MapModel";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: new UserModel().build(),
        error: '',
    }),
    getters: {
        isLoggedIn: (): boolean => localStorage.getItem('uStatus') === 'true',
        isUserLoggedIn(): boolean {
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
            await heroStore.getHero();

            this.error = '';
            router.push('/camping');
            return true;
        },
        async logout(): Promise<void> {
            console.log('Logout initiated');

            const mapLocationStore = useMapLocationStore();
            const bagStore = useBagStore();
            const chestStore = useChestStore();
            const heroStore = useHeroStore();

            mapLocationStore.initMapsList();

            const oldForestMap: MapModel | undefined = mapLocationStore.mapsList.find(map => map.name === 'Old Forest') as MapModel;

            if (oldForestMap) {
                try {
                    await Promise.all([
                        mapLocationStore.resetAllMapLocations(oldForestMap),
                        bagStore.resetBag(),
                        chestStore.resetChest(),
                    ]);

                    chestStore.isShown = false;
                    localStorage.clear();
                    localStorage.setItem('uStatus', 'false');
                    this.user.setLoggedIn(false);
                    router.push('/login');
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            } else {
                console.error('Old Forest map not found');
            }
            heroStore.resetHero();
            localStorage.clear();
        },
        async clearErrorMsg() {
            this.error = '';
        },
    },
});