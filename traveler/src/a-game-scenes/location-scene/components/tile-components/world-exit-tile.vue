<template>
  <div
      class="mapTile"
      @click="exitOnMap"
      :style="getTileBackground(tile)"
  >
    <div class="my-icon my-map-icon"/>
  </div>
</template>

<script lang="ts">

import TileModel from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import {PropType} from 'vue';
import router from "@/router";
import {useMapLocationStore} from "@/stores/map-location-store";

export default {
  name: "world-exit-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  methods: {
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
        'background-size': '100% 100%'
      }
    },
    exitOnMap() {
      // router.push('/forest-entrance');
      const mapLocationStore = useMapLocationStore();
      mapLocationStore.resetMapLocation('Fallen Bones')
      router.push('/silesia');
    },
  }
}
</script>

<style scoped>
.my-icon {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  flex-shrink: 0;
  z-index: 2;
}
.my-map-icon {
  background-image: url('/src/a-game-scenes/home-scene/assets/map-icon-image.png');
}
</style>