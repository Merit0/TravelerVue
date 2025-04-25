<template>
  <div class="bagItemArea">
    <div class="bagItemImg" :style="getItemStyle(lootItem)" @click="useItem(lootItem)"></div>
  </div>
</template>

<script lang="ts">
import {ItemType} from '@/enums/ItemType';
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import {useHeroStore} from '@/stores/HeroStore';
import {PropType} from 'vue';


export default {
  name: "BagItemTile",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  data() {
    const bagStore = useBagStore();
    const hero = useHeroStore().hero;
    return {bagStore, hero};
  },
  methods: {
    getItemStyle(lootItem: LootItemModel) {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
      }
    },
    async useItem(item: LootItemModel) {
      if (item.itemType === ItemType.WEAPON) {
        if (this.hero.equipment.weapon != null) {
          this.bagStore.removeItem(item);
          this.hero.attack -= this.hero.equipment.weapon.value;
          this.bagStore.putIn(this.hero.equipment.weapon);
          this.hero.equipment.weapon = item;
          this.hero.attack += this.hero.equipment.weapon.value;
          return true;
        } else if (this.hero.equipment.weapon == null) {
          this.bagStore.removeItem(item);
          this.hero.equipment.weapon = item;
          this.hero.attack += this.hero.equipment.weapon.value;
          return true;
        }
      } else if (item.itemType === ItemType.ARMOR) {
        if (this.hero.equipment.armor != null) {
          this.bagStore.removeItem(item);
          this.hero.maxHealth -= this.hero.equipment.armor.value;
          this.bagStore.putIn(this.hero.equipment.armor);
          this.hero.equipment.armor = item;
          this.hero.maxHealth += this.hero.equipment.armor.value;

          return true;
        } else if (this.hero.equipment.armor == null) {
          this.bagStore.removeItem(item);
          this.hero.equipment.armor = item;
          this.hero.maxHealth += this.hero.equipment.armor.value;
          return true;
        }
      } else if (item.itemType === ItemType.HEAL) {
        if (item.value < this.hero.maxHealth - this.hero.currentHealth) {
          this.hero.currentHealth += item.value;
        } else {
          this.hero.currentHealth = this.hero.maxHealth;
        }
        this.bagStore.removeItem(item);
      } else if (item.itemType === ItemType.HELM) {
        if (this.hero.equipment.helm != null) {
          this.bagStore.removeItem(item);
          this.hero.maxHealth -= this.hero.equipment.helm.value;
          this.bagStore.putIn(this.hero.equipment.helm);
          this.hero.equipment.helm = item;
          this.hero.maxHealth += this.hero.equipment.helm.value;

          return true;
        } else if (this.hero.equipment.helm == null) {
          this.bagStore.removeItem(item);
          this.hero.equipment.helm = item;
          this.hero.maxHealth += this.hero.equipment.helm.value;
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
  margin-top: 0.1%;
  display: flex;
  align-items: center;
  border-radius: 0.5vw;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1);
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.bagItemImg {
  position: relative;
  width: 90%;
  height: 90%;
  border-radius: 10%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.2s ease;
}

.bagItemImg:active {
  transform: scale(0.95);
  filter: brightness(1.2);
}

.bagItemArea:hover {
  box-shadow: 0 0 10px rgba(255, 174, 0, 0.6);
  transform: scale(1.05);
  cursor: pointer;
}
</style>