<template>
    <section class="mapSection">
        <div class="map">
            <button class="tile" v-for="tile in tiles" :key="tile.id" v-bind:id="'' + tile.id" @click="clearTile(tile)"></button>
        </div>
        <button @click="quitDungeon()">Quit</button>
    </section>
</template>

<script lang="ts">
import router from '@/router';
import TileModel from '@/models/TileModel'
export default {

    data() {
        let isTileHidden = false;
        let tiles = new Array<TileModel>(); // 45 tiles required
        for(let i = 0; i < 48; i++) {
            tiles.push(new TileModel().setId(i));
        }
        return { tiles, isTileHidden }
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
                console.log("hidden");
            }
        }
    }
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

.map .tile {
    vertical-align: text-bottom;
}
.quit {
    position: fixed;
}
</style>