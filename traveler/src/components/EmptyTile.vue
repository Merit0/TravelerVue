<template>
    <div class="mapTile" v-if="emptyTile" :style="getTileBackground(tile)"></div>
</template>

<script lang="ts">

import TileModel from "@/models/TileModel";
import { PropType } from 'vue'

export default {
    name: "empty-tile",
    props: {
        emptyTile: {
            type: Boolean,
            default: false
        },
        tile: {
            type: Object as PropType<TileModel>,
            required: true
        }
    },
  methods: {
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
      }
    }
  }
}
</script>