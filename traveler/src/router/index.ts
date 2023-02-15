import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue'
import HomePage from '@/components/HomePage.vue'
import User from '@/stores/User'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
            meta: { requiresAuth: true }
        },
        {
            path: "/login",
            name: "login",
            component: LoginForm
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //Check if User is Authenticated
        if (User.getters.isLoggedIn) {
            //User is authenticated
            console.log("User status: " + User.getters.isLoggedIn)
            //TODO: commit to Store that User is authenticated
            next();
        } else {
            //User is not authenticated
            console.log("User is not authenticated")
            router.replace('/login');
        }

    } else {    // Allow page to load
        next();
    }
})

export default router;