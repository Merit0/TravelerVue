<template>
  <div class="initialCampingTileView campingTile campingTileImage">
    <div class="campingTileImage" @click="visitCamp()">
      <div class="fire"></div>
    </div>
  </div>
</template>
<script lang="ts">
import router from "@/router";

export default {
  name: "camp-tile",
  methods: {
    visitCamp() {
      router.push('/camping');
    },
  }
}
</script>

<style>
.campingTile {
  height: 28vh;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 6px;
  align-content: center;
  grid-column: span 2;
  grid-row: span 2;
}

.campingTile:hover {
  cursor: pointer;
}

.campingTileImage {
  background-image: url("/images/camping-place/camp-tile-background.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

.initialCampingTileView {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
  0 4px 6px rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.initialCampingTileView:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
}

.fire{
  position: relative;
  top: 45%;     /* ← Встановлюй тут точку, де на зображенні малюнок вогню */
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