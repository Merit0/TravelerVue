<template>
  <div class="globalOverlay" v-if="showShopOverlay">
    <div class="shopOverlay">
      <div class="closeShopBtn" @click="$emit('closeShop')"></div>
      <shop-mode-switcher v-model:isBuyMode="isBuyMode"></shop-mode-switcher>
      <shop-slots-grid v-if="isBuyMode" :shop-items="itemsList"></shop-slots-grid>
      <div v-else class="tradeGridContainer">
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
    </div>
  </div>
  <div v-if="showConfirmModal" class="confirmModal">
    <p>Sell {{ itemToSell?.name }} for {{ itemToSell?.price }} coins?</p>
    <div class="modalButtons">
      <button @click="sellItem">Confirm</button>
      <button @click="cancelSell">Cancel</button>
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

export default {
  name: "shop-overlay",
  components: {ShopModeSwitcher, ShopSlotsGrid},
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
    selectTab(tabName: string) {
      this.activeTab = tabName;
      this.isBuyMode = tabName === "buy";
    },
    confirmSell(item: LootItemModel) {
      this.itemToSell = item;
      console.log(this.itemToSell);
      this.showConfirmModal = true;
    },
    sellItem() {
      if (this.itemToSell) {
        console.log(`Sold ${this.itemToSell.name} for ${this.itemToSell.price} coins!`);
        this.heroStore.collect(this.itemToSell.price);
        this.bagStore.removeItem(this.itemToSell.id);
        this.itemToSell = null;
      }
      this.showConfirmModal = false;
    },
    cancelSell() {
      this.itemToSell = null;
      this.showConfirmModal = false;
    }
  },
};
</script>

<style>
@import "@/styles/shop-styles/shop-modal-style.css";

.lootGrid {
  display: grid;
  grid-template-columns: repeat(8, 10vh);
  grid-template-rows: repeat(4, 10vh);
  margin-top: 5vh;
  margin-left: 8vh;
}

.tradeLootSlot {
  position: relative;
  background-size: cover;
  background-image: url("/images/overlays/shop-place/shop-inventory-frame-image.png");
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
}

.lootItemImage {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tradeGridContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.sellButton {
  position: absolute;
  top: 10%;
  right: 10%;
  background: rgba(255, 60, 60, 0.9);
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tradeLootSlot:hover .sellButton {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.sellButton:hover {
  box-shadow: 0 0 10px rgba(255, 60, 60, 0.8), 0 0 20px rgba(255, 60, 60, 0.6);
  background: rgba(255, 80, 80, 1);
}

.confirmModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(20, 20, 20, 0.95);
  padding: 2rem;
  border-radius: 1rem;
  color: white;
  text-align: center;
  z-index: 999;
}

.modalButtons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
