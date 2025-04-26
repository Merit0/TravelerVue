<template>
  <div class="globalOverlay" v-if="showShopOverlay">
    <div class="shopOverlay">
      <div class="closeShopBtn" @click="$emit('closeShop')"></div>
      <shop-slots-grid :shop-items="this.itemsList"></shop-slots-grid>
    </div>
  </div>
</template>

<script lang="ts">
import {useHeroStore} from "@/stores/HeroStore";
import EnemyModel from "../../models/EnemyModel";
import {useShopStore} from "@/stores/shop-store";
import {LootItemModel} from "@/models/LootItemModel";
import ShopSlotsGrid from "@/components/shop/shop-slots-grid.vue";

export default {
  name: "shop-overlay",
  components: {ShopSlotsGrid},
  props: {
    showShopOverlay: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const shopStore = useShopStore();
    shopStore.initShopItems();
    const itemsList: LootItemModel[] = shopStore.getShopItems();
    return {itemsList, hero};
  },
  methods: {
    async closeShop() {
      this.showShop = false;
    },
    async showEnemies() {
      this.enemies.forEach((enemy: EnemyModel) => {
        console.log(enemy.name, enemy.health);
      });
    }
  }
};
</script>

<style>
@import "@/styles/shop-styles/shop-modal-style.css";
</style>
