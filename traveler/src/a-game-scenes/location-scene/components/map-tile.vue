<template>
  <relief-tile v-if="tile.isInitial" :tile="tile"/>
  <empty-tile :tile="tile"/>
  <enemy-tile :tile="tile"/>
  <hero-map-tile v-if="tile.isHeroHere" :tile="tile" :key="tile.id + '-' + tile.isHeroHere"/>
  <camp-tile/>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/a-game-scenes/location-scene/components/enemy-tile.vue';
import ReliefTile from '@/a-game-scenes/location-scene/components/relief-tile.vue';
import EmptyTile from '@/a-game-scenes/location-scene/components/empty-tile.vue';
import {useHeroStore} from '@/stores/HeroStore';
import HeroTile from './hero-tile.vue';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';
import CampTile from "@/a-game-scenes/location-scene/components/camp-tile.vue";
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
    EnemyTile: EnemyTile,
    ReliefTile,
    EmptyTile: EmptyTile,
    HeroMapTile: HeroTile
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