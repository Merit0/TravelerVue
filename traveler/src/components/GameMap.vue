<template>
        <HeroDataBar :hero="hero"></HeroDataBar>
        <div class="tilesSection">
            <map-tile v-for="mapTile in generateTiles(map.getTiles())" :key="mapTile.id" :tile="mapTile"></map-tile>
        </div>
        <button @click="quitDungeon()" class="quit">Quit</button>   
</template>

<script lang="ts">
import router from '@/router';
import MapTile from './MapTile.vue';
import HeroDataBar from './HeroDataBar.vue';
import userStore from '@/stores/User';
import heroStore from '@/stores/HeroStore'
import TileModel from '../models/TileModel';
import { MapModel } from '@/models/MapModel';

export default {
    name: "game-map",
    components: { MapTile, HeroDataBar },
    props:  {
        map: {
            type: MapModel,
            required: true
        }
    },
    data() {
        const userId: number = userStore.state.user.getId();
        heroStore.getHero(userId);
        const hero = heroStore.state.hero;
        return { userStore, hero };
    },
    methods: {
        async quitDungeon() {
            router.push("/");
        },
        generateTiles(amount: number) {
            let evilLandTiles = new Array<TileModel>(); 
            for(let i = 0; i < amount; i++) {
                evilLandTiles.push(new TileModel().setId(i));
            }
            evilLandTiles.forEach(tile => console.log(tile));
                return evilLandTiles;
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
    background-image: url('../assets/images/dungeons/lavaLand.jpg');
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

.quit{
    color:#ffb671;
    position: relative;
    width: 100px;
    height: 50px;
    background-color:rgba(255, 196, 0, 0.185);
    outline-color: rgba(0, 0, 0, 0.295);
    outline-width: 3px;
    outline-style: solid;
    border-radius:10px;
    border: 2px solid rgb(95, 64, 43);
    margin-top: 10px;
    margin-left: 900px; 
    align-self: center;
}
</style>