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
import EnemyModel from "../models/EnemyModel";
import {useShopStore} from "@/stores/shop-store";
import {LootItemModel} from "@/models/LootItemModel";
import ShopSlotsGrid from "@/components/shop-slots-grid.vue";

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
.closeShopBtn {
  position: absolute;
  top: 11%;
  right: 23%;
  width: 3vw;
  height: 3vw;
  background-image: url("/images/overlays/shop-place/shop-close-btn-image.png");
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.closeShopBtn:hover {
  transform: scale(1.1);
}

.shopOverlay {
  width: 55vw;
  height: 85vh;
  border-radius: 2rem;
  padding: 2vw;
  align-content: center;
  justify-content: center;
  background-image: url("/images/overlays/shop-place/shop-background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-top: 5vw;
}

</style>
