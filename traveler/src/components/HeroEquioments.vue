<template>            
    <div class="heroItemsContainer empty">
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" ></div>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" ></div>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" ></div>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" ></div>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" ></div>
        </div>
    </div>
</template>

<script lang="ts">
import { LootItemModel } from '@/models/LootItemModel';
import { useBagStore } from '@/stores/BagStore';


export default {
    name: "hero-equipment-tile",
    data() {
        const bagStore = useBagStore();
        return { bagStore };
    },
    methods: {
        getItemStyle(equipment: LootItemModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + equipment.imgPath) + ')',
            }
            return tileStyle;
        },
        async takeOffEquipment(item: LootItemModel) {
            this.bagStore.removeItem(item);
        }
    }
}

</script>

<style>
.equipmentItemArea {
    width: 85px;
    height: 85px;
    margin-left: 1%;
    margin-top: 0.1%;
    display: flex;
    align-items: center;
}

.equipmentItemImg {
    position: relative;
    width: 80px;
    height: 80px;
    background-size: 100% 100%;
    border-radius: 10%;
    background-image: url('../assets/images/actions/Double-J-Design-Origami-Colored-Pencil-Yellow-plus.256.png');
}
</style>