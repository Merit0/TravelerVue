<template>
    <section class="mapSection">
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
                for(let i = 0; i < 48; i++) {
                    evilLandTiles.push(new TileModel().setId(i));
                }
                evilLandTiles.forEach(tile => console.log(tile));
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

<style>
.mapSection {
    padding: 40px;
    background-color: rgba(0, 0, 0, 0.896);
}
.map {
    width: 1840px;
    height: 800px;
    background-image: url('../assets/images/dungeons/lavaLand.jpg');
    background-size: 100% 100%;
    border-radius: 2%;
    border: 1px solid rgb(119, 46, 0);
    padding: 50px;
    display: inline-flex;
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.map .tile {
    vertical-align: text-bottom;
}
.quit {
    position: fixed;
}
</style>