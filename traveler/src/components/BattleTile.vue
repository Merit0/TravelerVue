<template>
    <button class="battleTile" v-if="enemyShown && enemyAlive"></button>
</template>

<script lang="ts">
export default {
    name: "enemy-tile",
    props: {
        enemyShown: {
            type: Boolean,
            default: false
        },
        enemyAlive: {
            type: Boolean,
            default: false
        }
    },
}
</script>
<style>
.enemyTile {
    width: 100px;
    height: 100px;
    background: none;
    border: 2px solid rgb(255, 115, 0);
    border-radius: 50%;
    margin-left: 2%;
    display: inline-flex;
    align-items: flex-end;
    background-image: url('../assets/images/enemies/twoEnemies.png');
    background-size: 100% 100%;
}
</style>