<template>
    <button class="enemyTile mapTile" :style="{ backgroundImage: 'url(' + require('@/assets/images/' + tile.enemies[0].imgPath) + ')'}" v-if="(!tile.isTree) && tile.enemies.length != 0 && enemyAlive" :enemyAlive="enemyAlive" @click="startBattle(tile)"></button> 
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';


export default {
    name: "enemy-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        },
        enemyAlive: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    methods: {
        async startBattle(tile: TileModel) {
            tile.inBattle = true;
            this.$emit('showBattlefield', true);
        }
    }
}
</script>
<style>
.enemyTile {
    background: none;
    border: 2px solid rgb(255, 115, 0);
    border-radius: 50%;
    background-size: 100% 100%;
}
</style>