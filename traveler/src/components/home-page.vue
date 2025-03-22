<template>
  <title>Home</title>
  <section class="homeContent">
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <div class="gameModesContent">
      <div class="gameMode"></div>
      <div class="gameMode"></div>
      <div class="gameMode dungeonsMode"></div>
    </div>
  </section>
</template>

<script lang="ts">
import {useUserStore} from '@/stores/UserStore'
import HeroDetailsBar from './HeroDetailsBar.vue';
import {useHeroStore} from '@/stores/HeroStore'

export default {
  name: "HomePage",
  components: { HeroDetailsBar},
  data() {
    const userStore = useUserStore();
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    let showInventory = false;
    return {userStore, hero, heroStore, time: '', showInventory};
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
    async inventory() {
      this.showInventory = !this.showInventory;
    }
  },
  mounted() {
    this.increaseHealth();
  },
  unmounted() {
    clearInterval(this.time);
  }
}
</script>
<style>
@import '@/styles/home-page.css';
</style>
      
