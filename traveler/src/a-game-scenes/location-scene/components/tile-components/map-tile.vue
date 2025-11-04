<template>
  <relief-tile v-if="tile.isInitial" :tile="tile"/>
  <empty-tile v-if="isEmpty" :tile="tile"/>
  <enemy-tile :tile="tile"/>
  <hero-map-tile v-if="tile.isHeroHere" :tile="tile" :key="tile.id + '-' + tile.isHeroHere"/>
  <dungeon-tile v-if="tile.isDungeon && !tile.isInitial && !hasAliveEnemies" :tile="tile"/>
  <world-exit-tile v-if="!locationWithCamping && tile.isExit" :tile="tile"/>
  <camp-tile v-if="locationWithCamping"/>
</template>

<script lang="ts">
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model';
import EnemyTile from '@/a-game-scenes/location-scene/components/tile-components/enemy-tile.vue';
import ReliefTile from '@/a-game-scenes/location-scene/components/tile-components/relief-tile.vue';
import EmptyTile from '@/a-game-scenes/location-scene/components/tile-components/empty-tile.vue';
import DungeonTile from '@/a-game-scenes/location-scene/components/tile-components/dungeon-tile.vue';
import {useHeroStore} from '@/stores/HeroStore';
import HeroTile from './hero-tile.vue';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';
import CampTile from "@/a-game-scenes/location-scene/components/tile-components/camp-tile.vue";
import EnemyModel from "@/models/EnemyModel";
import WorldExitTile from "@/a-game-scenes/location-scene/components/tile-components/world-exit-tile.vue";

export default {
  name: 'map-tile',
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  components: {
    WorldExitTile,
    CampTile,
    EnemyTile,
    ReliefTile,
    EmptyTile,
    DungeonTile,
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
      return this.tile.enemies.find((e: EnemyModel) => e.health > 0) || null;
    },
    hasAliveEnemies(): boolean {
      return !!this.firstAliveEnemy && this.tile.enemies.length > 0;
    },
    locationWithCamping(): boolean {
      return this.mapLocationStore.withCamping;
    },
    isEmpty(): boolean {
      return !this.tile.isHeroHere &&
          !this.tile.isEnemyHere &&
          !this.tile.isInitial &&
          !this.tile.isDungeon &&
          !this.tile.isExit
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