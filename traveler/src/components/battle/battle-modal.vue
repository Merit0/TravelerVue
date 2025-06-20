<template>
  <div class="globalOverlay" v-if="showOverlay">
    <div class="battlefieldOverlay">
      <div class="battleArea">
        <div class="heroSide" :class="{ 'hero-hit-anim': heroWasHit }">
          <button class="escapeButton" @click="closeBattlefield(tile)">
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
import {defineComponent, PropType} from "vue";
import TileModel from "@/models/TileModel";
import {useHeroStore} from "@/stores/HeroStore";
import {useMapLocationStore} from "@/stores/map-location-store";
import EnemyModel from "@/models/EnemyModel";
import BattleEnemyTile from "./battle-enemy-tile.vue";

export default defineComponent({
  name: "battlefield-modal",
  components: {BattleEnemyTile},
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

        this.$emit("isBattle", false);
        this.mapLocationStore.moveHero(tile);
      }
    },
    async closeBattlefield(tile: TileModel) {
      tile.inBattle = false;
      this.$emit("isBattle", false);
      await this.mapLocationStore.saveProgress(this.mapLocationStore.mapLocationName);
    },
  }
});
</script>

<style scoped>
@import "@/styles/battlefield-style/battlefield-overlay-stile.css";
</style>