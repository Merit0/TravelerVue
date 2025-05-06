<template>
  <div class="initialTileView mapTile" v-if="showHero" :style="getTileBackground(tile)">
    <div class="initialTileView mapTile heroTile" :style="heroImgStyle">
      <button class="mapTile tileButton" @click="openInventory()"></button>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import {useHeroStore} from '@/stores/HeroStore';
import {PropType} from 'vue';

export default {
  name: "hero-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    },
    showHero: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const heroStore = useHeroStore();

    return {heroStore}
  },
  computed: {
    heroImgStyle(): Record<string, string> {
      const heroStore = useHeroStore();
      return {
        backgroundImage: `url(/images/heroes_150_150/${heroStore.hero.imgPath})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };
    }
  },
  methods: {
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
      }
    },
    async openInventory() {
      this.heroStore.inventoryShown = true;
    }
  }
}
</script>
<style>
@keyframes heroJump {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

.heroTile {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: heroJump 0.5s ease-out;
}
</style>