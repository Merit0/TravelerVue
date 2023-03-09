<template>
    <button v-if="tile.isTree" class="treeTile" @click="cutTree(tile)"></button>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';


export default {
    name: "tree-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    methods: {
        async cutTree(tile: TileModel) {
            tile.isTree = false;
            if(tile.enemies.length === 0 && !tile.item) {
                tile.isEmpty = true;
            }
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