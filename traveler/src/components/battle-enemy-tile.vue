<template>
    <div class="battleEnemyTile" :style="getStyle(enemy)" v-if="enemyShown && enemyAlive">
        <div class="infoBlock">
            i
            <span class="tooltipText">
                <h3>Info:</h3>
                <p>ID = {{ enemy.id }}</p>
                <p>Health = {{ enemy.health }}</p>
                <p>Attack = {{ enemy.attack }}</p>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import EnemyModel from '@/models/EnemyModel';

export default {
    name: "battle-enemy-tile",
    props: {
        enemy: {
            type: Object,
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
            if (!enemy || !enemy.imgPath) throw new Error('Enemy props missing');

            try {
                return {
                    backgroundImage: 'url(' + require('@/assets/images/' + enemy.imgPath) + ')',
                    border: `2px solid ${enemy.enemyFrameColor || 'black'}`
                };
            } catch (e) {
                console.error("Loading image error:", e);
                return {};
            }
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
    position: relative;
}

.infoBlock:hover .tooltipText {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    visibility: visible;
    background-color: rgba(255, 255, 255, 0.8);
    opacity: 1;
}

.tooltipText {
    visibility: hidden;
    font-weight: bold;
    opacity: 1;
    color: rgb(90, 66, 0);
    text-align: center;
    padding: 5px 10px;
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s;
}
</style>