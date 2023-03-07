import { useHeroStore } from '../stores/HeroStore';
<template>
    <button class="healPortion" @click="useHeal(tile)" v-if="(!tile.isTree) && (tile.enemies.length === 0) && (tile.item)"></button> 
</template>

<script lang="ts">

import TileModel from '@/models/TileModel';
import { useHeroStore } from '@/stores/HeroStore';

export default {
    name: "heal-portion-tile",
    props: {
        tile: {
            type: TileModel,
            required: true
        }
    },
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        const itemShown = true;
        return { hero, itemShown };
    },
    methods: {
        async useHeal(tile: TileModel) {
            this.hero.currentHealth += tile.item.amount;
            this.hero.currentHealth = this.hero.currentHealth > this.hero.maxHealth ? this.hero.maxHealth : this.hero.currentHealth;
            this.heal = false;
            tile.item = null;
            tile.isEmpty = true;
        }
    }
}
</script>
<style>
.healPortion {
    width: 100px;
    height: 100px;
    background: none;
    border: 2px solid rgb(117, 117, 117);
    border-radius: 20%;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
    background-image: url('../assets/images/items/healSmall.png');
    background-size: 100% 100%;
}
</style>