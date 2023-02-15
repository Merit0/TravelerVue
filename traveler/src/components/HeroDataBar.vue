<template>
    <div class="heroStats">
            <div class="heroStats">
                <div class="item">Health: {{ heroStore.state.hero.getHealth() }}</div>
                <div class="item">Attack: {{ heroStore.state.hero.getAttack() }}</div>
            </div>
            <div class="heroStats">
                <div class="item">Diffense: {{ heroStore.state.hero.getDefense() }}</div>
                <div class="item">Coins: {{ heroStore.state.hero.getCoins() }}</div>
            </div>
        </div>
</template>

<script lang="ts">
import heroStore from '@/stores/HeroStore'
import userStore from '@/stores/User';

export default {
    data() {
        const userId: number = userStore.state.user.getId();
        heroStore.getHero(userId);

        return { heroStore}
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
