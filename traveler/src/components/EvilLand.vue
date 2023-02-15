<template>
    <section class="mapSection">
        <div class="map">
            <button v-for="tile in tiles" :key="tile" class="tile"></button>
        </div>
        <button @click="quitDungeon()">Quit</button>
    </section>
</template>

<script lang="ts">
import router from '@/router';
export default {
    data() {
        const tileName = "Tile";
        let tiles: string[] = new Array<string>(30); // 30 tiles required
        const size: number = tiles.length;
        for(let i = 0; i < size; i++) {
            tiles.push(tileName);
        }
        return { tiles }
    },
    methods: {
        async quitDungeon() {
            router.push("/");
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