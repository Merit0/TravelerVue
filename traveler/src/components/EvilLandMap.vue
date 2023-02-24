<template>
    <section class="page">
        <HeroDataBar :hero="hero"></HeroDataBar>
        <GameMap :map="evilLandMap"></GameMap>
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
        const evilLandMap = new MapModel()
            .name("Evil Lands")
            .tiles(52)
            .build();

        const heroStore = useHeroStore();
        const hero = heroStore.hero;

        return { evilLandMap, hero }
        }
    }
</script>