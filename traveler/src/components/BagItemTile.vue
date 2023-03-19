<template>
    <div class="bagItemArea">
        <button class="bagItemImg" :style="getItemStyle(lootItem)" @click="useItem(lootItem)"></button>
    </div>
</template>

<script lang="ts">
import { ItemType } from '@/enums/ItemType';
import { LootItemModel } from '@/models/LootItemModel';
import { useBagStore } from '@/stores/BagStore';
import { useHeroStore } from '@/stores/HeroStore';


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
        const hero = useHeroStore().hero;
        return { bagStore, hero };
    },
    methods: {
        getItemStyle(lootItem: LootItemModel) {
            const tileStyle = {
                backgroundImage: 'url(' + require('@/assets/images/' + lootItem.imgPath) + ')',
            }
            return tileStyle;
        },
        async useItem(item: LootItemModel) {
            if(item.itemType === ItemType.WEAPON) {
                if(this.hero.equipment.weapon != null) {
                    this.bagStore.removeItem(item);
                    this.hero.attack -= this.hero.equipment.weapon.value;
                    this.bagStore.putIn(this.hero.equipment.weapon);
                    this.hero.equipment.weapon = item;
                    this.hero.attack += this.hero.equipment.weapon.value;
                    return true;
                } else if (this.hero.equipment.sword == null) {
                    this.bagStore.removeItem(item);
                    this.hero.equipment.weapon = item;
                    this.hero.attack += this.hero.equipment.weapon.value;
                    return true;
                }
            } else if( item.itemType === ItemType.ARMOR ) {
                if(this.hero.equipment.armor != null) {
                    this.bagStore.removeItem(item);
                    this.hero.maxHealth -= this.hero.equipment.armor.value;
                    this.hero.currentHealth -= this.hero.equipment.armor.value;
                    this.bagStore.putIn(this.hero.equipment.armor);
                    this.hero.equipment.armor = item;
                    this.hero.maxHealth += this.hero.equipment.armor.value;
                    this.hero.currentHealth += this.hero.equipment.armor.value;
                    
                    return true;
                } else if (this.hero.equipment.armor == null) {
                    this.bagStore.removeItem(item);
                    this.hero.equipment.armor = item;
                    this.hero.maxHealth += this.hero.equipment.armor.value;
                    this.hero.currentHealth += this.hero.equipment.armor.value;
                    return true;
                }
            } else if( item.itemType === ItemType.HEAL ) {
                if(item.value < this.hero.maxHealth - this.hero.currentHealth) {
                    this.hero.currentHealth += item.value;
                } else {
                    this.hero.currentHealth = this.hero.maxHealth;
                }
                this.bagStore.removeItem(item);
            } else if( item.itemType === ItemType.HELM ) {
                if(this.hero.equipment.helm != null) {
                    this.bagStore.removeItem(item);
                    this.hero.maxHealth -= this.hero.equipment.helm.value;
                    this.hero.currentHealth -= this.hero.equipment.helm.value;
                    this.bagStore.putIn(this.hero.equipment.helm);
                    this.hero.equipment.helm = item;
                    this.hero.maxHealth += this.hero.equipment.helm.value;
                    this.hero.currentHealth += this.hero.equipment.helm.value;
                    
                    return true;
                } else if (this.hero.equipment.helm == null) {
                    this.bagStore.removeItem(item);
                    this.hero.equipment.helm = item;
                    this.hero.maxHealth += this.hero.equipment.helm.value;
                    this.hero.currentHealth += this.hero.equipment.helm.value;
                    return true;
                }
            }
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