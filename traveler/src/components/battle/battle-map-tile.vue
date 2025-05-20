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
      >
        <div class="enemy-stats-hover">
          ❤️ {{ enemy?.health }}
          ⚔️ {{ enemy?.attack }}
        </div>
        <div class="damage-popup" v-if="damageValue">
          -{{ damageValue }}
        </div>
        <div class="blood-splash" v-if="bloodSplash" />
      </div>
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
import {defineProps, computed, ref } from 'vue';
import TileModel from '@/models/TileModel';
import {useHeroStore} from "@/stores/HeroStore";
import EnemyModel from "@/models/EnemyModel";
import {useBattleStore} from "@/stores/battle-store";

const battleStore = useBattleStore()
const props = defineProps<{
  tile: TileModel
}>()

const flipped = ref(false);
const enemy = computed(() => props.tile.enemies[0] || null);

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

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
  position: relative;
}

.enemy-stats-hover {
  position: absolute;
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
  background: rgb(64, 27, 1);
  color: #ffef8a;
  padding: 0.3vh 0.8vh;
  border-radius: 5px;
  font-size: 1.4vh;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 12;
}

.battle-enemy-tile:hover .enemy-stats-hover {
  opacity: 1;
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
  image-rendering: pixelated; /* або crisp-edges */
}

.battle-initial-tile-view:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}

.grave-tile {
  width: 100%;
  height: 100%;
  background-image: url('/images/overlays/battlefield/dead-skeleton-tile-image.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.7;
  position: relative;
  animation: graveAppear 0.5s ease-in-out;
  border-radius: 4px;
}

.grave-tile:hover {
  cursor: url('/images/overlays/battlefield/magnifier-cursor-48x48.png') 16 16, auto;
  box-shadow: 0 0 3px 1px rgba(255, 230, 0, 0.61);
  border: 1px solid rgba(255, 230, 0, 0.48);
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

.damage-popup {
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2vh;
  color: #ff4a4a;
  font-weight: bold;
  text-shadow: 0 0 5px black;
  animation: damageFloat 1.2s ease-out;
  pointer-events: none;
  z-index: 15;
}

@keyframes damageFloat {
  0% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
  30% {
    transform: translate(-50%, -1.2vh) scale(1.25);
    opacity: 1;
  }
  60% {
    transform: translate(-50%, -2vh) scale(1.1);
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -3.2vh) scale(1);
  }
}

.blood-splash {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/images/overlays/battlefield/blood-splash-effect-image.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: bloodFadeOut 1s ease-out forwards;
  pointer-events: none;
  z-index: 2;
}

@keyframes bloodFadeOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

</style>