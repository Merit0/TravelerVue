<template>
  <div
      class="battle-initial-tile-view battle-map-tile"
      :style="getTileBackgroundImage(tile)"
  >
    <div
        class="battle-enemy-tile"
        :style="getEnemyImage(tile)"
        :class="{ 'dodged': wasDodged }"
    >
      <div class="enemy-stats-hover">
        ❤️ {{ enemy?.health }}
        ⚔️ {{ enemy?.attack }}
      </div>
      <div class="damage-popup" v-if="damageValue">
        -{{ damageValue }}
      </div>
      <div class="blood-splash" v-if="bloodSplash"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/models/TileModel';
import {useBattleStore} from "@/stores/battle-store";
const battleStore = useBattleStore();

const props = defineProps<{
  tile: TileModel
}>();

const enemy = computed(() => props.tile.enemies[0] || null);

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const wasDodged = computed(() => battleStore.missedEnemies.includes(props.tile.id));

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const getEnemyImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.enemies[0].imgPath})`,
  }
};

const enemyAlive = computed(() => {
  return props.tile.enemies.some(e => e.health > 0);
});

</script>

<style scoped>
.battle-enemy-tile {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  image-rendering: crisp-edges;
}

.enemy-stats-hover {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(64, 27, 1, 0.51);
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
  height: 11vh;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.battle-initial-tile-view {
  will-change: transform;
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.battle-initial-tile-view:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
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

.battle-enemy-tile.dodged {
  animation: dodgeShake 0.6s ease-in-out;
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

@keyframes dodgeShake {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  60% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
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