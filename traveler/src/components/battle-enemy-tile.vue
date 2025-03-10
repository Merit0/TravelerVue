<template>
    <div class="battleEnemyTile" :style="getStyle(enemy)" v-if="enemyShown && enemyAlive">
        <div class="infoBlock">
            <span class="tooltip-text">I am</span>
        </div>
    </div>
</template>

<script lang="ts">
import EnemyModel from '@/models/EnemyModel';

export default {
    name: "battle-enemy-tile",
    props: {
        enemy: {
            type: EnemyModel,
            required: true
        },
        enemyShown: {
            type: Boolean,
            default: false
        },
        enemyAlive: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getStyle(enemy: EnemyModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + enemy.imgPath) + ')',
                border: '2px solid ' + enemy.enemyFrameColor
            }
            return tileStyle;
        }
    }
}
</script>
<style>
.battleEnemyTile {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    background: none;
    border-radius: 50%;
    background-size: 100% 100%;
}

.infoBlock:hover{
    width: 100px;
    height: 100px;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    opacity: 1;
}

.tooltip-text {
    width: 100px;
    height: 100px;
    visibility: visible;
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    padding: 5px 10px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    /* Position above the infoBlock */
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s;
}
</style>