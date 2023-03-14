<template>
    <tree-tile :tile="tile"></tree-tile>
    <enemy-tile :tile="tile" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"></enemy-tile>
    <empty-tile :epmtyTile="tile.isEmpty"></empty-tile>
    <heal-portion-tile :tile="tile" ></heal-portion-tile>
    <hero-tile :tile="tile" :show-hero="showHero"></hero-tile>
    <chest-tile :tile="tile"  @chestInventory="openChestInventory($event)"></chest-tile>
    <Battlefield :showOverlay="tile.inBattle" :tile="tile" @isBattle="isBattle($event)"></Battlefield>
    <hero-inventory :tile="tile" :show-inventory="heroStore.inventoryShown" @heroInventory="closeInventory($event)"></hero-inventory>
    <chest-inventory :tile="tile" :show-chest-inventory="showChestInventory" @chestInventory="closeChestInventory($event)"></chest-inventory>
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
import HeroInventory from '@/components/HeroInventory.vue'
import ChestTile from './ChestTile.vue';
import ChestInventory from './ChestInventory.vue';

export default {
    name: "map-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile, TreeTile, EmptyTile, Battlefield, HealPortionTile, HeroTile, HeroInventory, ChestTile, ChestInventory},
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
            let enemyAlive = true;
            let showBattlefield = false;
            let showHero = true;
            let showChestInventory = false;
            return { enemyAlive, hero, showBattlefield, showHero, heroStore, showChestInventory }
        },
    methods: {
        async isBattle(battlefieldStatus: boolean) {
            this.showBattlefield = battlefieldStatus;
        },
        async closeInventory(invenoryStatus: boolean) {
            this.heroStore.showInventory(invenoryStatus);
        },
        async closeChestInventory(s: boolean) {
            this.showChestInventory = s;
        },
        async openChestInventory(s: boolean) {
            this.showChestInventory = s;
        }
    }
}
</script>