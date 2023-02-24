<template>
    <section class="page">
        <HeroDataBar :hero="hero"></HeroDataBar>
        <GameMap :mapTiles="evilLandMap.getTiles()"></GameMap>
    </section>
</template>

<script lang="ts">
import GameMap from './GameMap.vue';
import HeroDataBar from './HeroDataBar.vue';
import MapModel from '@/models/MapModel'
import { useHeroStore } from '@/stores/PiniaHeroStore';

export default {
    components: { GameMap, HeroDataBar },
    data() {    
            const evilLandMap: MapModel = new MapModel()
                .name("Evil Lands")
                .numberOfTiles(52)
                .build();

            const heroStore = useHeroStore();
            const hero = heroStore.hero;

            return { evilLandMap, hero }
        }
    }
</script>