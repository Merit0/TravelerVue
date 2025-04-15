<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="tilesGrid">
      <camp-tile :tile="mapTiles[0]"></camp-tile>
      <map-tile
          v-for="(mapTile) in mapTiles"
          :key="mapTile.id"
          :tile="mapTile"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '../models/TileModel';
import {PropType} from 'vue';
import MapTile from "@/components/map-tile.vue";
import CampTile from "@/components/camp-tile.vue";

export default {
  name: "tiles-grid",
  components: {CampTile, MapTile: MapTile},
  props: {
    mapTiles: {
      type: Array as PropType<TileModel[]>,
      required: true
    },
    backgroundImageSrc: {
      type: String,
      required: true
    }
  },
  methods: {
    getMapLocationBackground(mapLocationBackgroundPath: string) {
      return {
        backgroundImage: `url(${mapLocationBackgroundPath})`,
      }
    }
  }
}
</script>

<style>
.gridContainer {
  padding: 20px;
  width: 100%;
  height: 94vh;
}
.tilesGrid {
  margin-top: 3vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, 12vh);
  grid-auto-rows: 12vh;
  gap: 3px;
  padding: 3vw;
  width: 100%;
  height: 80vh;
  box-sizing: border-box;
  overflow-y: auto;
  align-content: start;
}

</style>