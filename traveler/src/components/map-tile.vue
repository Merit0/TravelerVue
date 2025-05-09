<template>
  <relief-tile :tile="tile"/>
  <enemy-tile :tile="tile" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"/>
  <empty-tile :emptyTile="tile.isEmpty" :tile="tile"/>
  <hero-tile :tile="tile" :show-hero="tile.isHeroHere" :key="tile.id + '-' + tile.isHeroHere"/>
  <chest-tile :tile="tile" @chestInventory="openChestInventory($event)"/>
  <chest-inventory
      v-if="tile.chest"
      :chest="tile.chest"
      :show-chest-inventory="showChestInventory"
      @chestInventory="closeChestInventory(tile, $event)"
  />
  <battlefield :showOverlay="tile.inBattle" :tile="tile" @isBattle="isBattle($event)"/>
  <camp-tile/>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import ReliefTile from '@/components/relief-tile.vue';
import EmptyTile from '@/components/EmptyTile.vue';
import Battlefield from '@/components/battlefield.vue';
import {useHeroStore} from '@/stores/HeroStore';
import HeroTile from './HeroTile.vue';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';
import ChestInventory from '@/components/chest-inventory.vue';
import ChestTile from '@/components/chest-tile.vue';
import CampTile from "@/components/camp-tile.vue";

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
    ChestTile,
    ChestInventory,
    EnemyTile,
    ReliefTile,
    EmptyTile,
    Battlefield,
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
      showBattlefield: false,
      showChestInventory: false,
      enemyAlive: true
    };
  },
  methods: {
    isBattle(status: boolean) {
      this.showBattlefield = status;
    },
    openChestInventory(status: boolean) {
      this.showChestInventory = status;
    },
    closeChestInventory(tile: TileModel, status: boolean) {
      this.showChestInventory = status;
      tile.chest = null;
      this.moveHeroTo(tile);
    },
    moveHeroTo(targetTile: TileModel) {
      const currentTile: TileModel = this.hero.currentTile;
      if (currentTile) {
        currentTile.isHeroHere = false;
        currentTile.isEmpty = true;
      }
      targetTile.isHeroHere = true;
      targetTile.isEmpty = false;
      this.hero.currentTile = targetTile;
      this.hero.heroLocation = targetTile.coordinates;
      this.mapLocationStore.calculateReachableTiles(targetTile, this.mapLocationStore.tiles);
      this.heroStore.persistHeroLocation();
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