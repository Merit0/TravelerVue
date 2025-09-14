<template>
  <div
      class="initialTileView mapTile"
      :style="getTileImage(tile.backgroundSrc)"
      :class="`tile-id-${tile.id}`"
      :data-id="tile.id"
  >
    <div class="initialTileView mapTile" :style="getTileImage(tile.imageSrc)">
      <button
          class="mapTile tileButton"
          :disabled="!tile.isReachable"
          :class="{
    unreachable: !tile.isReachable,
    'reachable-tile': tile.isReachable && !tile.isHeroHere,
  }"
          @click="checkTile(tile)"
      ></button>
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
      };
    },
    async checkTile(tile: TileModel) {
      if (!tile.isReachable) return;
      tile.isInitial = false;

      if (!tile.isEnemyHere) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
};
</script>

<style scoped>
@import '@/a-game-scenes/location-scene/styles/animated-tile.css';
</style>