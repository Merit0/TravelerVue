import { useHeroStore } from '../stores/HeroStore';
<template>
    <button class="chestTile mapTile" @click="$emit('chestInventory', true)" :style="getStyle()" v-if="(!tile.isTree && !tile.hero) && (tile.enemies.length === 0) && (!tile.item) && tile.chest"></button> 
</template>

<script lang="ts">

import TileModel from '@/models/TileModel';

export default {
    name: "chest-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    methods: {
        getStyle() {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + 'chests/map_chest.png') + ')',
            }
            return tileStyle;
        }
    }

}
</script>

<style>
.chestTile {
    background: none;
    border: none;
    background-size: 100% 100%;
}
</style>