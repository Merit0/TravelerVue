import {createRouter, createWebHistory} from "vue-router";
import {useUserStore} from '@/stores/UserStore';
import LoginPage from "@/components/login-page.vue";
import HomePage from "@/components/home-page.vue";
import OldForestMap from "@/components/old-forest-map.vue";
import MapsPage from "@/components/maps-page.vue";
import CampPage from "@/components/camp-page.vue";

const routes = [
    {path: '/', component: LoginPage},
    {
        path: '/login',
        name: "login",
        component: LoginPage
    },
    {
        path: "/home",
        name: "home",
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
        name: "maps",
        component: MapsPage,
    },
    {
        path: "/camping",
        name: "camping",
        component: CampPage,
    },

    {
        path: "/old-forest",
        name: "old-forest",
        component: OldForestMap,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
