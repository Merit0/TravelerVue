<template>
  <title>Camp</title>
  <HeroDetailsBar :hero="hero"/>
  <section class="campContent">
    <div class="scalableGridWrapper">
      <div class="buildingGrid">
        <div
            v-for="n in numberOfTiles"
            :key="n"
            class="buildingTile initBuildingTile tileBackground"
        >
        </div>
        <div class="buildingTile initBuildingTile tileBackground" @click="goFight()">
          <div class="crossedSwordsImage">
          </div>
        </div>
      </div>
      <div class="shopPlace" @click="openShop()">
        <div class="shopBackground">
        </div>
      </div>
    </div>
  </section>
  <shop-overlay :show-shop-overlay="showShop" @closeShop="closeShop"></shop-overlay>
</template>

<script lang="ts">
import HeroDetailsBar from './HeroDetailsBar.vue';
import {useHeroStore} from '@/stores/HeroStore';
import router from "@/router";
import ShopOverlay from "@/components/shop-overlay.vue";

export default {
  name: "camping-page",
  components: {ShopOverlay, HeroDetailsBar},
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const numberOfTiles = 77
    let showShop = false;
    return {hero, heroStore, time: '', numberOfTiles, showShop};
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
    },
    openShop() {
      this.showShop = true;
    },
    closeShop() {
      this.showShop = false;
    },
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
  display: flex;
  flex-direction: column;
  height: 95vh;
  width: 100%;
  background: #401b01;
  justify-content: center;
  align-items: center;
}

.buildingGrid {
  display: grid;
  grid-template-columns: repeat(13, 15vh);
  grid-template-rows: repeat(5, 15vh);
  overflow: hidden;
  gap: 2px;
}

.buildingTile {
  width: 15vh;
  height: 15vh;
  box-sizing: border-box;
  flex-shrink: 0;
}

.initBuildingTile:hover .crossedSwordsImage {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 200, 0, 0.7);
  cursor: pointer;
}

.tileBackground {
  background-image: url('/images/map-location/old-forest-location/tile-background-500-500/ground-tile-background-2.png');
}

.shopBackground {
  background-image: url('/images/buildings/shop/shop.png');
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.shopPlace {
  top: 1vw;
  left: 1vw;
  width: 20vw;
  aspect-ratio: 5 / 3;
  position: absolute;
}

.crossedSwordsImage {
  width: 98%;
  height: 98%;
  background-image: url('/images/camping-place/crossed-swords.png');
  background-size: cover;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.scalableGridWrapper {
  transform: scale(1.01);
  transform-origin: top center;
  transition: transform 0.3s ease;
  position: relative;
}
</style>

