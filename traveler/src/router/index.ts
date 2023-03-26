import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "@/pages/LoginForm.vue";
import HomePage from "@/pages/HomePage.vue";
import EvilLandMap from "@/pages/EvilLandMap.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/evilLand",
      name: "evilLand",
      component: EvilLandMap,
      // meta: { requiresAuth: true }
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Check if User is Authenticated
    if (localStorage.getItem("uStatus") === "true") {
      //User is authenticated
      //TODO: commit to Store that User is authenticated
      next();
    } else {
      //User is not authenticated
      console.log("User is not authenticated");
      router.replace("/login");
    }
  } else {
    // Allow page to load
    next();
  }
});

export default router;
