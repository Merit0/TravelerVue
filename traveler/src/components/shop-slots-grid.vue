<template>
  <div class="shopGridContainer">
    <div class="lootItemsGrid">
      <shop-slot
          v-for="lootItem in shopItems"
          :key="lootItem.id"
          :loot-item="lootItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from 'vue'
import {LootItemModel} from "@/models/LootItemModel"
import ShopSlot from "@/components/shop-slot.vue"

export default {
  name: "shop-slots-grid",
  components: {ShopSlot},
  props: {
    shopItems: {
      type: Array as PropType<LootItemModel[]>,
      required: true
    },
  }
}
</script>

<style>
.lootItemsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(10px, 1.5vw, 24px);
  justify-items: center;
  align-items: center;
}

.shopGridContainer {
  width: 100%;
  height: 74vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

@media (max-width: 1024px) {
  .lootItemsGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .lootItemsGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .lootItemsGrid {
    grid-template-columns: 1fr;
  }
}

</style>