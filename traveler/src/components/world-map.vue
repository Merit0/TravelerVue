<template>
  <div class="map" :style="getMapBackground(map.imgPath)" v-if="!map.isLocked">
    <map-location-spot v-for="mapLocation in map.mapLocations" :key="mapLocation.uuid"
                       :mapLocation="mapLocation"></map-location-spot>
    <div class="map-name">{{ map.name }}</div>
  </div>
</template>

<script lang="ts">
import MapLocationSpot from "@/components/map-location-spot.vue";
import MapModel from "@/models/MapModel";
import {PropType} from "vue";

export default {
  name: "WorldMap",
  props: {
    map: {
      type: Object as PropType<MapModel>,
      required: true
    }
  },
  components: {MapLocationSpot},
  methods: {
    getMapBackground(mapBackgroundPath: string) {
      return {
        backgroundImage: `url(${mapBackgroundPath})`,
      }
    }
  }
}
</script>

<style>
.map {
  position: relative;
  width: 100%;
  max-width: 690px;
  min-height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 100% 100%;
}

.map-name {
  position: absolute;
  top: 1vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(16px, 4vw, 20px);
  font-weight: bold;
  color: #d4af37; /* Gold color */
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
  background: rgba(0, 0, 0, 0.6);
  padding: 1vh 2vw;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.8);
  font-family: 'Cinzel', serif; /* Medieval-style font */
  text-align: center;
  white-space: nowrap;
}
</style>