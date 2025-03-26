<template>
    <div class="emptyMapSlot">
        <div class="testContainer">
            <div class="plusImg">
            <button class="plusButton" @click="startDungeon()"></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    name: "dungeon-tile",
    methods: {
        async startDungeon() {
            alert("comming soon")
        }
    }
}
</script>

<style>
.emptyMapSlot {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
}
.plusImg {
    width: 150px;
    height: 150px;
    background-image: url('/images/maps-page/empty-map-placeholder.png');
    background-size: 100%;
    margin-left: 6px;
    display: flex;
    align-items: center;
}
.testContainer {
    width: 160px;
    height: 170px;
    border-radius: 30px;
    background-color: rgba(128, 128, 128, 0.226);
    display: flex;
    align-items: center;
}
.plusButton {
    width: 160px;
    height: 170px;
    border-radius: 30px;
    border: none;
    background: none;
}
</style>