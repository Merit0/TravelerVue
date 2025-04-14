<template>
  <tree-tile :tile="tile"></tree-tile>
  <enemy-tile :tile="tile" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"></enemy-tile>
  <empty-tile :emptyTile="tile.isEmpty" :tile="tile"></empty-tile>
  <hero-tile :tile="tile" :show-hero="showHero"></hero-tile>
  <chest-tile :tile="tile" @chestInventory="openChestInventory($event)"></chest-tile>
  <Battlefield :showOverlay="tile.inBattle" :tile="tile" @isBattle="isBattle($event)"></Battlefield>
  <chest-inventory v-if="tile.chest" :chest="tile.chest" :show-chest-inventory="showChestInventory"
                   @chestInventory="closeChestInventory(tile, $event)"></chest-inventory>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import TreeTile from '@/components/TreeTile.vue'
import EmptyTile from '@/components/EmptyTile.vue';
import Battlefield from '@/components/Battlefield.vue';
import {useHeroStore} from '@/stores/HeroStore'
import HeroTile from './HeroTile.vue';
import ChestTile from './ChestTile.vue';
import ChestInventory from './ChestInventory.vue';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';

export default {
  name: "dungeon-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  components: {EnemyTile, TreeTile, EmptyTile, Battlefield, HeroTile, ChestTile, ChestInventory},
  data() {
    const heroStore = useHeroStore();
    const mapLocationStore = useMapLocationStore();
    const hero = heroStore.hero;
    let enemyAlive = true;
    let showBattlefield = false;
    let showHero = true;
    let showChestInventory = false;

    return {enemyAlive, hero, showBattlefield, showHero, showChestInventory, mapLocationStore}
  },
  methods: {
    async isBattle(battlefieldStatus: boolean) {
      this.showBattlefield = battlefieldStatus;
    },
    async closeChestInventory(tile: TileModel, s: boolean) {
      this.showChestInventory = s;
      tile.chest = null;
      this.mapLocationStore.moveHero(tile);
    },
    async openChestInventory(s: boolean) {
      this.showChestInventory = s;
    }
  }
}
</script>