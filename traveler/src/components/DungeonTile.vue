<template>
    <div class="evilLandMap" v-if="!isEmpty">
        <button @click="startDungeon()" class="buttonArea"></button>
    </div>
    <EmptyMapSlot v-if="isEmpty"></EmptyMapSlot>
</template>

<script lang="ts">
import router from '@/router/index';
import EmptyMapSlot from './EmptyMapSlot.vue';

export default {
    name: "dungeon-tile",
    components: { EmptyMapSlot },
    props: {
        isEmpty: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        async startDungeon() {
            router.push("/evilLand");
        }
    }
}
</script>

<style>
.evilLandMap {
    width: 200px;
    height: 200px;
    background-image: url('../assets/images/dungeons/homeButtons/fightFireBtn-removebg-preview.png');
    background-size: 100% 100%;
}
.buttonArea {
    width: 160px;
    height: 170px;
    background: transparent;
    margin-top: 10%;
    margin-left: 11%;
    border: none;
}
</style>