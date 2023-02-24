<template>
    <section class="page">
        <HeroDetailsBar :hero="hero"></HeroDetailsBar>
        <GameMap :mapTiles="evilLandMap.getTiles()"></GameMap>
    </section>
</template>

<script lang="ts">
import GameMap from './Tiles.vue';
import HeroDetailsBar from './HeroDetailsBar.vue';
import MapModel from '@/models/MapModel'
import { useHeroStore } from '@/stores/HeroStore'

export default {
    components: { GameMap, HeroDetailsBar },
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