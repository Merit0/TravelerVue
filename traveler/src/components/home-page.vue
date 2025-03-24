<template>
  <title>Home</title>
  <section class="homeContent">
    <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <div class="gameModesContent">
      <div class="gameMode campMode" @click="openCamping()">
        <div class="shiny-banner-box">
          <h1 class="shiny-banner-title">Дім</h1>
        </div>
      </div>
      <div class="gameMode arenaMode">
        <div class="shiny-banner-box">
          <h1 class="shiny-banner-title">Арена</h1>
        </div>
      </div>
      <div class="gameMode dungeonsMode" @click="openMaps()">
        <div class="shiny-banner-box">
          <h1 class="shiny-banner-title">Пригоди</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {useHeroStore} from '@/stores/HeroStore'
import router from "@/router";
import HeroDetailsBar from "@/components/HeroDetailsBar.vue";

export default {
  name: "home-page",
  components: {HeroDetailsBar},
  data() {
    const hero = useHeroStore().hero;
    return {hero};
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
      
