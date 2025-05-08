<template>
  <div class="globalOverlay" v-if="showOverlay">
    <div class="battlefieldOverlay">
      <div class="battleArea">
        <div class="heroSide" :class="{ 'hero-hit-anim': heroWasHit }">
          <button class="escapeButton run" @click="closeBattlefield(tile)">
            🏃
          </button>
        </div>
        <div class="attackButtonContainer">
          <button class="attackButton activeBtn" @click="attackEnemy(tile)"></button>
        </div>
        <div class="enemySide">
          <battle-enemy-tile
              v-for="enemy in tile.enemies"
              :key="enemy.id"
              :enemy="enemy"
              :enemy-shown="enemyTileShown"
              :enemy-alive="enemyAlive"
              :class="{ 'enemy-hit-anim': recentlyHitEnemyIds.includes(enemy.id) }"
          />
        </div>
      </div>
      <div class="battleReporter" v-if="isAttacked && enemies.length">
        <div v-for="enemy in enemies" :key="enemy.id">
          <p class="logLine">
            <span class="pHero">{{ hero.getName() }}</span> hit
            <span class="pEnemy">{{ enemy.name }}</span> for
            {{ hero.getAttack() }} damage —
            <span class="pEnemy">{{ enemy.name }}</span>'s HP:
            {{ enemy.health }}.
          </p>
          <p v-if="enemy.health > 0" class="logLine">
            <span class="pEnemy">{{ enemy.name }}</span> hit
            <span class="pHero">{{ hero.getName() }}</span> for
            {{ enemy.attack }} damage.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import TileModel from "@/models/TileModel";
import { useHeroStore } from "@/stores/HeroStore";
import { useMapLocationStore } from "@/stores/map-location-store";
import EnemyModel from "@/models/EnemyModel";
import BattleEnemyTile from "./battle-enemy-tile.vue";

export default defineComponent({
  name: "battle-field",
  components: { BattleEnemyTile },
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    },
    showOverlay: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const heroStore = useHeroStore();
    const mapLocationStore = useMapLocationStore();
    return {
      hero: heroStore.hero,
      mapLocationStore,
      enemyTileShown: true,
      enemyAlive: true,
      isAttacked: false,
      heroWasHit: false,
      recentlyHitEnemyIds: [] as number[],
      enemies: [] as EnemyModel[]
    };
  },
  mounted() {
    this.enemies = [...this.tile.enemies];
  },
  methods: {
    async attackEnemy(tile: TileModel) {
      this.isAttacked = true;
      this.heroWasHit = false;
      this.recentlyHitEnemyIds = [];

      for (const enemy of this.enemies) {
        if (enemy.health > 0) {
          enemy.health -= this.hero.getAttack();
          this.recentlyHitEnemyIds.push(enemy.id);

          if (enemy.health <= 0) {
            await this.hero.addKilled();
          } else {
            this.hero.takeDamage(enemy.attack);
            this.heroWasHit = true;
          }
        }
      }

      this.enemies = this.enemies.filter(e => e.health > 0);
      tile.enemies = [...this.enemies];

      if (this.enemies.length === 0) {
        this.enemyAlive = false;
        tile.inBattle = false;

        tile.isEmpty = !tile.chest;
        console.warn('CHEST', tile.chest);
        this.$emit("isBattle", false);
        if (!tile.chest) {
          this.mapLocationStore.moveHero(tile);
        }
      }
    },
    async closeBattlefield(tile: TileModel) {
      tile.inBattle = false;
      if (!tile.enemies.length) {
        tile.isEmpty = true;
        tile.chest = null;
      }
      this.$emit("isBattle", false);
      await this.mapLocationStore.saveProgress(this.mapLocationStore.mapLocationName);
    },
    showEnemies() {
      this.enemies.forEach(e => {
        console.log(`[${e.name}] HP: ${e.health}, ATK: ${e.attack}`);
      });
    }
  }
});
</script>

<style scoped>
.pHero {
  color: #0800ff;
  font-weight: bold;
}

.pEnemy {
  color: #ff0000;
  font-weight: bold;
}

.battleReporter {
  width: 100%;
  max-width: 900px;
  margin: 1rem auto;
  padding: 1rem;
  background: #eee;
  border-radius: 12px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  font-size: 0.95rem;

  /* нове ↓↓↓ */
  max-height: 25vh;
  overflow-y: auto;
  scrollbar-width: thin; /* для Firefox */
}

.battleReporter::-webkit-scrollbar {
  width: 8px;
}

.battleReporter::-webkit-scrollbar-thumb {
  background-color: rgba(80, 80, 80, 0.5);
  border-radius: 4px;
}

.battleReporter::-webkit-scrollbar-track {
  background-color: transparent;
}

.logLine {
  margin-bottom: 0.5rem;
}

.battlefieldOverlay {
  position: relative;
  width: 80vw;
  height: 90vh;
  background-image: url('/images/overlays/lavaLand.jpg');
  background-color: black;
  box-shadow: 0px -3px 15px 4px rgba(255, 195, 195, 0.5);
  border-radius: 20px;
  margin: 2%;
}

.battleArea {
  width: 100%;
  height: 60vh;
  border-radius: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
}

.heroSide {
  position: relative;
  width: 30vw;
  height: 60vh;
  background-image: url('/images/overlays/battlefield/hero-side-view-500x600.png');
  background-size: cover;
  border-radius: 20px;
  padding: 1%;
}

.enemySide {
  width: 30vw;
  height: 60vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 5vw;
  background-color: rgba(95, 95, 95, 0.382);
  border-radius: 20px;
  border: 1px solid rgba(68, 0, 0, 0.292);
}

.attackButtonContainer {
  width: 10vw;
  height: 20vh;
  display: flex;
  align-items: center;
}

.attackButton {
  margin: auto;
  width: 100%;
  height: 100%;
  background-image: url('/images/overlays/battlefield/attack-btn.png');
  background-size: cover;
  outline: rgba(0, 0, 0, 0.295) solid 3px;
  border-radius: 30%;
  transition: 0.2s all;
}
.escapeButton.run {
  position: relative;
  width: 4vw;
  height: 8vh;
  font-size: 1.5vw;
  background: radial-gradient(circle at top left, #7a1f1f, #4a0d0d);
  color: #fff3e0;
  border-radius: 50%;
  border: 2px solid rgba(255, 100, 100, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4),
  inset 0 0 8px rgba(255, 180, 180, 0.2);
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.escapeButton.run:hover {
  background: radial-gradient(circle at top left, #a62a2a, #6a1a1a);
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(255, 100, 100, 0.5),
  inset 0 0 10px rgba(255, 200, 200, 0.3);
}

/* Tooltip */
.escapeButton.run .tooltipText {
  visibility: hidden;
  opacity: 0;
  width: max-content;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-align: center;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 0.8vw;
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  transition: opacity 0.2s ease;
  white-space: nowrap;
  z-index: 5;
}

.escapeButton.run:hover .tooltipText {
  visibility: visible;
  opacity: 1;
}

/* Анімація удару героя */
.hero-hit-anim {
  animation: heroHitPulse 0.4s ease;
}
@keyframes heroHitPulse {
  0% {
    transform: scale(1.1);
    filter: brightness(1.4);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

/* Анімація удару ворога */
.enemy-hit-anim {
  animation: enemyHitFlash 0.4s ease;
}
@keyframes enemyHitFlash {
  0% {
    transform: scale(1.1);
    filter: brightness(2);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}
</style>