<template>
  <div class="map" :style="getMapBackground(map.imgPath)" v-if="!map.isLocked">
    <map-location v-for="mapLocation in map.mapLocations" :key="mapLocation.uuid" :mapLocation="mapLocation"></map-location>
    <div class="map-name">{{ map.name }}</div>
  </div>
  <div class="map" :style="getMapBackground(map.imgPath)" v-if="map.isLocked">
    <div class="map-overlay">
      <p class="lock-text">🔒 Замкнуто</p>
      <div class="map-name">{{ map.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {useMapStore} from '@/stores/MapStore';
import MapLocation from "@/components/map-location.vue";
import MapModel from "@/models/MapModel";

export default {
  name: "MapView",
  props: {
    map: {
      type: MapModel,
      required: true
    }
  },
  components: {MapLocation},
  data() {
    const mapStore = useMapStore();
    return {mapStore}
  },
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

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.6); /* Semi-transparent gray */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.map-overlay {
  pointer-events: all;
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

.lock-text {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>