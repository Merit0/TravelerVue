<template>
  <div
      class="mapTile exit-tile-style"
      @click="exitOnMap"
  >
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
    exitOnMap() {
      const mapLocationStore = useMapLocationStore();
      mapLocationStore.resetMapLocation('Fallen Bones')
      router.push('/silesia');
    },
  }
}
</script>

<style scoped>

.exit-tile-style {
  position: relative;
  background-image: url("/src/a-game-scenes/location-scene/assets/stairs-to-bottom-tile-image.png");
  background-size: cover;
  cursor: pointer;
}
</style>