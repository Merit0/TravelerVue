<template>
  <title>Camp</title>
  <div class="page">
    <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <section class="campContent">
      <div class="camping"></div>
      <button class="homeBtn" @click="goFight()">Fight</button>
    </section>
  </div>
</template>

<script lang="ts">
import HeroDetailsBar from './HeroDetailsBar.vue';
import {useHeroStore} from '@/stores/HeroStore';
import router from "@/router";

export default {
  name: "camping-page",
  components: {HeroDetailsBar},
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    return {hero, heroStore, time: '',};
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
    goFight() {
      router.push('/home');
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
.campContent {
  margin-top: 10px;
  min-height: 90vh;
  border-radius: 20px;
  border: 2px solid rgb(95, 64, 43);
  background-image: url("/images/page-background/camping-page.jpg");
  background-size: 100%;
}

.camping {
  margin-top: 10px;
}

.homeBtn {
  position: relative;
  width: 60px;
  height: 60px;
  color: rgb(96, 57, 0);
  font-size: 15px;
  background-color: rgb(255, 204, 186);
  border: 2px solid rgba(56, 0, 0, 0.603);
  border-radius: 20px;
  margin-right: 5px;
}
</style>

