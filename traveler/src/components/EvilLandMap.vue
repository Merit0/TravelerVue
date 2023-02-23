<template>
    <section class="page">
       <GameMap :map="evilLandMap"></GameMap>
    </section>
</template>

<script lang="ts">
import GameMap from './GameMap.vue';
import MapModel from '@/models/MapModel'

export default {
    components: { GameMap },
    data() {    
        const evilLandMap = new MapModel()
            .name("Evil Lands")
            .tiles(52)
            .build();
        return { evilLandMap }
        }
    }
</script>