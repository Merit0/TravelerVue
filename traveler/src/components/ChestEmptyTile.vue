import { LootItemModel } from '../models/LootItemModel';
<template>
    <div class="chestItemArea">
        <button class="chestItemImg"></button>
    </div>
</template>

<script lang="ts">
import { LootItemModel } from '@/models/LootItemModel';


export default {
    name: "chest-item-tile",
    props: {
        lootItem: {
            type: LootItemModel,
            required: true
        }
    }
}

</script>

<style>
.chestItemArea {
    width: 110px;
    height: 110px;
    margin: auto;
    display: flex;
    align-items: center;
    background-image: url("/images/chests/chest_item_area_orange.png");
    background-size: 100% 100%;
}
</style>