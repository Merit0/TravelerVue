<template>
  <title>Home</title>
  <section class="homeContent">
    <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <div class="gameModesContent">
      <div class="gameMode campMode" @click="openCamping()"></div>
      <div class="gameMode arenaMode"></div>
      <div class="gameMode dungeonsMode" @click="openMaps()"></div>
    </div>
  </section>
</template>

<script lang="ts">
import {useUserStore} from '@/stores/UserStore'
import HeroDetailsBar from './HeroDetailsBar.vue';
import {useHeroStore} from '@/stores/HeroStore'
import router from "@/router";

export default {
  name: "HomePage",
  components: {HeroDetailsBar},
  data() {
    const userStore = useUserStore();
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    return {userStore, hero, heroStore};
  },
  methods: {
    async openMaps(): Promise<void> {
      router.push('/maps');
    },
    async openCamping(): Promise<void> {
      router.push('/camping');
    },
  },
}
</script>
<style>
@import '@/styles/home-page.css';
</style>
      
