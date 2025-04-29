<template>
  <div class="globalOverlay" v-if="showShopOverlay">
    <div class="shopOverlay">
      <div class="closeShopBtn" @click="$emit('closeShop')"></div>
      <shop-mode-switcher v-model:isBuyMode="isBuyMode"></shop-mode-switcher>
      <shop-slots-grid v-if="isBuyMode" :shop-items="itemsList"></shop-slots-grid>
      <trade-slots-grid v-else></trade-slots-grid>
    </div>
  </div>
</template>

<script lang="ts">
import {useHeroStore} from "@/stores/HeroStore";
import {useShopStore} from "@/stores/shop-store";
import {LootItemModel} from "@/models/LootItemModel";
import ShopSlotsGrid from "@/components/shop/shop-slots-grid.vue";
import {useBagStore} from "@/stores/BagStore";
import ShopModeSwitcher from "@/components/shop/shop-mode-switcher.vue";
import TradeSlotsGrid from "@/components/shop/trade-slots-grid.vue";

export default {
  name: "shop-overlay",
  components: {TradeSlotsGrid, ShopModeSwitcher, ShopSlotsGrid},
  emits: ['closeShop'],
  props: {
    showShopOverlay: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    const heroStore = useHeroStore();
    const shopStore = useShopStore();
    const bagStore = useBagStore();
    shopStore.initShopItems();
    const itemsList: LootItemModel[] = shopStore.getShopItems();
    let isBuyMode = true;
    const hoveredItem: LootItemModel = null;
    let itemToSell: LootItemModel = null;
    let showConfirmModal = false;
    return {
      itemsList,
      heroStore,
      isBuyMode,
      bagStore,
      hoveredItem,
      showConfirmModal,
      itemToSell
    };
  },
  methods: {
    async closeShop() {
      this.showShop = false;
    },
    // confirmSell(item: LootItemModel) {
    //   this.itemToSell = item;
    //   console.log(this.itemToSell);
    //   this.showConfirmModal = true;
    // },
    // sellItem() {
    //   if (this.itemToSell) {
    //     console.log(`Sold ${this.itemToSell.name} for ${this.itemToSell.price} coins!`);
    //     this.heroStore.collect(this.itemToSell.price);
    //     this.bagStore.removeItem(this.itemToSell.id);
    //     this.itemToSell = null;
    //   }
    //   this.showConfirmModal = false;
    // },
    // cancelSell() {
    //   this.itemToSell = null;
    //   this.showConfirmModal = false;
    // }
  },
};
</script>

<style>
@import "@/styles/shop-styles/shop-modal-style.css";
</style>
