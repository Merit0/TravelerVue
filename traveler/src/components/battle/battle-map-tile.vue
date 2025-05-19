<template>
  <transition name="fade-in-scale" mode="out-in">
    <div
        v-if="tile.isEnemyHere && enemyAlive"
        class="battle-initial-tile-view battle-map-tile"
        :style="getTileBackgroundImage(tile)"
    >
      <div
          class="battle-enemy-tile"
          :style="getEnemyImage(tile)"
      />
    </div>
    <div
        v-else-if="tile.isHeroHere"
        class="battle-initial-tile-view battle-map-tile"
        :style="getTileBackgroundImage(tile)"
    >
      <div
          class="battle-hero-tile"
          :style="heroImgStyle"
          :class="{ flipped }"
          @mousemove="handleMouse">
        <button
            class="battle-map-tile tileButton"
            @click="openInventory()"
        />
      </div>
    </div>
    <div
        v-else-if="tile.isGrave"
        class="battle-initial-tile-view battle-map-tile"
        :style="getTileBackgroundImage(tile)"
    >
      <div class="grave-tile">
        <div class="grave-info-icon">i</div>
      </div>
    </div>

    <div v-else class="battle-map-tile" :style="getTileBackgroundImage(tile)"/>
  </transition>
</template>

<script setup lang="ts">
import {defineProps, computed, ref} from 'vue'
import TileModel from '@/models/TileModel'
import {useHeroStore} from "@/stores/HeroStore";
import EnemyModel from "@/models/EnemyModel";

const props = defineProps<{
  tile: TileModel
}>()

const flipped = ref(false);

function handleMouse(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2

  flipped.value = e.clientX > centerX
}

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const heroStore = useHeroStore();

const heroImgStyle = computed(() => ({
  backgroundImage: `url(${heroStore.hero.imgPath})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

const openInventory = () => {
  heroStore.inventoryShown = true;
};

const getEnemyImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.enemies[0].imgPath})`,
  }
};

const enemyAlive = computed<EnemyModel | null>(() => {
  return props.tile.enemies.find(e => e.health > 0) || null
})

</script>

<style scoped>
@keyframes heroJump {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

.battle-hero-tile {
  background-size: cover;
  animation: heroJump 0.5s ease-out;
  background-repeat: no-repeat;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.battle-hero-tile.flipped {
  transform: scaleX(-1);
}

.battle-enemy-tile {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.battle-map-tile {
  height: 10vh;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-in-scale-enter-active,
.fade-in-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-in-scale-enter-from,
.fade-in-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.battle-initial-tile-view {
  will-change: transform;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2),
  0 4px 6px rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.battle-hero-tile,
.battle-enemy-tile {
  image-rendering: crisp-edges; /* або pixelated */
}

.battle-initial-tile-view:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}

.grave-tile {
  width: 90%;
  height: 90%;
  background-image: url('/images/overlays/battlefield/dead-skeleton-tile-image.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.9;
  position: relative;
  animation: graveAppear 0.5s ease-in-out;
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
  text-shadow:
      0 0 4px rgba(255, 255, 150, 0.8),
      0 0 8px rgba(255, 255, 100, 0.6);
  animation: pulseIcon 1.5s infinite ease-in-out;
  pointer-events: none;
  user-select: none;
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