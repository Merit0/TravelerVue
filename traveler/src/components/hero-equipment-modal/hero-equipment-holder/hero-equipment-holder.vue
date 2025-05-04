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
        <div class="emptyHelmetSlotImg" v-if="equipment.helm == null"></div>
        <div class="itemBackgroundImage" :style="getSlotBackgroundStyle(equipment.helm.rarity)"
             v-if="equipment.helm != null">
          <div class="equipmentItemImg" :style="getItemImage(equipment.helm)"
               @click="takeOffEquipment(equipment.helm)"></div>
        </div>
      </div>
      <div class="equipmentSlot">
        <div class="emptyArmorSlotImg" v-if="equipment.armor == null"></div>
        <div class="itemBackgroundImage" :style="getSlotBackgroundStyle(equipment.armor.rarity)"
             v-if="equipment.armor != null">
          <div class="equipmentItemImg" :style="getItemImage(equipment.armor)"
               @click="takeOffEquipment(equipment.armor)"></div>
        </div>
      </div>
    </div>

    <div class="equipment-row second-equipment-row">
      <div class="equipmentSlot">
        <div class="emptyShieldSlotImg" v-if="equipment.shield == null"></div>
        <div class="itemBackgroundImage" :style="getSlotBackgroundStyle(equipment.shield.rarity)"
             v-if="equipment.shield != null">
          <div class="equipmentItemImg" :style="getItemImage(equipment.shield)"
               @click="takeOffEquipment(equipment.shield)"></div>
        </div>
      </div>
      <div class="equipmentSlot">
        <div class="emptyWeaponSlotImg" v-if="equipment.weapon == null"></div>
        <div class="weaponBackgroundImage" :style="getSlotBackgroundStyle(equipment.weapon.rarity)"
             v-if="equipment.weapon != null">
          <div class="equipmentItemImg" :style="getItemImage(equipment.weapon)"
               @click="takeOffEquipment(equipment.weapon)"></div>
        </div>
      </div>
    </div>

    <div class="equipment-row third-equipment-row">
      <div class="equipmentSlot">
        <div class="emptySlotImg" v-if="equipment.ring == null"></div>
      </div>
      <div class="equipmentSlot">
        <div class="emptySlotImg" v-if="equipment.boots == null"></div>
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
import {Rarity} from "@/enums/Rarity";


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
    getItemImage(equipment: LootItemModel) {
      return {
        backgroundImage: `url(${equipment.imgPath})`,
      };
    },
    getSlotBackgroundStyle(itemRarity: Rarity) {
      if (itemRarity === Rarity.LEGEND) {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(203, 149, 255, 0.5) 0%,
        rgba(207, 159, 255, 0.3) 40%,
        rgba(164, 71, 255, 0.15) 70%,
        transparent 100%
      )`
        };
      } else if (itemRarity === Rarity.MYTHIC) {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(185, 50, 100, 0.5) 0%,
        rgba(144, 40, 115, 0.35) 40%,
        rgba(90, 20, 90, 0.2) 70%,
        transparent 100%
      )`
        };
      } else if (itemRarity === Rarity.RARE) {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(123, 88, 255, 0.6) 0%,
        rgba(98, 62, 219, 0.4) 40%,
        rgba(54, 34, 129, 0.25) 70%,
        transparent 100%
      )`
        };
      } else if (itemRarity === Rarity.COMMON) {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(144, 255, 184, 0.5) 0%,
        rgba(121, 243, 171, 0.3) 40%,
        rgba(0, 193, 93, 0.15) 70%,
        transparent 100%
      )`
        };
      }
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
  gap: 5vh;
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
  top: 18%;
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
  margin-top: 7%;

}

.second-equipment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  min-width: 98%;
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
  width: 6vw;
  height: 12vh;
  background-image: url('/images/hero-inventary/slots/brown-slot.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.equipmentItemImg {
  position: relative;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-image: url('/images/bag/plus-sign-icon.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.itemBackgroundImage {
  position: relative;
  background-position: center;
  width: 80%;
  height: 80%;
  border-radius: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.weaponBackgroundImage {
  position: relative;
  background-position: center;
  width: 80%;
  height: 80%;
  border-radius: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.emptySlotImg {
  position: relative;
  background-position: center;
  width: 80%;
  height: 80%;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.emptyHelmetSlotImg {
  position: relative;
  background-position: center;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background-image: url("/images/hero-inventary/equipment-placeholder-slots/helm-placeholder-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.emptyArmorSlotImg {
  position: relative;
  background-position: center;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background-image: url("/images/hero-inventary/equipment-placeholder-slots/armor-placeholder-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.emptyShieldSlotImg {
  position: relative;
  background-position: center;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background-image: url("/images/hero-inventary/equipment-placeholder-slots/shield-placeholder-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.emptyWeaponSlotImg {
  position: relative;
  background-position: center;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  background-image: url("/images/hero-inventary/equipment-placeholder-slots/sword-placeholder-image.png");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.equipmentItemImg:hover {
  transform: scale(1.02);
  box-shadow: 0 0 10px rgba(255, 255, 200, 0.5), 0 0 20px rgba(255, 255, 255, 0.3);
  cursor: pointer;
}
</style>