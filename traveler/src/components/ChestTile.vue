<template>
  <button class="chestTile mapTile" @click="$emit('chestInventory', true)" :style="getStyle(tile)"
          v-if="(!tile.isInitial && !tile.hero) && (tile.enemies.length === 0) && tile.chest"></button>
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
    }
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