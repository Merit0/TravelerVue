import { LootItemModel } from '../models/LootItemModel';
<template>
    <div class="chestItemArea">
        <button class="chestItemImg" v-if="lootItem.imgPath" :style="getItemStyle(lootItem)" @click="takeItem(lootItem)"></button>
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
    },
    data() {
        return {};
    },

    methods: {
        getItemStyle(lootItem: LootItemModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + lootItem.imgPath) + ')',
            }
            return tileStyle;
        },
        async takeItem(item: LootItemModel) {
            item.imgPath = "";
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
    background-image: url("@/assets/images/chests/chest_item_area_orange.png");
    background-size: 100% 100%;
}

.chestItemImg {
    position: relative;
    width: 84px;
    height: 84px;
    background: none;
    background-size: 100% 100%;
    border-radius: 13%;
    margin-left: 12px;
}
</style>