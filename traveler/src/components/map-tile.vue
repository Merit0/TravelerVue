<template>
  <relief-tile v-if="tile.isInitial" :tile="tile"/>
  <empty-tile :tile="tile"/>
  <enemy-tile :tile="tile"/>
  <hero-tile v-if="tile.isHeroHere" :tile="tile" :key="tile.id + '-' + tile.isHeroHere"/>
  <camp-tile/>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import ReliefTile from '@/components/relief-tile.vue';
import EmptyTile from '@/components/EmptyTile.vue';
import {useHeroStore} from '@/stores/HeroStore';
import HeroTile from './HeroTile.vue';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';
import CampTile from "@/components/camp-tile.vue";
import EnemyModel from "@/models/EnemyModel";

export default {
  name: 'map-tile',
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  components: {
    CampTile,
    EnemyTile,
    ReliefTile,
    EmptyTile,
    HeroTile
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