<template>
    <tree-tile :tile="tile"></tree-tile>
    <enemy-tile :tile="tile" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"></enemy-tile>
    <empty-tile :epmtyTile="tile.isEmpty"></empty-tile>
    <heal-portion-tile :tile="tile" ></heal-portion-tile>
    <hero-tile :tile="tile" :show-hero="showHero"></hero-tile>
    <chest-tile :tile="tile"  @chestInventory="openChestInventory($event)"></chest-tile>
    <Battlefield :showOverlay="tile.inBattle" :tile="tile" @isBattle="isBattle($event)"></Battlefield>
    <chest-inventory :chest="tile.chest" :show-chest-inventory="showChestInventory" @chestInventory="closeChestInventory(tile, $event)"></chest-inventory>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import TreeTile from '@/components/TreeTile.vue'
import EmptyTile from '@/components/EmptyTile.vue';
import HealPortionTile from './HealPortionTile.vue';
import Battlefield from '@/components/Battlefield.vue';
import { useHeroStore } from '@/stores/HeroStore'
import HeroTile from './HeroTile.vue';
import ChestTile from './ChestTile.vue';
import ChestInventory from './ChestInventory.vue';
import { useMapStore } from '../stores/MapStore';

export default {
    name: "map-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile, TreeTile, EmptyTile, Battlefield, HealPortionTile, HeroTile, ChestTile, ChestInventory},
    data() {
        const heroStore = useHeroStore();
        const mapStore = useMapStore();
        const hero = heroStore.hero;
        let enemyAlive = true;
        let showBattlefield = false;
        let showHero = true;
        let showChestInventory = false;
        
        return { enemyAlive, hero, showBattlefield, showHero, showChestInventory, mapStore }
        },
    methods: {
        async isBattle(battlefieldStatus: boolean) {
            this.showBattlefield = battlefieldStatus;
        },
        async closeChestInventory(tile: TileModel, s: boolean) {
            this.showChestInventory = s;
            tile.chest = null;
            this.mapStore.moveHero(tile);
        },
        async openChestInventory(s: boolean) {
            this.showChestInventory = s;
        }
    }
}
</script>