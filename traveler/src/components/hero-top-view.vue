<template>
  <div
      class="battle-hero-body-tile-image"
      :style="heroTransformStyle"
  >
    <div class="podium-hero-image stand-base-top-view"/>
    <div class="podium-hero-image base-hand-l-top-view breath"/>
    <div
        class="podium-hero-image breath"
        :class="{ 'base-hand-r-top-view' : !heroStore.hero.equipment.weapon }"
        :style="getItemTopViewImageStyle(heroStore.hero.equipment.weapon)"
    />
    <div
        class="podium-hero-image breath"
        :class="{ 'base-armor-top-view': !heroStore.hero.equipment.armor }"
        :style="getItemTopViewImageStyle(heroStore.hero.equipment.armor)"
    />
    <div class="podium-hero-image breath" v-if="heroStore.hero.equipment.shield"
         :style="getItemTopViewImageStyle(heroStore.hero.equipment.shield)"/>
    <div
        class="podium-hero-image"
        :class="headClass"
    />
  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, onUnmounted, ref} from "vue";
import {useHeroStore} from "@/stores/HeroStore";
import {LootItemModel} from "@/models/LootItemModel";

const heroStore = useHeroStore();
const isIdle = ref(false);
const isHoveringHero = ref(false);
let idleTimer: number | null = null;
const targetRotation = ref(0);
let frameId: number;

const getItemTopViewImageStyle = (equipment: LootItemModel) => {
  if (!equipment?.poseImgPath) return {}
  return {
    backgroundImage: `url(${equipment.poseImgPath}-top-view.png)`,
  };
}

const headClass = computed(() => {
  return isIdle.value ? "base-head-up-top-view" : "base-head-top-view";
});

const animate = () => {
  heroStore.tickRotation();
  frameId = requestAnimationFrame(animate);
};

const heroTransformStyle = computed(() => ({
  transform: `scale(0.25) rotate(${heroStore.heroMapTileBodyRotationAngle}deg)`,
  transformOrigin: "center center",
}));

const updateRotation = (e: MouseEvent) => {
  if (isHoveringHero.value) return;

  const heroEl = document.querySelector(
      ".battle-hero-body-tile-image"
  ) as HTMLElement | null;
  if (!heroEl) return;

  const rect = heroEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  targetRotation.value = angle + 270;
  heroStore.setTargetRotation(targetRotation.value);
  isIdle.value = false;
  if (idleTimer) window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => {
    isIdle.value = true;
  }, 1000);
};

onMounted(() => {
  window.addEventListener("mousemove", updateRotation);
  frameId = requestAnimationFrame(animate);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", updateRotation);
  if (idleTimer) window.clearTimeout(idleTimer);
  cancelAnimationFrame(frameId);
});
</script>

<style scoped>
@import "@/a-game-scenes/inventory-scene/styles/hero-podium-style.css";

.battle-hero-body-tile-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.25);
  transform-origin: center center;
  z-index: 10;
}

.base-hand-l-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/hand-l-top-view.png");
}

.base-hand-r-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/hand-r-top-view.png");
}

.base-armor-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/base-torso-top-view.png");
}

.base-head-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/head-top-view.png");
}

.base-head-up-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/head-up-top-view.png");
}

.stand-base-top-view {
  background-image: url("/images/podiums/stand-base-top-view.png");
}
</style>