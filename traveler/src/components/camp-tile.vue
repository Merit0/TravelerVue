<template>
    <div class="initialCampingTileView campingTile">
      <div class="campingTileImage">
        <button @click="visitCamp()" class="campingTile campingTileButton"></button>
      </div>
    </div>
</template>
<script lang="ts">

import TileModel from '@/models/TileModel';
import {PropType} from "vue";
import router from "@/router";

export default {
  name: "camp-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  methods: {
    visitCamp() {
      router.push('/camping');
    },
  }
}
</script>

<style>
.campingTile {
  height: 28vh;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 6px;
  align-content: center;
  grid-column: span 2;
  grid-row: span 2;
}

.campingTileImage {
  background-image: url("/images/camping-place/camp-tile-background.png");
  background-size: 99%, 99%;
  background-repeat: no-repeat;
}

.campingTileButton {
  background: none;
  position: relative;
}

.initialCampingTileView {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
  0 4px 6px rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.initialCampingTileView:hover {
  transform: scale(1.01);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
}
</style>