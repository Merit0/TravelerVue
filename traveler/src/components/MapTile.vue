<template>
    <tree-tile :treeShown="treeTileShown"  @click="clearTile(tile)"></tree-tile>
    <enemy-tile :enemyShown = "enemyTileShown" :enemyAlive="enemyAlive" @showBattlefield="isBattle($event)"></enemy-tile>
    <empty-tile v-model:epmtyTile="emptyTileShown"></empty-tile> 
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
            let treeTileShown = true;
            let enemyTileShown = false;
            let emptyTileShown = false;
            let enemyAlive = true;
            let showBattlefield = false;
            return { treeTileShown, enemyTileShown, emptyTileShown, enemyAlive, hero, showBattlefield }
        },
    methods: {
        async clearTile(tile: TileModel) {
            this.treeTileShown = false;
               if(tile.getEnemies()) {
                    this.enemyTileShown = true;
               } else {
                    this.emptyTileShown = true;
               }
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