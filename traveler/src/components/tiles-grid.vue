<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="tilesGrid">
      <dungeon-tile v-for="mapTile in mapTiles" :key="mapTile.id" :tile="mapTile"></dungeon-tile>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '../models/TileModel';
import {PropType} from 'vue';
import DungeonMap from "@/components/dungeon-tile.vue";

export default {
  name: "tiles-grid",
  components: {DungeonTile: DungeonMap},
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
      console.log('PATH->>', mapLocationBackgroundPath);
      return {
        backgroundImage: `url(${mapLocationBackgroundPath})`,
      }
    }
  }
}
</script>

<style>
.gridContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 20px;
  gap: 6px;
  width: 100%;
  height: 94vh;
  box-sizing: border-box;
  overflow-y: auto;
  background-size: 30% 90%;
}

.tilesGrid {
  margin-top: 6vh;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  padding: 8px;
  gap: 6px;
  width: 100%;
  height: 80vh;
  box-sizing: border-box;
  overflow-y: auto;
}

</style>