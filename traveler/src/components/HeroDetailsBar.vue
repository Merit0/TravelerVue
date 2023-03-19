<template>
    <div class="bar">
        <div class="heroStats">
            <div class="item">
                <p class="heroDetailsText"> {{ hero.name }} </p>
            </div>
            <div class="item">
                <div class="iconImg heart"></div>
                <p class="heroDetailsText">{{ hero.currentHealth }} / {{ hero.maxHealth }}</p>
            </div>
            <div class="item">
                <div class="iconImg doubleSword"></div>
                <p class="heroDetailsText">{{ hero.attack }}</p>
            </div>
            <div class="item">
                <div class="iconImg skull"></div>
                <p class="heroDetailsText">{{ hero.kills }}</p>
            </div>
            <div class="item">
                <div class="iconImg coin"></div>
                <p class="heroDetailsText">{{ hero.coins }}</p>
            </div>
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
    background-color:rgb(255, 233, 222);
    border: 2px solid rgb(140, 45, 18);
    border-radius: 5px;
    width: 200px;
    margin: 0.5em;
    display: flex;
    justify-content: center;
 }

 .heroDetailsText {
    text-align: center;
    font-size: 25px;
    color: rgb(173, 64, 0);
    -webkit-text-stroke: 1px rgb(100, 60, 0);
    font-weight: solid;
    margin-left: 10px;
 }
 .iconImg {
    width: 35px;
    height: 35px;
    background-size: 100%, 100%;
 }

 .heart {
    background-image: url("@/assets/images/items/heart_icon.png");
 }

 .doubleSword {
    background-image: url("@/assets/images/items/double_sword.png");
 }

 .skull {
    background-image: url("@/assets/images/items/skull.png");
    background-size: 110%, 110%;
    border-radius: 100%;
 }

 .coin {
    background-image: url("@/assets/images/items/coin.png");
 }
</style>
