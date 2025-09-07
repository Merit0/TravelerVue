<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackgroundStyle"
  >
    <div
        class="tile-bottom-shadow inventory-button"
        @click="openInventory"
    >
      <div class="hero-body-tile-image">
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
        <div
            class="podium-hero-image"
            :class="{ 'base-belt-top-view': !heroStore.hero.equipment.belt }"
            :style="getItemTopViewImageStyle(heroStore.hero.equipment.belt)"
        />
        <div class="podium-hero-image breath" v-if="heroStore.hero.equipment.shield" :style="getItemTopViewImageStyle(heroStore.hero.equipment.shield)"/>
        <div class="podium-hero-image base-head-top-view"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue'
import TileModel from '@/models/TileModel'
import {useHeroStore} from '@/stores/HeroStore'
import {LootItemModel} from "@/models/LootItemModel";

const heroStore = useHeroStore()

const props = defineProps<{
  tile: TileModel
}>()


const getItemTopViewImageStyle = (equipment: LootItemModel) => {
  if (!equipment?.poseImgPath) return {}
  return {
    backgroundImage: `url(${equipment.poseImgPath}-top-view.png)`,
  };
}

const tileBackgroundStyle = computed(() => ({
  backgroundImage: `url(${props.tile.backgroundSrc})`,
  backgroundSize: '100% 100%',
}))

const openInventory = () => {
  heroStore.inventoryShown = true
}
</script>

<style scoped>
.hero-body-tile-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.35);
  transform-origin: center center;
  z-index: 10;
}

.inventory-button {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
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

.base-belt-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts");
}

.base-head-top-view {
  background-image: url("/images/creatures_500_500/humans_500_500/hero-asmodei/body-parts/head-up-top-view.png");
}

.stand-base-top-view {
  background-image: url("/images/podiums/stand-base-top-view.png");
}

@keyframes heroJump {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
