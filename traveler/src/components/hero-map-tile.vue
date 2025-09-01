<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackgroundStyle"
  >
    <div class="tile-bottom-shadow inventory-button">
      <div
          class="hero-body-tile-image"
          @click="openInventory"
      >
        <div class="podium-hero-image stand-base"/>
        <div class="podium-hero-image base-hand-l"/>
        <div
            class="podium-hero-image breath"
            :class="{ 'base-hand-r' : !heroStore.hero.equipment.weapon }"
            :style="getItemImageStyle(heroStore.hero.equipment.weapon)"
        />
        <div
            class="podium-hero-image"
            :class="{ 'base-boots': !heroStore.hero.equipment.boots }"
            :style="getItemImageStyle(heroStore.hero.equipment.boots)"
        />
        <div
            class="podium-hero-image"
            :class="{ 'base-legs': !heroStore.hero.equipment.pants }"
            :style="getItemImageStyle(heroStore.hero.equipment.pants)"
        />
        <div
            class="podium-hero-image breath"
            :class="{ 'base-armor': !heroStore.hero.equipment.armor }"
            :style="getItemImageStyle(heroStore.hero.equipment.armor)"
        />
        <div
            class="podium-hero-image"
            :class="{ 'base-belt': !heroStore.hero.equipment.belt }"
            :style="getItemImageStyle(heroStore.hero.equipment.belt)"
        />
        <div class="podium-hero-image base-head"/>
        <div class="podium-hero-image" v-if="heroStore.hero.equipment.helm"
             :style="getItemImage(heroStore.hero.equipment.helm)"/>
        <div class="podium-hero-image" v-if="heroStore.hero.equipment.shield"
             :style="getItemImage(heroStore.hero.equipment.shield)"/>
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


const getItemImageStyle = (equipment: LootItemModel) => {
  if (!equipment?.poseImgPath) return {}
  return {
    backgroundImage: `url(${equipment.poseImgPath})`,
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
  transform: scale(0.4);
  transform-origin: center center;
  bottom: 20%;
  filter: drop-shadow(10px 20px 12px rgba(0, 0, 0, 0.7));
  z-index: 2;
}

.tile-bottom-shadow::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  pointer-events: none;
  z-index: 1;
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
