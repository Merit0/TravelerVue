<template>
  <div class="hero-podium-base-tile">
    <relief-tile v-if="tile.isInitial" :tile="tile"/>
    <hero-podium-tile v-if="tile.isHeroHere" :tile="tile" :key="tile.id + '-' + tile.isHeroHere"/>
  </div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import ReliefTile from '@/components/relief-tile.vue';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';
import EnemyModel from "@/models/EnemyModel";
import HeroPodiumTile from "@/components/hero-builder-modal/hero-podium-tile.vue";

export default {
  name: 'podium-tile',
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  components: {
    HeroPodiumTile,
    ReliefTile,
  },
  data() {
    const heroStore = useHeroStore();
    const mapLocationStore = useMapLocationStore();
    const hero = heroStore.hero;
    return {
      hero,
      heroStore,
      mapLocationStore,
      showChestInventory: false,
      enemyAlive: true
    };
  },
  computed: {
    firstAliveEnemy(): EnemyModel | null {
      return this.tile.enemies.find((e) => e.health > 0) || null;
    },
    hasAliveEnemies(): boolean {
      return !!this.firstAliveEnemy && this.tile.enemies.length > 0;
    }
  },
  mounted() {
    const savedCoords = this.hero.heroLocation;
    if (savedCoords) {
      const matchedTile = this.mapLocationStore.tiles.find(
          (t: TileModel) => t.coordinates.x === savedCoords.x && t.coordinates.y === savedCoords.y
      );
      if (matchedTile) {
        matchedTile.isHeroHere = true;
        this.hero.currentTile = matchedTile;
        this.mapLocationStore.calculateReachableTiles(matchedTile, this.mapLocationStore.tiles);
      }
    }
  }
};
</script>
<style scoped>
.hero-podium-base-tile {
  display: flex;
  align-items: center;   /* по вертикалі */
  justify-content: center; /* по горизонталі */
  position: relative; /* залишаємо для абсолютного позиціонування дітей, якщо потрібно */
  width: 100%;
  height: 100%;
}
</style>