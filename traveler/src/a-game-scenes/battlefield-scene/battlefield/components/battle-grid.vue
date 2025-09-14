<template>
  <div class="battle-arena-wrapper">
    <div class="battle-tiles-grid" v-if="tile">
      <battle-map-tile
          v-for="tile in tiles"
          :key="tile.id"
          :tile="tile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBattleStore} from '@/stores/battle-store'
import TileModel from "@/a-game-scenes/silesia-world-scene/models/tile-model";
import {defineProps} from "vue";
import BattleMapTile from "@/a-game-scenes/battlefield-scene/battlefield/components/battle-map-tile.vue";

const props = defineProps<{
  tile: TileModel | null
}>()
const battleStore = useBattleStore()
const tiles = battleStore.tiles
</script>

<style scoped>
.battle-arena-wrapper {
  position: relative;
  top: -1vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25vw;
  height: 51vh;
}

.battle-tiles-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 10vh);
  grid-template-rows: repeat(5, 10vh);
  gap: 3px;
}
</style>