<template>            
    <div class="heroItemsContainer empty">
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" v-if="equipment.weapon == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.weapon)" v-if="equipment.weapon != null" @click="takeOffEquipment(equipment.weapon)"></button>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" v-if="equipment.armor == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.armor)" v-if="equipment.armor != null" @click="takeOffEquipment(equipment.armor)"></button>
        </div>
        <div class="equipmentItemArea">
            <div class="equipmentItemImg" v-if="equipment.helm == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.helm)" v-if="equipment.helm != null" @click="takeOffEquipment(equipment.helm)"></button>
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
import { ItemType } from '@/enums/ItemType';
import { Equipment } from '@/models/Equipment';
import { LootItemModel } from '@/models/LootItemModel';
import { useBagStore } from '@/stores/BagStore';
import { useHeroStore } from '@/stores/HeroStore';


export default {
    name: "hero-equipment-tile",
    props: {
        equipment: {
            type: Equipment,
            required: true
        }
    },
    data() {
        const bagStore = useBagStore();
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        return { bagStore, hero };
    },
    methods: {
        getItemStyle(equipment: LootItemModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + equipment.imgPath) + ')',
            }
            return tileStyle;
        },
        async takeOffEquipment(item: LootItemModel) {
            if( item.itemType === ItemType.WEAPON ) {
                this.bagStore.putIn(item);
                this.hero.attack -= this.hero.equipment.weapon.value;
                this.hero.equipment.weapon = null;
            } else if( item.itemType === ItemType.ARMOR ) {
                this.bagStore.putIn(item);
                this.hero.maxHealth -= this.hero.equipment.armor.value;
                this.hero.equipment.armor = null;
            } else if( item.itemType === ItemType.HELM ) {
                this.bagStore.putIn(item);
                this.hero.maxHealth -= this.hero.equipment.helm.value;
                this.hero.equipment.helm = null;
            }
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