<template>
  <div class="battle-arena-wrapper">
    <div class="battle-tiles-grid" v-if="tile">
      <battle-map-tile
          v-for="tile in tiles"
          :key="tile.id"
          :tile="tile"
          :enemyAlive="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBattleStore} from '@/stores/battle-store'
import TileModel from "@/models/TileModel";
import {defineProps} from "vue";
import BattleMapTile from "@/components/battle/battle-map-tile.vue";

const props = defineProps<{
  tile: TileModel | null
}>()
const battleStore = useBattleStore()
const tiles = battleStore.tiles
</script>

<style scoped>
.battle-arena-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26vw;
  height: 54vh;
  background: #401b01;
  border-radius: 2vh;
}

.battle-tiles-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 10vh);
  grid-template-rows: repeat(5, 10vh);
  gap: 3px;
  padding: 1px;
}
</style>