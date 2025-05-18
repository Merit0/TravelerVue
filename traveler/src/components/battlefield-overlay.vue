<template>
  <div class="battlefield-overlay">
    <div class="battlefield-logger-container">
      <p>Battle-Logger:</p>
    </div>
    <div class="battlefield-overlay-content">
      <div class="top-bar-hero-stats">
        <button class="escape-button" @click="closeOverlay()">
          🏃
        </button>
      </div>
      <div class="battle-area-container">
        <battle-grid v-if="realBattleTile" :tile="realBattleTile" />
      </div>
      <div class="battle-controls-gui">
        <div class="three-dices-container">
          <dice-roller></dice-roller>
        </div>
        <div class="controls">
          <div class="attack-button-container">
            <button
                class="attack-button"
                @click="roll"
                :disabled="diceStore.isRolling || noEnemies">
              {{ diceStore.isRolling ? 'ROLLING...' : 'ROLL' }}
            </button>
          </div>
          <div class="hero-health-shield-collector-bars-container">
            <div class="health-percentage-vertical-bar">
            </div>
            <div class="shield-percentage-vertical-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBattleStore} from '@/stores/battle-store'
import {computed, onMounted} from 'vue'
import BattleGrid from "@/components/battle/battle-grid.vue";
import {useOverlayStore} from "@/stores/overlay-store";
import DiceRoller from "@/components/dice-roller/dice-roller.vue";
import {useDiceStore} from "@/stores/DiceStore";
import {useHeroStore} from "@/stores/HeroStore";
import {useMapLocationStore} from "@/stores/map-location-store";
import { useRealBattleTile } from '@/composables/useRealBattleTile';

const battleStore = useBattleStore();
const diceStore = useDiceStore();

const noEnemies = computed(() => {
  const tile = battleStore.battleTile;
  return tile?.enemies?.every(e => e.health <= 0) ?? true;
});

const { realBattleTile } = useRealBattleTile();

const roll = async () => {
  await diceStore.rollDices();
  const result: string[] = diceStore.lastResult;
  const combatFaces = result.slice(0, 3);
  const swordCount = combatFaces.filter(face => face === 'sword').length;
  if (swordCount === 3) {
    attackEnemies();
  }
};

const closeOverlay = () => {
  const overlayStore = useOverlayStore();
  const battleStore = useBattleStore();
  battleStore.finishBattle();
  overlayStore.closeOverlay();
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('dice') || '{}');
  diceStore.restoreState(saved);
});

function attackEnemies() {
  const battleStore = useBattleStore()
  const heroStore = useHeroStore()
  const mapLocationStore = useMapLocationStore()
  const { hero } = heroStore

  const enemies = battleStore.enemies
  if (!enemies || enemies.length === 0) return

  enemies.forEach(enemy => {
    enemy.health -= hero.attack
    if (enemy.health < 0) enemy.health = 0
  })

  battleStore.enemies = [...enemies]
  const tile = mapLocationStore.currentLocation?.tiles.find(t => t.id === battleStore.battleTileId);
  if (tile && tile.enemies.every(e => e.health <= 0)) {
    tile.isEnemyHere = false;
    tile.isHeroHere = false;
    tile.isInitial = false;
    tile.isChestTile = true;
  }
}

</script>

<style scoped>
@import "@/styles/battlefield-style/battlefield-overlay-stile.css";

.battlefield-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(83, 83, 83, 0.71);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.battle-area-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  background: #0800ff;
}

.battlefield-overlay-content {
  position: absolute;
  width: 30vw;
  height: 96vh;
  margin: 1%;
  background-size: cover;
  box-shadow: 0 -3px 15px 4px rgba(255, 195, 195, 0.5);
  border-radius: 20px;
  background: #4b3670;
}

.top-bar-hero-stats {
  position: relative;
  width: 100%;
  height: 4vh;
  background: #00ff33;
}

.escape-button {
  position: absolute;
  left: 0;
  top: 0;
  width: 2vw;
  height: 4vh;
  font-size: 1.5vw;
  background: radial-gradient(circle at top left, #7a1f1f, #4a0d0d);
  color: #fff3e0;
  border-radius: 50%;
  border: 2px solid rgba(255, 100, 100, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), inset 0 0 8px rgba(255, 180, 180, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  z-index: 1;
}

.escape-button:hover {
  background: radial-gradient(circle at top left, #a62a2a, #6a1a1a);
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(255, 100, 100, 0.5), inset 0 0 10px rgba(255, 200, 200, 0.3);
}

.battlefield-logger-container {
  position: relative;
  margin-top: 3%;
  margin-bottom: 3%;
  right: -45vh;
  width: 20vw;
  height: 100%;
  background: rgba(92, 49, 0, 0.28);
  border-radius: 5px;
  color: #ffe900;
  text-align: center;
  overflow-y: auto;
  z-index: 0;
}

.battle-controls-gui {
  position: absolute;
  width: 100%;
  height: 34%;
  padding: 0.1rem;
  background: #025e3e;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.three-dices-container {
  width: 100%;
  height: 40%;
  background: #373735;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.controls {
  width: 100%;
  height: 100%;
  background: #82fff0;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.hero-health-shield-collector-bars-container {
  height: 100%;
  flex: 0.2;
  background: #ffb4b4;
  border-radius: 1rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.health-percentage-vertical-bar,
.shield-percentage-vertical-bar {
  flex: 1;
  height: 100%;
  border-radius: 1rem;
}

.health-percentage-vertical-bar {
  background: #ff0000;
}

.shield-percentage-vertical-bar {
  background: #4a75ff;
}

.attack-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.attack-button {
  width: 5vw;
  height: 5vh;
  background: #bf00ff;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: 0.2s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.attack-button:hover {
  background: #a200d6;
  transform: scale(1.05);
}

.attack-button:active {
  transform: scale(0.95);
  background: #8800bb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) inset;
}

.attack-button-container {
  flex: 1;
  height: 100%;
  background: #000c5a;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>