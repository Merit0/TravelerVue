<template>
    <div class="heroEquipmentContainer empty">
        <div class="equipmentSlot helmetSlot">
            <div class="equipmentItemImg" v-if="equipment.helm == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.helm)" v-if="equipment.helm != null"
                @click="takeOffEquipment(equipment.helm)"></button>
        </div>
        <div class="equipmentSlot armorSlot">
            <div class="equipmentItemImg" v-if="equipment.armor == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.armor)" v-if="equipment.armor != null"
                @click="takeOffEquipment(equipment.armor)"></button>
        </div>
        <div class="equipmentSlot shieldSlot">
            <div class="equipmentItemImg" v-if="equipment.shield == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.shield)" v-if="equipment.shield != null"
                @click="takeOffEquipment(equipment.shield)"></button>
        </div>
        <div class="equipmentSlot weaponSlot">
            <div class="equipmentItemImg" v-if="equipment.weapon == null"></div>
            <button class="equipmentItemImg" :style="getItemStyle(equipment.weapon)" v-if="equipment.weapon != null"
                @click="takeOffEquipment(equipment.weapon)"></button>
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
            if (item.itemType === ItemType.WEAPON) {
                this.bagStore.putIn(item);
                this.hero.attack -= this.hero.equipment.weapon.value;
                this.hero.equipment.weapon = null;
            } else if (item.itemType === ItemType.ARMOR) {
                this.bagStore.putIn(item);
                this.hero.maxHealth -= this.hero.equipment.armor.value;
                this.hero.equipment.armor = null;
            } else if (item.itemType === ItemType.HELM) {
                this.bagStore.putIn(item);
                this.hero.maxHealth -= this.hero.equipment.helm.value;
                this.hero.equipment.helm = null;
            }
        }
    }
}

</script>

<style>
.heroEquipmentContainer {
    position: relative;
    background-size: 100% 100%;
    width: 355px;
    height: 510px;
    background-image: url('../assets/images/general/hero-equipment-holder-background.png');
    border-radius: 2%;
    top: 40px;
    left: 596px;
}

.equipmentSlot {
    position: relative;
    background-size: 100% 100%;
    border-radius: 10%;
    width: 85px;
    height: 85px;
    background-image: url('../assets/images/general/equipmentTileBackground.png');
}

.helmetSlot {
    top: 10px;
    left: 118px;
}

.armorSlot {
    top: 30px;
    left: 118px;
}

.shieldSlot {
    top: 60px;
    left: 260px;
}

.weaponSlot {
    top: 10px;
}

.equipmentItemImg {
    position: relative;
    top: 4px;
    left: 3.5px;
    width: 80px;
    height: 80px;
    background-size: 100% 100%;
    border-radius: 10%;
    background-image: url('../assets/images/actions/Double-J-Design-Origami-Colored-Pencil-Yellow-plus.256.png');
}
</style>