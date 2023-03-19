<template>
    <button v-if="tile.isTree" class="treeTile mapTile" @click="cutTree(tile)"></button>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import { useHeroStore } from '@/stores/HeroStore';
import { useMapStore } from '../stores/MapStore';


export default {
    name: "tree-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    data() {
        const mapStore = useMapStore();
        const heroStore = useHeroStore();
        return { mapStore, heroStore };
    },
    methods: {
        async cutTree(tile: TileModel) {
            tile.isTree = false;
            if( tile.enemies.length === 0 ) {
                this.mapStore.moveHero(tile);
            }
        }
    }
}
</script>
<style>
.treeTile {
    background: none;
    border-radius: 20%;
    background-image: url('../assets/images/homePage_slotImages/tree.png');
    border: 2px solid rgb(108, 108, 108);
    background-size: 100% 100%;
}
</style>