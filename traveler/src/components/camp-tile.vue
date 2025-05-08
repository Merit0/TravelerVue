<template>
  <div class="initialTileView mapTile" @click="visitCamp">
    <div class="campingTileImage">
      <div class="fire"></div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import {useMapLocationStore} from "@/stores/map-location-store";

export default {
  name: "camp-tile",
  methods: {
    visitCamp() {
      const mapStore = useMapLocationStore();
      mapStore.resetCurrentLocation();
      router.push('/maps');
      // router.push('/camping');
    },
  }
}
</script>

<style scoped>
.campingTileImage {
  background-image: url("/images/camping-place/camp-tile-background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
}

.fire {
  position: absolute;
  top: 45%;
  left: 60%;
  width: 10%;
  height: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 233, 88, 0.8) 0%, rgb(253, 252, 180) 80%);
  animation: firePulse 1.2s infinite ease-in-out, fireFlicker 0.2s infinite;
  pointer-events: none;
}

/* Анімації */
@keyframes firePulse {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.2);
    filter: brightness(1.2);
  }
}

@keyframes fireFlicker {
  0%   { transform: translate(0, 0); }
  25%  { transform: translate(1px, -1px); }
  50%  { transform: translate(-1px, 1px); }
  75%  { transform: translate(1px, 1px); }
  100% { transform: translate(-1px, -1px); }
}
</style>