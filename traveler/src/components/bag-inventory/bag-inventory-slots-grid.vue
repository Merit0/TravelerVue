<template>
  <div class="bagGridContainer">
    <div class="bagInventoryGrid">
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
import {useHeroStore} from "@/stores/HeroStore";
import {useBagStore} from "@/stores/BagStore";
import BagItemTile from "@/components/bag-inventory/bag-item-tile.vue";

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
.bagInventoryGrid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 10vh);
  grid-template-rows: repeat(6, 10vh);
  margin-top: 6vw;
  gap: 0.1rem;
}

.bagGridContainer {
  position: absolute;
  top: 2%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>