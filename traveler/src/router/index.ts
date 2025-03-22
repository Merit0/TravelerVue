import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/components/login-page.vue";
import HomePage from "@/components/home-page.vue";
import OldForestMap from "@/components/old-forest-map.vue";
import MapsPage from "@/components/maps-page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/old-forest",
      name: "old-forest",
      component: OldForestMap,
    },
    {
      path: "/maps",
      name: "maps",
      component: MapsPage,
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
