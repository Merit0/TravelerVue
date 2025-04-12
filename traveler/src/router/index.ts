import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from '@/stores/UserStore';
import LoginPage from "@/components/login-page.vue";
import HomePage from "@/components/home-page.vue";
import ForestEntranceMapLocation from "@/components/maps/old-forest/forest-entrance-map-location.vue";
import MapsPage from "@/components/maps-page.vue";
import CampPage from "@/components/camp-page.vue";
import MountainHillMapLocation from "@/components/maps/old-forest/mountain-hill-map-location.vue";
import ForestCaveMapLocation from "@/components/maps/old-forest/forest-cave-map-location.vue";
import ForestPeakMapLocation from "@/components/maps/old-forest/forest-peak-map-location.vue";

const routes = [
    {path: '/', component: LoginPage},
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: "/home",
        name: "home-page",
        component: HomePage,
        meta: {requiresAuth: true},
    },
    {
        path: '/camping',
        component: CampPage,
        meta: {requiresAuth: true}
    },
    {
        path: "/maps",
        name: "maps-page",
        component: MapsPage,
        meta: {requiresAuth: true}
    },
    {
        path: "/forest-entrance",
        name: "forest-entrance",
        component: ForestEntranceMapLocation,
        meta: {requiresAuth: true}
    },
    {
        path: "/mountain-hill",
        name: "mountain-hill",
        component: MountainHillMapLocation,
        meta: {requiresAuth: true}
    },
    {
        path: "/forest-cave",
        name: "forest-cave",
        component: ForestCaveMapLocation,
        meta: {requiresAuth: true}
    },
    {
        path: "/forest-peak",
        name: "forest-peak",
        component: ForestPeakMapLocation,
        meta: {requiresAuth: true}
    },
    {
        path: "/forest-shadows",
        name: "forest-shadows",
        component: ForestPeakMapLocation,
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
