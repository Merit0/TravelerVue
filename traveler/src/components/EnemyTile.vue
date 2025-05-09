<template>
  <div class="initialTileView mapTile" v-if="(!tile.isInitial) && tile.enemies.length != 0 && enemyAlive"
       :style="getTileBackground(tile)">
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
import TileModel from '@/models/TileModel';
import {PropType} from 'vue';
import EnemyModel from "@/models/EnemyModel";


export default {
  name: "enemy-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    },
    enemyAlive: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    async startBattle(tile: TileModel) {
      tile.inBattle = true;
      this.$emit('showBattlefield', true);
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
    }
  }
}
</script>
<style>
@import '@/styles/animated-tile.css';

.enemyTile {
  background-size: 90% 90%;
  background-repeat: no-repeat;
}
</style>