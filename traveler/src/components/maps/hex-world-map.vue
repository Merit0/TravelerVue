<template>
  <div class="hex-map">
    <div
        v-for="tile in tiles"
        :key="tile.id"
        class="hex-tile"
        :class="tile.terrain"
        :style="getHexTileTransformStyle(tile)"
        @click="onTileClick(tile)"
    >
      <div :class="`hex-tile-img-${tile.terrain}`" :style="getTileTerrainImage(tile)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {defineProps} from 'vue';
import type {HexTileModel} from '@/models/hex-tile-model';

const props = defineProps<{
  tiles: HexTileModel[];
}>();

const router = useRouter();

function getTileTerrainImage(tile: HexTileModel) {
  return {
    backgroundImage: `url(${tile.imagePath})`,
    'background-size': 'cover',
    'background-repeat': 'no-repeat'
  };
}

function getHexTileTransformStyle(tile: HexTileModel) {
  const x = 50 * (3 / 2) * tile.q;
  const y = Math.sqrt(3) * 51 * tile.r + (tile.q % 2 ? Math.sqrt(3) * 51.5 / 2 : 0);
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
}

function onTileClick(tile: HexTileModel) {
  if (tile.regionKey && tile.regionKey !== 'camping') {
    router.push(`/map/${tile.regionKey}`);
  } else if (tile.regionKey && tile.regionKey === 'camping') {
    router.push(`/${tile.regionKey}`);
  } else {
    return new Error('Map region is not supported');
  }
}
</script>

<style scoped>
@import "@/styles/hex-map/hex-tile-terrain-background-style.css";

.hex-map {
  position: absolute;
  background: #27201c;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hex-tile {
  width: 5vw;
  height: 9vh;
  position: absolute;
  margin: 1%;
  clip-path: polygon(
      25% 0%, 75% 0%, 100% 50%,
      75% 100%, 25% 100%, 0% 50%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
  font-weight: bold;
  user-select: none;
  transition: transform 0.2s;
}
</style>
