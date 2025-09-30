<template>
  <div
      class="battle-map-tile"
      :style="getTileBackgroundImage(tile)"
  >
    <div class="damage-popup" v-if="damageValue">
      -{{ damageValue }}
    </div>
    <div class="blood-splash" v-if="bloodSplash"/>
    <div
        class="initialTileView mapTile enemy-tile"
        :style="getEnemyImage(tile)"
        :class="{ 'dodged': wasDodged }"
    >
      <div class="enemy-stats-hover">
        ❤️ {{ enemy?.health }}
        ⚔️ {{ enemy?.attack }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model';
import {useBattleStore} from "@/stores/battle-store";

const battleStore = useBattleStore();

const props = defineProps<{
  tile: TileModel
}>();

const enemy = computed(() => props.tile.enemies[0] || null);

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const wasDodged = computed(() => battleStore.missedEnemies.includes(props.tile.id));

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const getEnemyImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.enemies[0].imgPath})`,
    'background-size': '100% 100%'
  }
};

</script>

<style scoped>
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battlefield-map-tile-style.css";
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battle-enemy-tile-style.css";
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battle-effects-style.css";
</style>