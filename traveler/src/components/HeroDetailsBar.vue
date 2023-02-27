<template>
    <div class="bar">
        <div class="heroStats">
            <div class="item">{{ hero.name }}</div>
            <div class="item">Health: {{ hero.health }}</div>
            <div class="item">Attack: {{ hero.attack }}</div>
            <div class="item">Kills: {{ hero.kills }}</div>
            <div class="item">Coins: {{ hero.coins }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { IHero } from '../abstraction/IHero';

export default {
    name: "hero-data-bar",
    props: {
        hero: {
            type: Object as PropType<IHero>,
            required: true
        }
    }
}
</script>

<style>
.bar {
    min-width: 100vh;
    background-color: rgba(65, 0, 0, 0.781);
    border-radius: 20px;
    border: 2px solid rgb(95, 64, 43);
}
 .heroStats {
    display: flex;
    justify-content: space-between;
 }
 .item {
    background-color:rgb(252, 195, 8);
    text-align: center;
    font-size: 25px;
    border: 2px solid rgb(140, 45, 18);
    border-radius: 5px;
    width: 200px;
    margin: 0.5em;
    color: rgb(173, 64, 0);
    -webkit-text-stroke: 1px rgb(100, 60, 0);
    font-weight: solid;
 }
</style>
