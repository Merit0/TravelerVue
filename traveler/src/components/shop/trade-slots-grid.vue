<template>
  <div class="tradeGridContainer">
    <div class="lootGrid">
      <div
          v-for="(item, index) in bagStore.bagItems"
          :key="index"
          class="tradeLootSlot"
          @mouseover="hoveredItem = index"
          @mouseleave="hoveredItem = null"
      >
        <img :src="item.imgPath" alt="item" class="lootItemImage"/>
        <button
            v-if="hoveredItem === index"
            class="sellButton"
            @click="confirmSell(item)"
        >
          Sell
        </button>
      </div>
    </div>
  </div>
  <confirm-purchase-modal
      :show-confirm-purchase-overlay="showConfirmModal"
      :operation-name="operationName"
      :lootItem="selectedItem"
      @closeModal="cancelSell"
  >
  </confirm-purchase-modal>
</template>

<script lang="ts">
import {LootItemModel} from "@/models/LootItemModel"
import {useHeroStore} from "@/stores/HeroStore";
import {useBagStore} from "@/stores/BagStore";
import ConfirmPurchaseModal from "@/components/shop/confirm-pusrchase-overlay.vue";

export default {
  name: "trade-slots-grid",
  components: {ConfirmPurchaseModal},
  data() {
    const heroStore = useHeroStore();
    const bagStore = useBagStore();
    let isBuyMode = true;
    let showConfirmModal = false;
    return {
      heroStore,
      isBuyMode,
      bagStore,
      hoveredItem: null as number | null,
      showConfirmModal,
      operationName: 'Sell',
      selectedItem: null as LootItemModel | null,
    };
  },
  methods: {
    confirmSell(item: LootItemModel) {
      this.selectedItem = item;
      console.log(this.selectedItem);
      this.showConfirmModal = true;
    },
    cancelSell() {
      this.selectedItem = null;
      this.showConfirmModal = false;
    }
  }
}
</script>

<style>
@import "@/styles/shop-styles/trade-slots-grid-style.css";
</style>