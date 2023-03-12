<template>
    <div class="inventoryOverlay" v-if="showInventory">
        <div class="inventoryContent">
            <button class="closeInventoryBtn" @click="$emit('heroInventory', false)">X</button>    
            <div class="inventoryItemsContainer">
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
                <div class="itemArea">
                    <div class="itemImg"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';


export default {
    name: "hero-inventory",
    props: {
        tile: {
            type: TileModel,
            required: true
        },
        showInventory: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style>
.inventoryContent {
    width: 1000px;
    height: 700px;
    border-radius: 20px;
    margin: auto;
    background-image: url("../assets/images/items_inventory.png");
    background-size: 100%, 100%;
    margin-top: 50px;
}

.inventoryOverlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    position: absolute;
    padding: 40px;
    display: flex-direction;
     align-items : center;
}

.inventoryItemsContainer {
    position: relative;
    width: 510px;
    height: 305px;
    top: 100px;
    left: 80px;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.itemArea {
    width: 85px;
    height: 85px;
    margin-left: 1%;
    margin-top: 0.1%;
    display: flex;
    align-items: center;
}

.itemImg {
    position: relative;
    width: 80px;
    height: 80px;
    background-image: url("@/assets/images/weapons/sword_soul_ripper.png");
    background-size: 100% 100%;
    border-radius: 10%;
}

.closeInventoryBtn {
    margin-left: 920px;
    margin-top: 20px;
    width: 50px;
    height: 50px;
    background-color: rgb(184, 0, 61);
    border-radius: 100%;
}

</style>