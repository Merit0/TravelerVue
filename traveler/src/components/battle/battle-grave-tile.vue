<template>
  <div
      class="battle-initial-tile-view battle-map-tile"
      :style="getTileBackgroundImage(tile)"
  >
    <div class="grave-tile"
         :style="getGraveImage(tile)"
         :class="{ glowing: hasGraveLoot }"
         @click="hasGraveLoot && openGraveInventory(tile)"
    >
      <div v-if="hasGraveLoot" class="grave-info-icon">i</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/models/TileModel';
import {useGraveStore} from '@/stores/grave-store';
import {useOverlayStore} from "@/stores/overlay-store";
import {EnemyType} from "@/enums/EnemyType";

const graveStore = useGraveStore();
const overlayStore = useOverlayStore();

const props = defineProps<{
  tile: TileModel
}>();

const hasGraveLoot = computed(() => {
  return props.tile.grave?.graveTreasureItems.some(item => item?.name) ?? false;
});

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const getGraveImage = () => {
  const skeletonType: string = graveStore.killedEnemyType !== EnemyType.ANIMAL ? 'skeleton' : 'animal';
  const path = `/images/overlays/battlefield/dead-${skeletonType}-tile-image.png`;
  return {
    backgroundImage: `url(${path})`,
  }
};

const openGraveInventory = (tile: TileModel) => {
  if (
      tile.isGrave &&
      tile.grave &&
      tile.grave.graveTreasureItems.some(item => item.name)
  ) {
    graveStore.buildGraveFromTile(tile);
    overlayStore.openOverlay('grave-inventory');
  }
};

</script>

<style scoped>
.battle-initial-tile-view {
  will-change: transform;
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.battle-initial-tile-view:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}

.grave-tile {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.7;
  position: relative;
  animation: graveAppear 0.5s ease-in-out;
  border-radius: 4px;
}

.grave-tile.glowing {
  cursor: url('/images/overlays/battlefield/magnifier-cursor-48x48.png') 16 16, auto;
  border-radius: 4px;
  border: 2px solid rgb(12, 5, 2);
  transition: box-shadow 0.3s ease-in-out;
  opacity: 1;
}

.grave-info-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'MedievalSharp', cursive; /* 🔥 ігровий шрифт */
  font-weight: bold;
  font-size: 2.8vh;
  color: #ffe600;
  text-shadow: 0 0 4px rgba(255, 255, 150, 0.8),
  0 0 8px rgba(255, 255, 100, 0.6);
  animation: pulseIcon 1.5s infinite ease-in-out;
  pointer-events: none;
  user-select: none;
}

.grave-tile:hover .grave-info-icon {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
}

@keyframes pulseIcon {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes graveAppear {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 0.9;
    transform: scale(1);
  }
}

</style>