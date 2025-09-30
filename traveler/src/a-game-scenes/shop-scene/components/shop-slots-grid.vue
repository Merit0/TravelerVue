<template>
  <div class="shopGridContainer">
    <div class="lootItemsGrid" data-testid="buy-loot-items-grid">
      <shop-slot
          v-for="lootItem in itemsList"
          :key="lootItem.id"
          :loot-item="lootItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from "@/models/LootItemModel"
import ShopSlot from "@/a-game-scenes/shop-scene/components/shop-slot.vue"
import {useShopStore} from "@/stores/shop-store";

export default {
  name: "shop-slots-grid",
  components: {ShopSlot},
  data() {
    const shopStore = useShopStore();
    shopStore.initShopItems();
    const itemsList: LootItemModel[] = shopStore.getShopItems();

    return {
      itemsList
    };
  },
}
</script>

<style>
@import "@/a-game-scenes/shop-scene/styles/shop-slots-grid-style.css";
</style>