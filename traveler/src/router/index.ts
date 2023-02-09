import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue'
import HomePage from '@/components/HomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/home",
            name: "home",
            component: HomePage
        },
        {
            path: "/login",
            name: "login",
            component: LoginForm
        },
    ]
});

export default router;