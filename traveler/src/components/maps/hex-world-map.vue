<template>
  <div class="hex-map">
    <div class="hex-map-wrapper" :style="{ transform: `scale(${scale})` }">
      <div
          v-for="tile in tiles"
          :key="tile.id"
          class="hex-tile"
          :class="tile.terrain"
          :style="getHexTileTransformStyle(tile)"
          @click="onTileClick(tile)"
      >
        <div
            :class="`hex-tile-img-${tile.terrain}`"
            :style="getTileTerrainImage(tile)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type { HexTileModel } from '@/models/hex-tile-model';

const props = defineProps<{
  tiles: HexTileModel[];
}>();

const router = useRouter();

const baseWidth = 1600;
const baseHeight = 800;
const scale = ref(1);

function updateScale() {
  const scaleX = window.innerWidth / baseWidth;
  const scaleY = window.innerHeight / baseHeight;
  scale.value = Math.min(scaleX, scaleY); // однаковий масштаб по обом осям
}

function getHexTileTransformStyle(tile: HexTileModel) {
  const tileWidth = window.innerWidth / 44.6;
  const tileHeight = tileWidth * 1.01;

  const x = tileWidth * (3 / 2) * tile.q;
  const y = Math.sqrt(3) * tileHeight * tile.r + (tile.q % 2 ? Math.sqrt(3) * tileHeight / 2 : 0);

  return {
    transform: `translate(${x}px, ${y}px)`
  };
}

function getTileTerrainImage(tile: HexTileModel) {
  return {
    backgroundImage: `url(${tile.imagePath})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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

onMounted(() => {
  updateScale();
  window.addEventListener('resize', updateScale);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScale);
});
</script>

<style scoped>
@import "@/styles/hex-map/hex-tile-terrain-background-style.css";

.hex-map {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e231d;
  overflow: hidden;
}

.hex-map-wrapper {
  position: relative;
  width: 85vw;
  height: 80vh;
  transform-origin: center center;
}

.hex-tile {
  width: var(--hex-tile-width);
  height: var(--hex-tile-height);
  position: absolute;
  clip-path: polygon(
      25% 0%, 75% 0%, 100% 50%,
      75% 100%, 25% 100%, 0% 50%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  transform-origin: center;
}

.hex-tile:hover {
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>