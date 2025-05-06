<template>
  <div
      v-if="tile.isInitial"
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
    'hero-tile-highlight': tile.isHeroHere,
    'reachable-tile': tile.isReachable && !tile.isHeroHere
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

      if (tile.enemies.length === 0) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
};
</script>

<style>
@import '@/styles/animated-tile.css';

.unreachable {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
}

.hero-tile-highlight {
  outline: 3px solid gold;
  box-shadow: 0 0 10px gold;
  border-radius: 5px;
}

.reachable-tile {
  outline: 2px dashed rgba(200, 200, 255, 0.2);
  border-radius: 5px;
  animation: reachableGlow 1.5s infinite ease-in-out;
  transition: transform 0.3s ease;
}

.reachable-tile:hover {
  transform: scale(1.02);
  cursor: pointer;
}

@keyframes reachableGlow {
  0% {
    box-shadow: 0 0 5px rgba(200, 200, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(200, 200, 255, 0.6);
  }
  100% {
    box-shadow: 0 0 5px rgba(200, 200, 255, 0.3);
  }
}
</style>