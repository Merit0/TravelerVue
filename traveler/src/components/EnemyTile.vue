<template>
  <div
      class="initialTileView mapTile"
      v-if="!tile.isInitial && hasAliveEnemies"
      :style="getTileBackground(tile)"
  >
    <div
        class="initialTileView mapTile enemyTile"
        :style="getEnemyImage(tile.enemies[0])"
    >
      <button
          class="mapTile tileButton"
          @click="startBattle(tile)"
          :disabled="!tile.isReachable"
          :class="{
          unreachable: !tile.isReachable,
          'reachable-tile': tile.isReachable && !tile.isHeroHere,
        }"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import TileModel from '@/models/TileModel'
import EnemyModel from '@/models/EnemyModel'
import {useBattleStore} from '@/stores/battle-store'
import {useOverlayStore} from '@/stores/overlay-store'
import {useDiceStore} from "@/stores/DiceStore";

export default defineComponent({
  name: 'enemy-tile',
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true,
    },
  },
  computed: {
    firstAliveEnemy(): EnemyModel | null {
      return this.tile.enemies.find((e) => e.health > 0) || null;
    },
    hasAliveEnemies(): boolean {
      return !!this.firstAliveEnemy && this.tile.enemies.length > 0;
    }
  },
  methods: {
    startBattle(tile: TileModel) {
      const battleStore = useBattleStore();
      const overlayStore = useOverlayStore();
      const diceStore = useDiceStore();

      battleStore.startBattleOnTile(tile);
      tile.inBattle = true;

      const aliveEnemies = tile.enemies.filter(e => e.health > 0);
      diceStore.setDiceCountWithEnemyCount(aliveEnemies);

      overlayStore.openOverlay('battle');
    },
    getEnemyImage(enemy: EnemyModel) {
      return {
        backgroundImage: `url(${enemy.imgPath})`,
      }
    },
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
      }
    },
  },
})
</script>

<style>
@import '@/styles/animated-tile.css';

.enemyTile {
  background-size: 90% 90%;
  background-repeat: no-repeat;
}
</style>