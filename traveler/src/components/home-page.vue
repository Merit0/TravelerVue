<template>
  <title>Home</title>
  <section class="homeContent">
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <div class="gameModesContent">
      <div class="gameMode campMode"></div>
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
  components: { HeroDetailsBar},
  data() {
    const userStore = useUserStore();
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    return {userStore, hero, heroStore, time: ''};
  },
  methods: {
    async increaseHealth() {
      let count = 0;
      this.time = setInterval(() => {
        if (this.heroStore.hero.getHealth() < this.heroStore.hero.maxHealth && count < this.heroStore.hero.maxHealth) {
          this.heroStore.hero.healthIncreaser();
          count++;
        } else {
          clearInterval(this.time);
        }
      }, 3000);
    },
    async openMaps() {
      router.push('/maps');
    },
  },
}
</script>
<style>
@import '@/styles/home-page.css';
</style>
      
