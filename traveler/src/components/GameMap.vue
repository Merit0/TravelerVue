<template>
     <div class="map">
        <map-tile v-for="mapTile in tiles" :key="mapTile.id" :tile="mapTile"></map-tile>
    </div>
    <button @click="quitDungeon()">Quit</button>
</template>

<script lang="ts">
import router from '@/router';
import TileModel from '@/models/TileModel'
import MapTile from './MapTile.vue';

export default {
    name: "GameMap",
    components: { MapTile },
    props:  {
        tiles: {
            type: Array,
            required: true
        }
    },
    methods: {
        async quitDungeon() {
            router.push("/");
        },
        async clearTile(tile: TileModel) {
            const el = document.getElementById("" + tile.id);
            console.log(el);
            if(el) {
                el.style.visibility = 'hidden';
            }
        }
    }
}
</script>