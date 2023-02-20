<template>
    <div class="mapTiles">
            <div class="evilLandMap">
                <button @click="startDungeon()" class="mapTile"></button>
            </div>
        </div>
</template>

<script lang="ts">
import router from '@/router/index';

export default {
    name: "MapTiles",
    methods: {
        async startDungeon() {
            router.push("/evilLand");
        }
    }
}
</script>

<style>
.mapTiles {
    top: 18%;
    width: 600px;
    height: 400px;
    position: fixed;
    border-radius: 20px;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.evilLandMap {
    width: 400px;
    height: 400px;
    background-image: url('../assets/images/dungeons/homeButtons/fightFireBtn-removebg-preview.png');
    background-size: 100% 100%;
}
.mapTile {
    width: 320px;
    height: 330px;
    background: transparent;
    margin-top: 11%;
    margin-left: 11%;
    border: none;
}
</style>