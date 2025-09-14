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
import BattleEnemyTile from "@/a-game-scenes/battlefield-scene/battlefield/components/battle-enemy-tile.vue";
import BattleHeroTile from "@/a-game-scenes/battlefield-scene/battlefield/components/battle-hero-tile.vue";
import BattleGraveTile from "@/a-game-scenes/battlefield-scene/battlefield/components/battle-grave-tile.vue";

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
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battlefield-map-tile-style.css";
</style>