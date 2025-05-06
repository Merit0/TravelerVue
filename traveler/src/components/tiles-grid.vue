<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="scalableGridWrapper">
      <div class="tilesGrid">
<!--        <camp-tile></camp-tile>-->
        <map-tile
            v-for="mapTile in mapTiles"
            :key="mapTile.id"
            :tile="mapTile"
        />
<!--        <exit-map-tile v-if="this.mapTiles[0]" :tile="this.mapTiles[0]"></exit-map-tile>-->
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
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.scalableGridWrapper {
  transform: scale(1);
  transform-origin: top center;
  transition: transform 0.3s ease;
}

.tilesGrid {
  display: grid;
  grid-template-columns: repeat(12, 14vh);
  grid-template-rows: repeat(6, 14vh);
  gap: 3px;
  margin-top: 12vh;
}

</style>