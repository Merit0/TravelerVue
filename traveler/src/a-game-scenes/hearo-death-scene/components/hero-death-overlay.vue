<template>
  <div class="globalOverlay">
    <div class="overlayContent">
      <div class="imgContainer"></div>
      <button class="quit" @click="quitMap()">Reborn</button>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';

export default {
  name: "HeroDeathOverlay",
  methods: {
    async quitMap() {
      router.push("/camping");
    }
  }
}
</script>

<style>

.overlayContent {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 43, 43, 0.78);
  box-shadow: 0 -3px 15px 4px rgba(255, 195, 195, 0.5);
  padding: 2vw;
  align-items: center;

}

.imgContainer {
  position: relative;
  width: 100%;
  height: 100%  ;
  border-radius: 20px;
  margin: auto;
  background-image: url("/src/a-game-scenes/hearo-death-scene/components/hearo-death-scene/assets/hero-death-overlay-background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.quit {
  position: absolute;
  bottom: 4vh;
  left: 50%;
  transform: translateX(-50%);
  padding: 1vh 3vw;
  font-size: 1.5vw;
  font-weight: bold;
  text-transform: uppercase;
  color: #ffe4b5;
  background: linear-gradient(145deg, #5a2d1a, #3e1d0d);
  border: 2px solid #ffcf91;
  border-radius: 6px;
  box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.4),
      inset 0 0 10px rgba(255, 204, 153, 0.2);
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 10;
}

.quit:hover {
  background: linear-gradient(145deg, #743c23, #542212);
  color: #fff5dc;
  box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.6),
      0 0 10px rgba(255, 200, 130, 0.6),
      inset 0 0 12px rgba(255, 255, 255, 0.1);
  transform: translateX(-50%) scale(1.05);
}

</style>