<template>
  <div
      class="initialTileView battle-map-tile"
  >
    <div class="damage-popup" v-if="damageValue">
      -{{ damageValue }}
    </div>
    <div class="blood-splash" v-if="bloodSplash"/>
    <div
        class="battle-hero-tile"
        @click="openInventory"
    >
      <hero-top-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model';
import {useBattleStore} from "@/stores/battle-store";
import {useHeroStore} from "@/stores/HeroStore";
import HeroTopView from "@/components/hero-top-view.vue";

const battleStore = useBattleStore();
const heroStore = useHeroStore()

const props = defineProps<{
  tile: TileModel
}>();

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

const openInventory = () => {
  heroStore.inventoryShown = true
}

</script>

<style scoped>
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battlefield-map-tile-style.css";
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battle-effects-style.css";

.battle-hero-tile {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
}
</style>