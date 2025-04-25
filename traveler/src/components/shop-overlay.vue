<template>
  <div class="globalOverlay" v-if="showShopOverlay">
    <div class="shopOverlay">
      <div class="titleContainer" >
        <span class="shopTitle">SHOP</span>
      </div>
      <button class="closeShopBtn" @click="$emit('closeShop')">X</button>
      <button class="refreshShopBtn" @click="refreshShopItems">R</button>
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
  border-radius: 50%;
  background: rgba(255, 0, 0, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 2px solid rgba(255, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  cursor: pointer;
  transition: all 0.3s ease;
}

.closeShopBtn:hover {
  background: rgba(255, 0, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.refreshShopBtn {
  position: absolute;
  top: 11%;
  left: 23vw;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  background: rgba(124, 252, 0, 0.3);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 2px solid rgba(124, 252, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 1.2vw;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refreshShopBtn:hover {
  background: rgba(124, 252, 0, 0.6);
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
}

.shopOverlay {
  width: 55vw;
  height: 85vh;
  border-radius: 2rem;
  padding: 2vw;
  background-image: url("/images/overlays/shop-place/shop-background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-top: 5vw;
}

.titleContainer {
  position: relative;
  margin-left: 42%;
  width: 9vw;
  height: 9vh;
  border-radius: 15px;
  align-content: center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
}

.shopTitle {
  font-size: 3vw;
  font-weight: bold;
  color: rgba(255, 113, 17, 0.92);
  text-shadow: 1px 1px 3px rgba(255, 154, 154, 0.8),
  0 0 10px rgba(145, 58, 0, 0.6),
  0 0 0.2em rgba(64, 27, 1, 0.9);
  position: relative;
}


@media (max-width: 600px) {
  .shopTitle {
    font-size: 5vw;
    text-shadow: 1px 1px 2px rgba(255, 154, 154, 0.8),
    0 0 8px rgba(145, 58, 0, 0.6),
    0 0 0.3em rgba(64, 27, 1, 0.9);
  }
}

@media (max-width: 1024px) {
  .shopTitle {
    font-size: 3vw;
    text-shadow: 1px 1px 3px rgba(255, 154, 154, 0.8),
    0 0 10px rgba(145, 58, 0, 0.6),
    0 0 0.2em rgba(64, 27, 1, 0.9);
  }
}

</style>
