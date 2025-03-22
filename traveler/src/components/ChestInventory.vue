<template>
    <div class="chestOverlay" v-if="showChestInventory">
        <div class="chestContent">
        <button class="closeChestInventoryBtn" @click="closeChestInventory()">X</button>    
            <h1 class="title">CHEST</h1>
            <div class="chestItemsContainer">
                <chest-item-tile v-for="item in chest.items" :key="item.id" :lootItem="item"></chest-item-tile>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ChestItemTile from './ChestItemTile.vue';
import { ChestModel } from '@/models/ChestModel';
import { useChestStore } from '@/stores/ChestStore';


export default {
    name: "chest-inventory",
    components: { ChestItemTile },
    props: {
        chest: {
            type: ChestModel,
            required: true
        },
        showChestInventory: {
            type: Boolean,
            required: true
        }
    },
    data() {
        const chestStore = useChestStore();
        chestStore.isShown = true;
        return { chestStore }
    },
    methods: {
        async closeChestInventory() {
            this.$emit('chestInventory', false)
            this.chestStore.clearChest;
            this.chestStore.isShown = false;

        }
    }
}
</script>

<style>
.title {
    top: 35px;
    left: 200px;
    color: rgb(146, 66, 0);
    text-shadow: 1px 1px 2px red, 0 0 1em rgb(145, 58, 0), 0 0 0.2em rgb(0, 0, 0);
}
.chestContent {
    position: relative;
    width: 500px;
    height: 400px;
    border-radius: 20px;
    margin: auto;
    background-image: url("../assets/images/chests/chest_items_area.png");
    background-size: 100%, 100%;
    margin-top: 150px;

}

.chestOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    position: absolute;
    align-items : center;
}

.chestItemsContainer {
    margin-top: 50px;
    max-width: 410px;
    height: 270px;
    margin-left: 46px;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.closeChestInventoryBtn {
    position: absolute;
    left: 440px;
    top: 40px;
    width: 50px;
    height: 50px;
    background-color: rgb(184, 0, 61);
    border-radius: 100%;
    z-index: 1;
}
    
</style>