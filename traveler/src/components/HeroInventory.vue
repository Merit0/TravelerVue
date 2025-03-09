<template>
    <div class="inventoryOverlay" v-if="showInventory">
        <div class="inventoryContent">
            <button class="closeInventoryBtn" @click="$emit('heroInventory', false)">X</button>    
            <div class="inventoryItemsContainer">
                <BagItemTile v-for="bagItem in bagItems" :key="bagItem.id" :lootItem="bagItem"/>
            </div>
            <HeroEquioments :equipment="hero.equipment"/>
        </div>
    </div>
</template>

<script lang="ts">
import { LootItemModel } from '@/models/LootItemModel';
import BagItemTile from '@/components/bag/bag-item-tile.vue';
import { useBagStore } from '@/stores/BagStore';
import HeroEquioments from '@/components/HeroEquioments.vue'
import { useHeroStore } from '@/stores/HeroStore';


export default {
    name: "hero-inventory",
    components: { BagItemTile, HeroEquioments },
    props: {
        showInventory: {
            type: Boolean,
            required: true
        }
    },
    data() {
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        const bagStore = useBagStore();
        const bagItems: LootItemModel[] = bagStore.bagItems;

        return { bagItems, hero };
    }
}
</script>

<style>
.heroItemsContainer {
    margin-top: 40px;
    position: relative;
    width: 510px;
    height: 110px;
    background-color: rgba(255, 251, 0, 0.16);
    top: 100px;
    left: 80px;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
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
    height: 305px;
    top: 100px;
    left: 80px;
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(5, minmax(100px, 110px));
    grid-template-rows: repeat(3, minmax(100px, 100px));
    gap: 5px;
    max-width: 520px;
    padding: 6px;
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