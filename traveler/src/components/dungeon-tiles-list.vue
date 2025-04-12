<template>
  <div class="tilesSection">
    <dungeon-tile v-for="mapTile in mapTiles" :key="mapTile.id" :tile="mapTile"></dungeon-tile>
  </div>
</template>

<script lang="ts">
import TileModel from '../models/TileModel';
import {PropType} from 'vue';
import DungeonMap from "@/components/dungeon-tile.vue";
import {MapLocationModel} from "@/models/map-location-model";

export default {
  name: "dungeon-tiles",
  components: {DungeonTile: DungeonMap},
  props: {
    mapTiles: {
      type: Array as PropType<TileModel[]>,
      required: true
    },
    mapLocation: {
      type: Object as PropType<MapLocationModel>,
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
.tilesSection {
  height: 850px;
  background-image: url('/images/maps/lost-forest/lava-ground-background.jpg');
  background-size: 100% 100%;
  border-radius: 20px;
  border: 2px solid rgb(95, 64, 43);
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-width: 100vh;
}
</style>