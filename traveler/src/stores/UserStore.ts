import {defineStore} from 'pinia';
import UserModel from '@/models/UserModel';
import * as Request from '@/api/Requests';
import router from '@/router/index';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {useBagStore} from '@/stores/BagStore';
import {useChestStore} from '@/stores/ChestStore';
import MapModel from "@/a-game-scenes/silesia-world-scene/models/map-model";

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
            const heroStore = useHeroStore();

            mapLocationStore.initMapsList();

            const silesiaMap: MapModel | undefined = mapLocationStore.mapsList.find(map => map.name === 'Silesia') as MapModel;

            if (silesiaMap) {
                try {
                    await Promise.all([
                        mapLocationStore.resetAllMapLocations(silesiaMap),
                        bagStore.resetBag(),
                    ]);

                    localStorage.clear();
                    localStorage.setItem('uStatus', 'false');
                    this.user.setLoggedIn(false);
                    router.push('/login');
                } catch (error) {
                    console.error("Error during logout:", error);
                }
            } else {
                console.error('Silesia map not found');
            }
            heroStore.resetHero();
            localStorage.clear();
        },
        async clearErrorMsg() {
            this.error = '';
        },
    },
});