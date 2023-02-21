<template>
    <section class="page">
       <GameMap :tiles="evilLandTiles"></GameMap>
    </section>
</template>

<script lang="ts">
import GameMap from './GameMap.vue';
import TileModel from '@/models/TileModel'
export default {
    components: { GameMap },
    data() {    
        let evilLandTiles = new Array<TileModel>(); 
                for(let i = 0; i < 52; i++) {
                    evilLandTiles.push(new TileModel().setId(i));
                }

            return { evilLandTiles }
        },
        // methods: { //TODO: need to use this method for tiles ceration!
        //     async generateTiles() {
        //         let evilLandTiles = new Array<TileModel>(); 
        //         for(let i = 0; i < 48; i++) {
        //             evilLandTiles.push(new TileModel().setId(i));
        //         }
        //         evilLandTiles.forEach(tile => console.log(tile));
        //             return evilLandTiles;
        //         }
        // }
    }
</script>