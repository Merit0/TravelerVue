import { useHeroStore } from '../stores/HeroStore';
<template>
    <button class="healPortion mapTile" @click="useHeal(tile)" v-if="(!tile.isTree && !tile.hero) && (tile.enemies.length === 0) && (tile.item)"></button> 
</template>

<script lang="ts">

import TileModel from '@/models/TileModel';
import { useHeroStore } from '@/stores/HeroStore';
import { useMapStore } from '@/stores/MapStore';

export default {
    name: "heal-portion-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    data() {
        const mapStore = useMapStore();
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        const itemShown = true;
        return { hero, itemShown, mapStore };
    },
    methods: {
        async useHeal(tile: TileModel) {
            this.hero.currentHealth += tile.item.amount;
            this.hero.currentHealth = this.hero.currentHealth > this.hero.maxHealth ? this.hero.maxHealth : this.hero.currentHealth;
            this.heal = false;
            tile.item = null;
            this.mapStore.moveHero(tile);
            // tile.isEmpty = true;
        }
    }
}
</script>
<style>
.healPortion {
    background: none;
    border: 2px solid rgb(117, 117, 117);
    border-radius: 20%;
    background-image: url('../assets/images/items/healSmall.png');
    background-size: 100% 100%;
}
</style>