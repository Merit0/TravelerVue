<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="scalableGridWrapper">
      <div class="tilesGrid">
        <map-tile
            v-for="mapTile in mapTiles"
            :key="mapTile.id"
            :tile="mapTile"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '../models/TileModel';
import {PropType} from 'vue';
import MapTile from "@/components/map-tile.vue";
import CampTile from "@/components/camp-tile.vue";
import ExitMapTile from "@/components/exit-map-tile.vue";

export default {
  name: "tiles-grid",
  components: {ExitMapTile, CampTile, MapTile: MapTile},
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}

.scalableGridWrapper {
  transform: scale(1);
  transform-origin: top center;
  transition: transform 0.3s ease;
}

.tilesGrid {
  display: grid;
  grid-template-columns: repeat(13, 14vh);
  grid-template-rows: repeat(7, 14vh);
  gap: 3px;
  position: relative;
  padding: 1px;
}
</style>