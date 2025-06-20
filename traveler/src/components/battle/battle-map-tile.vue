<template>
  <transition name="fade-in-scale" mode="out-in">
    <battle-enemy-tile
        v-if="tile.isEnemyHere && enemyAlive"
        :tile="tile"
    >
    </battle-enemy-tile>
    <battle-hero-tile
        v-else-if="tile.isHeroHere"
        :tile="tile"
    >
    </battle-hero-tile>
    <battle-grave-tile
        v-else-if="tile.isGrave"
        :tile="tile"
    >
    </battle-grave-tile>
    <div v-else class="battle-map-tile" :style="getTileBackgroundImage(tile)"/>
  </transition>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/models/TileModel';
import BattleEnemyTile from "@/components/battle/battle-enemy-tile.vue";
import BattleHeroTile from "@/components/battle/battle-hero-tile.vue";
import BattleGraveTile from "@/components/battle/battle-grave-tile.vue";

const props = defineProps<{
  tile: TileModel
}>();

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const enemyAlive = computed(() => {
  return props.tile.enemies.some(e => e.health > 0);
});

</script>

<style scoped>

.battle-map-tile {
  height: 11vh;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>