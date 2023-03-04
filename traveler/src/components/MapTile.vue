<template>
    <tree-tile :treeShown="tile.isTree"  @click="clearTile(tile)"></tree-tile>
    <enemy-tile :enemyShown = "(!tile.isTree) && (tile.enemies.length > 0)" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"></enemy-tile>
    <empty-tile :epmtyTile="(!tile.isTree) && (tile.enemies.length === 0)"></empty-tile> 
    <Battlefield :showOverlay="showBattlefield" :tile="tile" @isBattle="isBattle($event)" @emptyTile="hideEnemyTile($event)"></Battlefield>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import TreeTile from '@/components/TreeTile.vue'
import EmptyTile from '@/components/EmptyTile.vue';
import Battlefield from '@/components/Battlefield.vue';
import { useHeroStore } from '@/stores/HeroStore'

export default {
    name: "map-tile",
    // emits: ["change"], $emit("change", true)
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile, TreeTile, EmptyTile, Battlefield },
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
            let enemyAlive = true;
            let showBattlefield = false;
            return { enemyAlive, hero, showBattlefield }
        },
    methods: {
        async clearTile(tile: TileModel) {
            tile.isTree = false;
        },
        async hideEnemyTile(enemyTileStatus: boolean) {
            this.enemyTileShown = enemyTileStatus;
            this.emptyTileShown = true;
            this.isBattle(enemyTileStatus);
        },
        async isBattle(battlefieldStatus: boolean) {
            this.showBattlefield = battlefieldStatus;
        }
    }
}
</script>