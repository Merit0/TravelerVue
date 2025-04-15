<template>
  <div v-if="tile.isInitial" class="initialTileView mapTile" :style="getTileImage(tile.backgroundSrc)">
    <div class="initialTileView mapTile" :style="getTileImage(tile.imageSrc)">
      <button class="mapTile tileButton" @click="checkTile(tile)"></button>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';


export default {
  name: "relief-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  data() {
    const mapLocationStore = useMapLocationStore();
    const heroStore = useHeroStore();
    return {mapLocationStore, heroStore};
  },
  methods: {
    getTileImage(imageSrc: string) {
      return {
        backgroundImage: `url(${imageSrc})`,
      }
    },
    async checkTile(tile: TileModel) {
      tile.isInitial = false;
      if (tile.enemies.length === 0) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
}
</script>
<style>
@import '@/styles/animated-tile.css';
</style>