<template>
  <div class="globalOverlay" v-if="showShopOverlay">
    <div class="shopOverlay" data-testid="shop-overlay">
      <div class="closeShopBtn" @click="$emit('closeShop')"></div>
      <shop-mode-switcher v-model:isBuyMode="isBuyMode"></shop-mode-switcher>
      <shop-slots-grid v-if="isBuyMode"></shop-slots-grid>
      <trade-slots-grid v-else></trade-slots-grid>
    </div>
  </div>
</template>

<script lang="ts">
import ShopSlotsGrid from "@/components/shop/shop-slots-grid.vue";
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
    let isBuyMode = true;
    return {
      isBuyMode,
    };
  },
  methods: {
    async closeShop() {
      this.showShop = false;
    },
  },
};
</script>

<style>
@import "@/styles/shop-styles/shop-modal-style.css";
</style>
