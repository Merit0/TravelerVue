<template>
  <div class="bagGridContainer">
    <div class="bagInventoryGrid" data-testid="bag-inventory-slots-grid">
      <BagItemTile v-for="bagItem in bagStore.bagItems" :key="bagItem.id" :lootItem="bagItem"></BagItemTile>
      <div
          v-for="n in allSlotsNumber - bagStore.itemsNumber"
          :key="n"
          class="inventorySlotContainer"
      >
        <div class="inventoryFrameImage"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import BagItemTile from "@/components/hero-equipment-modal/bag-inventory/bag-item-tile.vue";
import {useHeroStore} from "@/stores/HeroStore";
import {useBagStore} from "@/stores/BagStore";

export default {
  name: "bag-inventory-slots-grid",
  components: {BagItemTile},
  data() {
    const heroStore = useHeroStore();
    const bagStore = useBagStore();
    return {
      heroStore,
      bagStore,
      allSlotsNumber: 25,
    };
  }
}
</script>

<style>
@import "@/styles/inventory-style/inventory-slot.css";
@import "@/styles/inventory-style/bag-inventory-grid-style.css";
</style>