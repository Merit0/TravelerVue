<template>
  <div
      class="battle-map-tile"
      :style="getTileBackgroundImage(tile)"
  >
    <div class="damage-popup" v-if="damageValue">
      -{{ damageValue }}
    </div>
    <div class="blood-splash" v-if="bloodSplash"/>
    <hero-map-tile :tile="tile"/>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/models/TileModel';
import {useBattleStore} from "@/stores/battle-store";
import HeroMapTile from "@/components/hero-map-tile.vue";

const battleStore = useBattleStore();

const props = defineProps<{
  tile: TileModel
}>();

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

</script>

<style>
@import "@/styles/battlefield-style/battlefield-map-tile-style.css";
@import "@/styles/battlefield-style/battle-effects-style.css";

.battle-inventory-button {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
}

.battle-hero-body-tile-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.3);
  transform-origin: center center;
  bottom: 20%;
  filter: drop-shadow(10px 20px 12px rgba(0, 0, 0, 0.7));
  z-index: 2;
}

.battle-tile-bottom-shadow::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
  pointer-events: none;
  z-index: 1;
}
</style>