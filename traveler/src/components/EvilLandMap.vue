<template>
    <section class="page">
        <HeroDetailsBar :hero="hero"></HeroDetailsBar>
        <Tiles :mapTiles="evilLandMap.getTiles()"></Tiles>
        <button @click="quitMap()" class="quit">Quit</button>  
    </section>
</template>

<script lang="ts">
import Tiles from './Tiles.vue';
import HeroDetailsBar from './HeroDetailsBar.vue';
import MapModel from '@/models/MapModel'
import { useHeroStore } from '@/stores/HeroStore'
import router from '@/router';

export default {
    components: { Tiles, HeroDetailsBar },
    data() {    
            const evilLandMap: MapModel = new MapModel()
                .name("Evil Lands")
                .numberOfTiles(52)
                .build();

            const heroStore = useHeroStore();
            const hero = heroStore.hero;

            return { evilLandMap, hero }
        },
    methods: {
        async quitMap() {
            router.push("/");
        }
    }
}
</script>