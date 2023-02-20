<template>
    <button v-if="treeTileShown" class="tile" v-bind:id="'' + tile.id" @click="clearTile(tile)"></button>
    <enemy-tile :tile="tile" v-if="enemyTileShown" v-bind:id="'' + tile.id"></enemy-tile>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import EnemyTile from '@/components/EnemyTile.vue'
export default {
    name: "map-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    components: { EnemyTile },
    data() {
            let treeTileShown = true;
            let enemyTileShown = false;
            return { treeTileShown, enemyTileShown }
        },
    methods: {
        async clearTile(tile: TileModel) {
           const el = document.getElementById("" + tile.id);
           if(el) {
               if(tile.getEnemy()) {
                this.treeTileShown = false;
                this.enemyTileShown = true;
               } else {
                    el.style.visibility = 'hidden';
               }
           }
        }
    }
}
</script>
<style>
.tile {
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