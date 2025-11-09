<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="scalableGridWrapper">
      <div
          class="tilesGrid"
          :style="gridStyle"
      >
        <map-tile
            v-for="mapTile in validMapTiles"
            :key="mapTile.id"
            :tile="mapTile"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '../../silesia-world-scene/models/tile-model';
import {PropType} from 'vue';
import MapTile from "@/a-game-scenes/location-scene/components/tile-components/map-tile.vue";

export default {
  name: "tiles-grid",
  components: {MapTile},
  props: {
    mapTiles: {
      type: Array as PropType<TileModel[]>,
      required: true
    },
    backgroundImageSrc: {
      type: String,
      required: true
    },
    mapTilesSchema: {
      type: Object as PropType<{ rows: number, columns: number }>,
      required: true
    }
  },
  computed: {
    validMapTiles() {
      return this.mapTiles.filter(
          (tile: TileModel) => tile && tile.id !== undefined && tile.coordinates
      );
    },

    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.mapTilesSchema.columns}, 14vh)`,
        gridTemplateRows: `repeat(${this.mapTilesSchema.rows}, 14vh)`,
      }
    },
  },
  methods: {
    getMapLocationBackground(mapLocationBackgroundPath: string) {
      return {
        backgroundImage: `url(${mapLocationBackgroundPath})`,
      }
    },
  }
}
</script>

<style>
@import "@/a-game-scenes/location-scene/styles/map-tiles-grid-style.css";

.tilesGrid {
  display: grid;
  grid-template-columns: repeat(13, 14vh);
  grid-template-rows: repeat(7, 14vh);
  gap: 3px;
  position: relative;
  padding: 1px;
}
</style>