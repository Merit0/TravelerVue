<template>
    <div class="heroTile mapTile" :style="getStyle(tile)" v-if="tile.hero && showHero" @click="showDetails(tile.hero)"></div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import { IHero } from '../abstraction/IHero';


export default {
    name: "hero-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        },
        showHero: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async showDetails(hero: IHero) {
            console.log(hero.name);
        },
        getStyle(tile: TileModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + tile.hero.imgPath) + ')',
                border: '2px solid rgb(127, 0, 255)'
            }
            return tileStyle;
        }
    }
}
</script>
<style>
.heroTile {
    background: none;
    border-radius: 50%;
    background-size: 100% 100%;
}
</style>