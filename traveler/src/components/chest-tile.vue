<template>
  <div
      class="initialTileView mapTile"
      :style="getTileBackground(tile)"
  >
    <div class="initialTileView mapTile chestTile" :style="getStyle(tile)">
      <button
          class="mapTile tileButton"
          @click="$emit('chestInventory', true)"
          :disabled="!tile.isReachable"
          :class="{
    unreachable: !tile.isReachable,
    'reachable-tile': tile.isReachable && !tile.isHeroHere,
  }"
      >
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import TileModel from '@/models/TileModel';
import {PropType} from "vue";

export default {
  name: "chest-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  methods: {
    getStyle(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.chest.imgPath})`,
      }
    },
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
      }
    },
  }
}
</script>

<style>
.chestTile {
  background: none;
  border: none;
  background-size: 100% 100%;
}
</style>