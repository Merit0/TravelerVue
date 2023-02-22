<template>
    <tree-tile :tile="tile" v-model:treeShown="treeTileShown" @click="clearTile(tile)"></tree-tile>
    <enemy-tile :tile="tile" v-model:enemyShown="enemyTileShown" v-on:enemy-tile="hideEnemyTile($event)"></enemy-tile>
    <empty-tile v-model:epmtyTile="emptyTileShown"></empty-tile>

</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue';
import TreeTile from '@/components/TreeTile.vue'
import EmptyTile from '@/components/EmptyTile.vue';

export default {
    name: "map-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile, TreeTile, EmptyTile },
    data() {
            let treeTileShown = true;
            let enemyTileShown = false;
            let emptyTileShown = false;
            return { treeTileShown, enemyTileShown, emptyTileShown }
        },
    methods: {
        async clearTile(tile: TileModel) {
            this.treeTileShown = false;
               if(tile.getEnemy()) {
                    this.enemyTileShown = true;
               } else {
                    this.emptyTileShown = true;
               }
        },
        async hideEnemyTile(enemyTileStatus: boolean) {
            this.enemyTileShown = enemyTileStatus;
            this.emptyTileShown = true;
        }
    }
}
</script>
<style>
.treeTile {
    width: 100px;
    height: 100px;
    background: none;
    border: 2px solid rgb(108, 108, 108);
    border-radius: 20%;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
    background-image: url('../assets/images/homePage_slotImages/tree.png');
    background-size: 100% 100%;
}
</style>