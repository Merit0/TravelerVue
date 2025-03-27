<template>
        <div class="tilesSection">
            <map-tile v-for="mapTile in mapTiles" :key="mapTile.id" :tile="mapTile"></map-tile>
        </div>
</template>

<script lang="ts">
import MapTile from './MapTile.vue';
import TileModel from '../models/TileModel';
import { PropType } from 'vue';

export default {
    name: "map-tiles",
    components: { MapTile },
    props:  {
        mapTiles: {
            type: Array as PropType<TileModel[]>,
            required: true
        }
    }
}
</script>

<style>
.title {
    color: rgb(255, 60, 0);
    position: inherit;
}

.tilesSection {
    margin-top: 10px;
    height: 850px;
    background-image: url('/images/maps/lost-forest/lava-ground-background.jpg');
    background-size: 100% 100%;
    border-radius: 20px;
    border: 2px solid rgb(95, 64, 43);
    padding: 50px;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    min-width: 100vh;
}
</style>