import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from '@/stores/UserStore';
import LoginPage from "@/components/login-page.vue";
import HomePage from "@/components/home-page.vue";
import OldForestMap from "@/components/maps/old-forest-map.vue";
import MapsPage from "@/components/maps-page.vue";
import CampPage from "@/components/camp-page.vue";

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
        path: "/old-forest",
        name: "old-forest",
        component: OldForestMap,
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
