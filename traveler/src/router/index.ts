import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from '@/stores/UserStore';
import LoginPage from "@/a-game-scenes/login-scene/components/login-page.vue";
import ForestLocation from "@/a-game-scenes/location-scene/components/forest-location.vue";
import HomeLocation from "@/a-game-scenes/home-scene/components/home-location.vue";
import HexWorldMap from "@/a-game-scenes/silesia-world-scene/hex-world-map.vue";

const routes = [
    {path: '/', component: LoginPage},
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: "/home",
        name: "home-page",
        component: HomeLocation,
        meta: {requiresAuth: true},
    },
    {
        path: '/camping',
        name: "camping-page",
        component: HomeLocation,
        meta: {requiresAuth: true}
    },
    {
        path: "/silesia",
        name: "silesia-world",
        component: HexWorldMap,
        meta: {requiresAuth: true}
    },
    {
        path: "/location/forest",
        name: "Forest",
        component: ForestLocation,
        meta: {requiresAuth: true}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    console.log('Navigating to:', to.path, 'Logged in:', userStore.isUserLoggedIn);
    if (to.meta.requiresAuth && !userStore.isUserLoggedIn) {
        console.log('back to login');
        next('/login');
    } else {
        next();
    }
});

export default router;
