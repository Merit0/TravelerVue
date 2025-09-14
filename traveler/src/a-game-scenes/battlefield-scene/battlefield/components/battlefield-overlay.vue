<template>
  <div class="battlefield-overlay">
    <battle-info-logger></battle-info-logger>
    <div class="battlefield-overlay-content">
      <div class="battle-area-container">
        <div class="top-bar-hero-stats">
          <div class="energy-holder">
            <div class="energy-image">
              <img src="/src/a-game-scenes/home-scene/assets/hero-properties-icons/energy-icon-image.png" alt="energy-icon-image">
            </div>
            <div class="energy-counter">{{ heroCurrentEnergy }}</div>
          </div>
          <div class="escape-button" @click="escapeBattle()"></div>
        </div>
        <battle-grid v-if="realBattleTile" :tile="realBattleTile"/>
      </div>
      <div class="battle-controls-gui">
        <div class="three-dices-container">
          <dice-roller></dice-roller>
        </div>
        <div
            class="attack-button-container"
            :style="getAttackBtnImage()"
        >
          <button
              class="attack-button"
              @click="roll"
              :disabled="diceStore.isRolling || noEnemies || noEnergy"
          >
          </button>
        </div>
      </div>
    </div>
  </div>
  <grave-treasure-inventory-overlay v-if="overlayStore.isOverlay('grave-inventory')"/>
  <confirm-escape-battle-overlay v-if="overlayStore.isOverlay('confirm-escape-battle')"></confirm-escape-battle-overlay>
</template>

<script setup lang="ts">
import {useBattleStore} from '@/stores/battle-store'
import {computed, onMounted} from 'vue'
import BattleGrid from "@/a-game-scenes/battlefield-scene/battlefield/components/battle-grid.vue";
import {useOverlayStore} from "@/stores/overlay-store";
import DiceRoller from "@/a-game-scenes/battlefield-scene/dice-roller/components/dice-roller.vue";
import {useDiceStore} from "@/stores/DiceStore";
import {useHeroStore} from "@/stores/HeroStore";
import {useMapLocationStore} from "@/stores/map-location-store";
import {useRealBattleTile} from '@/composables/useRealBattleTile';
import EnemyModel from "@/models/EnemyModel";
import GraveTreasureInventoryOverlay from "@/a-game-scenes/battlefield-scene/grave/components/grave-treasure-inventory-overlay.vue";
import ConfirmEscapeBattleOverlay from "@/a-game-scenes/battlefield-scene/battlefield/components/confirm-escape-battle-overlay.vue";
import BattleInfoLogger from "@/a-game-scenes/battlefield-scene/battle-logger/components/battle-info-logger.vue";
import TileModel from "@/models/TileModel";

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

const getAttackBtnImage = () => {
  const btnImag: string = diceStore.isRolling ? 'inactive' : 'active';
  return {
    backgroundImage: `url(/src/a-game-scenes/battlefield-scene/battlefield/assets/${btnImag}-attack-button-image.png)`,
  }
}

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

const escapeBattle = () => {
  const aliveEnemies = (battleStore.enemies ?? []).filter(
      (enemy: EnemyModel) => enemy.health > 0
  );
  try {
    if (aliveEnemies.length) {
      overlayStore.openOverlay('confirm-escape-battle');
    } else {
      battleStore.finishBattle();
      overlayStore.closeOverlay();
    }
  } catch (error) {
    console.error('Failed to handle battle escape:', error);
  }
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('dice') || '{}');
  diceStore.restoreState(saved);
});

function attackEnemies(targetsNumber: number) {
  const battleStore = useBattleStore();
  const heroStore = useHeroStore();
  const {hero} = heroStore;

  const battleTiles: TileModel[] = battleStore.tiles;
  if (!battleTiles || battleTiles.length === 0) return;

  const aliveEnemyTiles: TileModel[] = battleTiles.filter((tile: TileModel) => {
    const enemy = tile.enemies[0];
    return enemy && enemy.health > 0;
  });

  if (aliveEnemyTiles.length === 0) return;

  const targets = Math.min(targetsNumber, aliveEnemyTiles.length);

  const shuffledTiles: TileModel[] = [...aliveEnemyTiles].sort(() => Math.random() - 0.5);
  const selectedTiles: TileModel[] = shuffledTiles.slice(0, targets);
  const unSelectedTiles = shuffledTiles.slice(targets);

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
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battlefield-overlay-stile.css";

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
  border: 2px solid #ffd700;
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
  background-image: url("/src/a-game-scenes/battlefield-scene/battlefield/assets/runaway-btn-icon.png");
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
  bottom: -27%;
  width: 50%;
  height: 80%;
  background: linear-gradient(145deg, rgba(48, 16, 16, 0.63), rgba(19, 7, 7, 0.69));
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.6),
  0 4px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(80, 80, 80, 0.4);
  background-size: cover;
  background-blend-mode: overlay;

  transition: all 0.3s ease;
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
  border: 2px solid #ffa600;
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
  right: 0.8vw;
  height: 10vh;
  width: 5vw;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
</style>