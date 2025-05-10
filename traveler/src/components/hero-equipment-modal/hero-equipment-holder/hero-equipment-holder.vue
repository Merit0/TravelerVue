<template>
  <div class="hero-equipment-container">
    <div class="hero-slot">
      <div class="hero-image" :style="getStyle(heroImagePath)" ref="heroImage"></div>
    </div>
    <div class="hero-details-container">
      <div class="hero-details-title">Core:</div>
    </div>
    <div class="equipment-row first-equipment-row">
      <equipment-placeholder-slot
          :equipment-item="equipment.helm"
          :empty-placeholder-image="placeholderImages.helmet"
          slot-type="helm"
      >
      </equipment-placeholder-slot>
      <equipment-placeholder-slot
          :equipment-item="equipment.armor"
          :empty-placeholder-image="placeholderImages.armor"
          slot-type="armor"
      >
      </equipment-placeholder-slot>
    </div>
    <div class="equipment-row second-equipment-row">
      <equipment-placeholder-slot
          :equipment-item="equipment.shield"
          :empty-placeholder-image="placeholderImages.shield"
          slot-type="shield"
      >
      </equipment-placeholder-slot>
      <equipment-placeholder-slot
          :equipment-item="equipment.weapon"
          :empty-placeholder-image="placeholderImages.weapon"
          :move-image-move-right="String('16%')"
          slot-type="weapon"
      >
      </equipment-placeholder-slot>
    </div>
    <div class="equipment-row third-equipment-row">
      <equipment-placeholder-slot
          :equipment-item="equipment.boots"
          :empty-placeholder-image="placeholderImages.boots"
          slot-type="boots"
      >
      </equipment-placeholder-slot>
      <equipment-placeholder-slot
          :equipment-item="equipment.gloves"
          :empty-placeholder-image="placeholderImages.gloves"
          slot-type="gloves"
      >
      </equipment-placeholder-slot>
    </div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {Equipment} from "@/models/Equipment";
import {PropType} from 'vue'
import EquipmentPlaceholderSlot
  from "@/components/hero-equipment-modal/hero-equipment-holder/equipment-placeholder-slot.vue";


export default {
  name: "hero-equipment-holder",
  components: {EquipmentPlaceholderSlot},
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
    const placeholderImages: Record<string, string> = {
      helmet: 'helm-placeholder-image.png',
      armor: 'armor-placeholder-image.png',
      shield: 'shield-placeholder-image.png',
      weapon: 'sword-placeholder-image.png',
      boots: 'boots-placeholder-image.png',
      gloves: 'gloves-placeholder-image.png',
    };
    return {
      placeholderImages,
    };
  },
  methods: {
    getItemImage(equipment: LootItemModel) {
      return {
        backgroundImage: `url(${equipment.imgPath})`,
      };
    },
    getStyle(imagePath: string) {
      return {
        backgroundImage: `url(/images/heroes_150_150/${imagePath})`,
      };
    },
  }
}

</script>

<style>
@import "@/styles/inventory-style/hero-equipment-holder-style.css";
</style>