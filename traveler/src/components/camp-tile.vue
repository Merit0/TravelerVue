<template>
  <div
      class="campOverlayTile"
      @click="visitCamp"
  >
    <div class="campingTileImage">
      <div class="fire"></div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { useMapLocationStore } from "@/stores/map-location-store";

export default {
  name: "camp-tile",
  methods: {
    visitCamp() {
      const mapStore = useMapLocationStore();
      mapStore.resetCurrentLocation();
      router.push('/camping');
    },
  }
}
</script>

<style scoped>
.campOverlayTile {
  position: absolute;
  top: calc(2 * 14vh - 2 * 1px);
  left: calc(5 * 14vh + 2 * 8px);
  width: calc(3 * 14vh + 2 * 3px);
  height: calc(3 * 14vh + 2 * 2px);
  z-index: 1;
  pointer-events: auto;
  margin-top: 0.6rem;
}

.campOverlayTile:hover {
  cursor: pointer;
  transform: scale(1.005);
  box-shadow: 0 0 15px rgba(255, 180, 80, 0.4);
}

.campingTileImage {
  background-image: url("/src/a-game-scenes/home-scene/assets/camp-tile-background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
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
