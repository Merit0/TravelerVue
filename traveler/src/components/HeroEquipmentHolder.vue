<template>
  <div class="hero-equipment-container">
    <div class="hero-slot">
      <div class="hero-image" :style="getStyle(heroImagePath)"></div>
    </div>
    <div class="hero-details-container">
      <div class="hero-details-title">Core:</div>
    </div>
    <div class="equipment-row first-equipment-row">
      <div class="equipmentSlot">
        <div class="equipmentItemImg" v-if="equipment.helm == null"></div>
        <div class="equipmentItemImg" :style="getItemStyle(equipment.helm)" v-if="equipment.helm != null"
             @click="takeOffEquipment(equipment.helm)"></div>
      </div>
      <div class="equipmentSlot">
        <div class="equipmentItemImg" v-if="equipment.armor == null"></div>
        <div class="equipmentItemImg" :style="getItemStyle(equipment.armor)" v-if="equipment.armor != null"
             @click="takeOffEquipment(equipment.armor)"></div>
      </div>
    </div>

    <div class="equipment-row second-equipment-row">
      <div class="equipmentSlot shieldSlot">
        <div class="equipmentItemImg" v-if="equipment.shield == null"></div>
        <div class="equipmentItemImg" :style="getItemStyle(equipment.shield)" v-if="equipment.shield != null"
             @click="takeOffEquipment(equipment.shield)"></div>
      </div>
      <div class="equipmentSlot weaponSlot">
        <div class="equipmentItemImg" v-if="equipment.weapon == null"></div>
        <div class="equipmentItemImg" :style="getItemStyle(equipment.weapon)" v-if="equipment.weapon != null"
             @click="takeOffEquipment(equipment.weapon)"></div>
      </div>
    </div>

    <div class="equipment-row third-equipment-row">
      <div class="equipmentSlot">
        <div class="equipmentItemImg" v-if="equipment.ring == null"></div>
      </div>
      <div class="equipmentSlot">
        <div class="equipmentItemImg" v-if="equipment.boots == null"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ItemType} from '@/enums/ItemType';
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import {useHeroStore} from '@/stores/HeroStore';
import {Equipment} from "@/models/Equipment";
import {PropType} from 'vue'


export default {
  name: "hero-equipment-holder",
  props: {
    equipment: {
      type: Object as PropType<Equipment>,
      required: true
    },
    heroImagePath: {
      type: String,
      required: true
    }
  },
  data() {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    return {bagStore, hero};
  },
  methods: {
    getItemStyle(equipment: LootItemModel) {
      return {
        backgroundImage: `url(${equipment.imgPath})`,
      };
    },
    getStyle(imagePath: string) {
      return {
        backgroundImage: `url(/images/heroes_150_150/${imagePath})`,
      };
    },
    async takeOffEquipment(item: LootItemModel) {
      if (item.itemType === ItemType.WEAPON) {
        await this.bagStore.putIn(item);
        this.hero.attack -= this.hero.equipment.weapon.value;
        this.hero.equipment.weapon = null;
      } else if (item.itemType === ItemType.ARMOR) {
        await this.bagStore.putIn(item);
        this.hero.maxHealth -= this.hero.equipment.armor.value;
        this.hero.equipment.armor = null;
      } else if (item.itemType === ItemType.HELM) {
        await this.bagStore.putIn(item);
        this.hero.maxHealth -= this.hero.equipment.helm.value;
        this.hero.equipment.helm = null;
      } else if (item.itemType === ItemType.SHIELD) {
        await this.bagStore.putIn(item);
        this.hero.maxHealth -= this.hero.equipment.shield.value;
        this.hero.equipment.shield = null;
      }
    }
  }
}

</script>

<style>
.hero-equipment-container {
  position: absolute;
  margin-top: 8vh;
  display: flex;
  left: 0.3rem;
  flex-direction: column;
  align-items: center;
  width: 24vw;
  height: 62vh;
  gap: 6vh;
  padding: 1vh 0;
  background: radial-gradient(
      circle at center,
      #7c5339 0%,
      #6e351d 40%,
      #43270a 70%,
      #3a1406 100%
  );
  background-size: 100% 100%;
  box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.02),
  0 0 60px rgba(85, 0, 170, 0.15);
  filter: brightness(1.1) contrast(1.1);
}

.hero-details-container {
  position: absolute;
  bottom: 5vh;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  padding: 1.2vh 2vw;
  width: 20vw;
  height: 10vh;
  backdrop-filter: blur(12px);
  background: rgba(30, 10, 40, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.05);
}

.hero-details-title {
  font-size: 2vh;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
  margin-bottom: 0.5vh;
  text-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
}

.equipment-row {
  height: 10vh;
  flex-direction: row;
  padding: 0 0;
}

.hero-slot {
  position: absolute;
  top: 20%;
  width: 15vw;
  height: 25vh;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.first-equipment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  min-width: 70%;
  max-width: 100%;
  margin-top: 5%;

}

.second-equipment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  min-width: 92%;
  max-width: 100%;
}

.third-equipment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  min-width: 70%;
  max-width: 100%;
}

.equipmentSlot {
  background-size: 100% 100%;
  border-radius: 10%;
  width: 4vw;
  height: 8vh;
  background-image: url('/images/bag/empty-item-place.png');
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
  background-position: center;
  left: 2%;
  top: 8%;
  width: 90%;
  height: 90%;
  background-size: 100% 100%;
  border-radius: 10%;
  background-image: url('/images/bag/plus-sign-icon.png');
}

.equipmentSlot:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(255, 255, 200, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
</style>