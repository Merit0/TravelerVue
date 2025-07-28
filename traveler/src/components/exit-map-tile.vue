<template>
  <div class="initialTileView exitMapTile" :style="getTileImage(tile.backgroundSrc)">
    <div class="exitTileImage" @click="visitMaps()"></div>
  </div>
</template>
<script lang="ts">

import TileModel from '@/models/TileModel';
import {PropType} from "vue";
import router from "@/router";
import {useMapLocationStore} from "@/stores/map-location-store";

export default {
  name: "exit-map-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  methods: {
    getTileImage(imageSrc: string) {
      return {
        backgroundImage: `url(${imageSrc})`,
      }
    },
    visitMaps() {
      const mapStore = useMapLocationStore();
      mapStore.resetCurrentLocation();
      router.push('/maps');
    }
  }
}
</script>

<style>
@import '@/styles/animated-tile.css';

.exitMapTile {
  height: 14vh;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  align-content: center;
}

.exitMapTile:hover {
  cursor: pointer;
}

.exitTileImage {
  margin-left: 8%;
  background-image: url("/images/map-location/camping-place-location/tile-image-500-500/right-arrow.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 80%;
  height: 80%;

  animation: pulseMove 2s infinite ease-in-out;
}

@keyframes pulseMove {
  0%, 100% {
    filter: drop-shadow(0 0 4px rgb(238, 255, 0));
    transform: translateX(0);
  }
  50% {
    filter: drop-shadow(0 0 12px rgba(255, 213, 0, 0.8));
    transform: translateX(4px);
  }
}

</style>