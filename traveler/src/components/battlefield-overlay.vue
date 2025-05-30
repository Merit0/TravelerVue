<template>
  <div class="battlefield-overlay">
    <div class="battlefield-logger-container">
      <p class="logger-title">Battle Log:</p>
      <div class="logger-list">
        <p v-for="(log, index) in battleStore.battleLog" :key="index">
          {{ log }}
        </p>
      </div>
    </div>
    <div class="battlefield-overlay-content">
      <div class="battle-area-container">
        <div class="top-bar-hero-stats">
          <div class="energy-holder">
            <div class="energy-image">
              <img src="/images/overlays/battlefield/energy-icon-image.png" alt="energy-icon-image">
            </div>
            <div class="energy-counter">{{ heroCurrentEnergy }}</div>
          </div>
          <div class="escape-button" @click="closeOverlay()"></div>
        </div>
        <battle-grid v-if="realBattleTile" :tile="realBattleTile"/>
      </div>
      <div class="battle-controls-gui">
        <div class="three-dices-container">
          <dice-roller></dice-roller>
          </div>
        <div class="attack-button-container">
          <button
              class="attack-button"
              @click="roll"
              :disabled="diceStore.isRolling || noEnemies || noEnergy"
          >
          </button>
        </div>
        <!--        <div class="controls">-->
        <!--          <div class="hero-health-shield-collector-bars-container">-->
        <!--            <div class="health-percentage-vertical-bar">-->
        <!--            </div>-->
        <!--            <div class="shield-percentage-vertical-bar"></div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
  <grave-treasure-inventory-overlay v-if="overlayStore.isOverlay('grave-inventory')"/>
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
import {useRealBattleTile} from '@/composables/useRealBattleTile';
import EnemyModel from "@/models/EnemyModel";
import GraveTreasureInventoryOverlay from "@/components/grave/grave-treasure-inventory-overlay.vue";

const battleStore = useBattleStore();
const overlayStore = useOverlayStore();
const diceStore = useDiceStore();
const heroStore = useHeroStore();

const noEnemies = computed(() => {
  const tile = battleStore.battleTile;
  return tile?.enemies?.every(e => e.health <= 0) ?? true;
});

const heroCurrentEnergy = computed(() => heroStore.hero.currentEnergy || 0);

const noEnergy = computed(() => heroStore.hero.currentEnergy <= 0);

const {realBattleTile} = useRealBattleTile();

const roll = async () => {
  const rollDiceCost = 1;
  const {hero} = heroStore;
  const currentEnemies: EnemyModel[] = battleStore.tiles.flatMap(tile => tile.enemies as EnemyModel[]);
  hero.useEnergy(1);
  if (hero.getCurrentEnergy() > rollDiceCost) {
    await diceStore.rollDices(currentEnemies);
  }
  const result: string[] = diceStore.lastResult;
  const combatFaces: string[] = result.slice(0, 3);
  const enemyCounterDiceFace: string = result[result.length - 1];

  const requestedTargetsCount = parseInt(enemyCounterDiceFace?.replace('x', '') || '1');
  const swordCount = combatFaces.filter(face => face === 'sword').length;
  const collectEnergy = combatFaces.filter(face => face === 'energy').length;

  const aliveEnemies = battleStore.enemies.filter(enemy => enemy.health > 0);

  const actualTargetsCount = Math.min(aliveEnemies.length, requestedTargetsCount);

  if (swordCount === 3) {
    attackEnemies(actualTargetsCount);
  } else if (collectEnergy === 3) {
    const energyBoostValue = 10;
    hero.collectEnergy(energyBoostValue);
    battleStore.logEvent(`ENERGY BOOST -> ${hero.name} gained ${energyBoostValue} ⚡!`);
  } else {
    const battleTiles = battleStore.tiles;
    if (!battleTiles || battleTiles.length === 0) return;

    const aliveEnemyTiles = battleTiles.filter(tile => {
      const enemy = tile.enemies[0];
      return enemy && enemy.health > 0;
    });

    if (aliveEnemyTiles.length === 0) return;

    aliveEnemyTiles.forEach(tile => {
      battleStore.triggerDodgeEffect(tile.id);
      battleStore.logEvent(`${tile.enemies[0]?.name} dodged the attack from ${hero.name}!`);
    });
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

function attackEnemies(targetsNumber: number) {
  const battleStore = useBattleStore();
  const heroStore = useHeroStore();
  const {hero} = heroStore;

  const battleTiles = battleStore.tiles;
  if (!battleTiles || battleTiles.length === 0) return;

  const aliveEnemyTiles = battleTiles.filter(tile => {
    const enemy = tile.enemies[0];
    return enemy && enemy.health > 0;
  });

  if (aliveEnemyTiles.length === 0) return;

  const targets = Math.min(targetsNumber, aliveEnemyTiles.length);

  const shuffledTiles = [...aliveEnemyTiles].sort(() => Math.random() - 0.5);
  const selectedTiles = shuffledTiles.slice(0, targets);
  const unSelectedTiles = shuffledTiles.slice(targets); // решта

  for (const tile of unSelectedTiles) {
    battleStore.triggerDodgeEffect(tile.id);
    battleStore.logEvent(`${tile.enemies[0]?.name} dodged the attack!`);
  }

  for (const tile of selectedTiles) {
    const enemy: EnemyModel = tile.enemies[0];
    if (!enemy) continue;

    enemy.health = Math.max(0, enemy.health - hero.attack);

    const percent = enemy.maxHealth > 0 ? Math.round((enemy.health / enemy.maxHealth) * 100) : 0;
    battleStore.logEvent(`${hero.name} ⚔️ ${enemy.name} for ${hero.attack}. ❤️ ${percent}% left`);

    battleStore.showDamagePopup(tile.id, hero.attack);
    battleStore.triggerBloodSplash(tile.id);

    if (enemy.health === 0) {
      battleStore.handleEnemyDeath(enemy, tile);
      battleStore.logEvent(`${enemy.name} has been defeated!`);
      hero.addKilled();
    }
  }

  updateMapTileState();
}

function updateMapTileState() {
  const battleStore = useBattleStore()
  const mapLocationStore = useMapLocationStore()

  const mapTile = mapLocationStore.currentLocation?.tiles.find(
      t => t.id === battleStore.battleTileId
  );

  if (!mapTile) return;

  const enemyDead = mapTile.enemies.every(e => e.health <= 0);
  if (enemyDead) {
    mapTile.isEnemyHere = false;
    mapTile.isHeroHere = false;
    mapTile.isInitial = false;
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
  background-color: rgba(83, 83, 83, 0.91);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.battle-area-container {
  position: relative;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-image: url("/images/overlays/battlefield/battlefield-background-image.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

.battlefield-overlay-content {
  position: absolute;
  width: 40vw;
  height: 92vh;
  background-size: cover;
}

.top-bar-hero-stats {
  position: absolute;
  top: 4vh;
  width: 36vw;
  height: 5vh;
}

.energy-holder {
  position: absolute;
  background: #1c0400;
  right: 0.5vw;
  height: 80%;
  display: flex;
  align-items: center;
  padding: 0 0.8em;
  border-radius: 0.75em;
  border: 2px solid #ffd700; /* чистий золотий */
  box-shadow: 0 0 4px rgba(255, 215, 0, 0.4),
  0 0 8px rgba(255, 215, 0, 0.6),
  0 0 12px rgba(255, 215, 0, 0.8);
  gap: 0.5em;
  z-index: 10;
  font-size: clamp(0.7rem, 1.2vh, 1rem);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.energy-holder:hover {
  transform: scale(1.05);
}

.energy-image {
  height: 70%;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.energy-image img {
  width: 180%;
  height: 180%;
  object-fit: contain;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
}

.energy-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: rgb(255, 223, 17);
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  font-size: 180%;
  font-family: 'Crimson Pro', cursive;
  line-height: 1;
}

.escape-button {
  position: absolute;
  left: 1%;
  width: 2.2vw;
  height: 90%;
  background-image: url("/images/overlays/battlefield/foots-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20%;
  cursor: pointer;
  border: 2px solid #ffd700;
  box-shadow: 0 0 4px rgba(255, 215, 0, 0.4),
  0 0 8px rgba(255, 215, 0, 0.6),
  0 0 12px rgba(255, 215, 0, 0.8);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 1;
}

.escape-button:hover {
  transform: scale(1.02);
}

.battlefield-logger-container {
  position: relative;
  margin-top: 4%;
  margin-bottom: 3%;
  right: -55vh;
  width: 18vw;
  height: 71vh;
  background: rgb(64, 27, 1);
  border-radius: 5px;
  color: #ffe900;
  text-align: left;
  padding: 1vh;
  overflow-y: auto;
  font-family: 'Crimson Pro', cursive;
  font-size: 1.4vh;
  z-index: 0;
  box-shadow: inset 0 0 5px rgb(0, 20, 115);
}

.logger-title {
  font-weight: bold;
  margin-bottom: 0.5vh;
  color: #fff300;
  font-size: 1.4vh;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-family: 'IM Fell English SC', cursive;
  text-align: center;
}

.logger-list p {
  margin: 0.2vh 0;
  animation: fadeLog 0.3s ease-in;
}

@keyframes fadeLog {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.battle-controls-gui {
  position: relative;
  top: -18%;
  left: 4%;
  width: 94%;
  height: 14%;
  padding: 0.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.three-dices-container {
  position: absolute;
  bottom: -6%;
  width: 50%;
  height: 80%;
  background: linear-gradient(145deg, rgba(48, 16, 16, 0.63), rgba(19, 7, 7, 0.69));
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  box-shadow:
      inset 0 0 8px rgba(0, 0, 0, 0.6),
      0 4px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(80, 80, 80, 0.4);
  background-size: cover;
  background-blend-mode: overlay;

  transition: all 0.3s ease;
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
  position: relative;
  background: none;
  width: 90%;
  height: 92%;
  border-radius: 1rem;
  cursor: pointer;
  border: 2px solid #ffa600; /* чистий золотий */
  box-shadow: 0 0 4px rgba(255, 145, 0, 0.4),
  0 0 8px rgba(255, 153, 0, 0.6),
  0 0 12px rgba(255, 166, 0, 0.8);
  transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.attack-button-container:hover {
  transform: scale(1.02);
}

.attack-button-container {
  position: absolute;
  right: 1vw;
  height: 10vh;
  width: 5vw;
  background-image: url("/images/overlays/battlefield/atack-buton-image.png");
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>