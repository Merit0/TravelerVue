<template>
  <div class="gridContainer" :style="getMapLocationBackground(this.backgroundImageSrc)">
    <div class="scalableGridWrapper">
      <div class="tilesGrid">
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
import TileModel from '../models/TileModel';
import {PropType} from 'vue';
import MapTile from "@/components/map-tile.vue";

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
    }
  },
  computed: {
    validMapTiles() {
      return this.mapTiles.filter(
          (tile: TileModel) => tile && tile.id !== undefined && tile.coordinates
      );
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
@import "@/styles/map-tiles-style/map-tiles-grid-style.css";
</style>