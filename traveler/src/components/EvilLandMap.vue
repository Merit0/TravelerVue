<template>
    <section class="page">
        <title>EvilLand</title>
        <HeroDetailsBar :hero="hero"></HeroDetailsBar>
        <Tiles :mapTiles="tiles" v-if="tilesShown && heroStore.isAlive()"></Tiles>
        <HeroDeathOverlay v-if="!heroStore.isAlive()"></HeroDeathOverlay>
        <hero-inventory :show-inventory="heroStore.inventoryShown" @heroInventory="closeInventory($event)"></hero-inventory>
        <button @click="quitMap()" class="quit">Escape</button> 
    </section>
</template>

<script lang="ts">
import Tiles from './Tiles.vue';
import HeroDetailsBar from './HeroDetailsBar.vue';
import HeroDeathOverlay from '@/components/HeroDeathOverlay.vue'
import { useHeroStore } from '@/stores/HeroStore'
import router from '@/router';
import { useMapStore } from '../stores/MapStore';
import MapModel from '../models/MapModel';
import HeroInventory from './HeroInventory.vue';
import { MapProvider } from '../providers/MapProvider';

export default {
    components: { Tiles, HeroDetailsBar, HeroDeathOverlay, HeroInventory },
    data() {    
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        const tilesShown = true;
        const mapStore = useMapStore();
        const evilLand: MapModel = MapProvider.getEvilLand();
        evilLand.setHero(hero);
        mapStore.buildMap(evilLand);
        const tiles = mapStore.tiles;

            return { tiles, hero, tilesShown, heroStore, mapStore }
        },
    methods: {
        async quitMap() {
            if(this.mapStore.isMapCleared) {
                this.mapStore.isCleared = this.mapStore.isMapCleared;
            }
            router.push("/");
        },
        async closeInventory(invenoryStatus: boolean) {
            this.heroStore.showInventory(invenoryStatus);
        },
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