<template>
  <div class="initialTileView mapTile" v-if="tile.hero && showHero" :style="getTileBackground(tile)">
    <div class="initialTileView mapTile heroTile" :style="getStyle(tile)">
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
  methods: {
    getStyle(tile: TileModel) {
      return {
        backgroundImage: `url(/images/heroes_150_150/${tile.hero.imgPath})`,
      };
    },
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
.heroTile {
  background: none;
  background-size: 100% 100%;
}
</style>