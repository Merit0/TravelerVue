<template>
  <div class="mapsSection">
    <map v-for="map in maps" :key="map.id" :map="mapModel"></map>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import MapModel from "@/models/MapModel";

export default {
  name: "MapsPage",
  props:  {
    maps: {
      type: Array as PropType<MapModel[]>,
      required: true
    }
  }
}
</script>

<style>
.title {
  color: rgb(255, 60, 0);
  position: inherit;
}

.tilesSection {
  margin-top: 10px;
  height: 850px;
  background-image: url('/images/maps/lost-forest/lava-ground-background.jpg');
  background-size: 100% 100%;
  border-radius: 20px;
  border: 2px solid rgb(95, 64, 43);
  padding: 50px;
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-width: 100vh;
}
</style>