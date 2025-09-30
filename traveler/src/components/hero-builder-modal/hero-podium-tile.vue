<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackgroundStyle"
  >
    <div class="tile-bottom-shadow inventory-button">
      <div
          class="tiles-podium-hero-slot"
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
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model'
import {useHeroStore} from '@/stores/HeroStore'
import {LootItemModel} from "@/models/LootItemModel";

const props = defineProps<{
  tile: TileModel
}>()

const heroStore = useHeroStore()

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
.tiles-podium-hero-slot {
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
}

.tile-bottom-shadow::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
  pointer-events: none;
  z-index: 1;
}
</style>
