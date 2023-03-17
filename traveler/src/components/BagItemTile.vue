<template>
    <div class="bagItemArea">
        <button class="bagItemImg" :style="getItemStyle(lootItem)" @click="wearItem(lootItem)"></button>
    </div>
</template>

<script lang="ts">
import { LootItemModel } from '@/models/LootItemModel';
import { useBagStore } from '@/stores/BagStore';


export default {
    name: "bag-item-tile",
    props: {
        lootItem: {
            type: LootItemModel,
            required: true
        }
    },
    data() {
        const bagStore = useBagStore();
        return { bagStore };
    },
    methods: {
        getItemStyle(lootItem: LootItemModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + lootItem.imgPath) + ')',
            }
            return tileStyle;
        },
        async wearItem(item: LootItemModel) {
            this.bagStore.removeItem(item);
        }
    }
}

</script>

<style>
.bagItemArea {
    width: 85px;
    height: 85px;
    margin-left: 1%;
    margin-top: 0.1%;
    display: flex;
    align-items: center;
}

.bagItemImg {
    position: relative;
    width: 80px;
    height: 80px;
    background-size: 100% 100%;
    border-radius: 10%;
}
</style>