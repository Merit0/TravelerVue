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
import ShopSlot from "@/components/shop/shop-slot.vue"

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
@import "@/styles/shop-styles/shop-slots-grid-style.css";
</style>