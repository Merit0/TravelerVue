<template>
    <section class="page">
        <HeroDetailsBar :hero="hero" v-on:player-dead="hideTiles($event)"></HeroDetailsBar>
        <Tiles :mapTiles="evilLandMap.getTiles()" v-if="tilesShown && !isDead()"></Tiles>
        <HeroDeathOverlay v-if="isDead()"></HeroDeathOverlay>
        <button @click="quitMap()" class="quit">Quit</button>  
    </section>
</template>

<script lang="ts">
import Tiles from './Tiles.vue';
import HeroDetailsBar from './HeroDetailsBar.vue';
import HeroDeathOverlay from '@/components/HeroDeathOverlay.vue'
import MapModel from '@/models/MapModel'
import { useHeroStore } from '@/stores/HeroStore'
import router from '@/router';

export default {
    components: { Tiles, HeroDetailsBar, HeroDeathOverlay },
    data() {    
        const tilesShown = true;
        const evilLandMap: MapModel = new MapModel()
        .name("Evil Lands")
        .numberOfTiles(52)
        .build();
        
        const heroStore = useHeroStore();
        const hero = heroStore.hero;

            return { evilLandMap, hero, tilesShown }
        },
    methods: {
        async quitMap() {
            router.push("/");
        },
        async hideTiles(tilesStatus: boolean) {
            console.log("hide");
            this.tilesShown = !tilesStatus;
        },
        isDead(): boolean {
            return this.hero.getHealth() <= 0? true: false;
        }
    }
}
</script>

<style>
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
align-self: center;
    margin-left: 45%; 
}
</style>