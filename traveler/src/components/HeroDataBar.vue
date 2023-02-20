<template>
    <div class="heroStats">
        <!-- <h2 class="heroName">{{ hero.name }}</h2> -->
        <div class="heroStats">
            <div class="item">Health: {{ hero.getHealth() }}</div>
            <div class="item">Attack: {{ hero.getAttack() }}</div>
        </div>
        <div class="heroStats">
            <div class="item">Diffense: {{ hero.getDefense() }}</div>
            <div class="item">Coins: {{ hero.getCoins() }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { HeroModel } from '@/models/HeroModel';

export default {
    name: "hero-data-bar",
    props: {
        hero: {
            type: HeroModel,
            required: true
        }, 
        heroName: String
    }
}
</script>

<style>
 .heroStats {
    display: flex;
    justify-content: space-between;
 }
 .item {
    background-color:rgb(255, 213, 165);
    font-size: 30px;
    color: black;
    border: 2px solid rgb(140, 45, 18);
    border-radius: 5px;
    width: 200px;
    margin: 0.5em;
 }
 .heroName {
    color: rgb(255, 192, 192);
    -webkit-text-stroke: 1px rgb(85, 51, 0);
    font-weight: bold;
    font-size: 2.5em;
    margin: auto;
    margin-top: -295px;
}
</style>
