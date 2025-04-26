<template>
  <div class="slotContainer">
    <div class="slotBackground" :style="getSlotBackgroundStyle(lootItem.rarity)">
      <div class="slotImage">
        <img :src="lootItem.imgPath" alt="item" class="itemImage"/>
      </div>
      <div class="slotFrame">
        <div class="slotFrameImage"></div>
      </div>
      <div v-if="!this.inShop" class="soldOut">
        <span class="soldOutText">Sold Out</span>
      </div>
    </div>
    <div class="slotPriceContainer">
      <div v-if="!this.inShop" class="noInfo"></div>
      <div v-if="this.inShop" class="priceInfo">
        <div class="priceRow buyBtn" :class="{
      notEnough: !canAfford,
      canAfford: canAfford
    }" @click="handleBuy(lootItem)">
          <span  class="itemPrice">{{ lootItem.price }}</span>
          <img class="coinIcon" src="/images/top-bar-items/coin-icon.png" alt="coin-icon"/>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showConfirmPurchasePopup" class="confirmOverlay">
    <div class="confirmPopup">
      <p class="popupText">Buy <strong>{{ selectedItem.name }}</strong> for {{ selectedItem.price }}
        <img class="modalCoinIcon" src="/images/top-bar-items/coin-icon.png" alt="coin-icon"/> ?</p>
      <div class="popupActions">
        <button class="confirmBtn" @click="confirmPurchase">BUY</button>
        <button class="cancelBtn" @click="closePopup">CANCEL</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {PropType} from 'vue';
import {LootItemModel} from "@/models/LootItemModel";
import {useBagStore} from "@/stores/BagStore";
import {Rarity} from "@/enums/Rarity";

export default {
  name: "shop-slot",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  data() {
    const bagStore = useBagStore();
    let inShop = true;
    return {
      showConfirmPurchasePopup: false,
      selectedItem: null,
      bagStore,
      inShop
    }
  },
  computed: {
    canAfford(): boolean {
      return this.bagStore.getCoins >= this.lootItem.price;
    }
  },
  methods: {
    getSlotBackgroundStyle(itemRarity: Rarity) {
      if (itemRarity === Rarity.LEGEND) {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(203, 149, 255, 0.5) 0%,
        rgba(207, 159, 255, 0.3) 40%,
        rgba(164, 71, 255, 0.15) 70%,
        transparent 100%
      )`
        };
      } else {
        return {
          background: `radial-gradient(
        circle at center,
        rgba(144, 255, 184, 0.5) 0%,
        rgba(121, 243, 171, 0.3) 40%,
        rgba(0, 193, 93, 0.15) 70%,
        transparent 100%
      )`
        };
      }
    },
    openConfirmPopup(item: LootItemModel) {
      this.selectedItem = item;
      this.showConfirmPurchasePopup = true;
    },
    closePopup() {
      this.showConfirmPurchasePopup = false;
      this.selectedItem = null;
    },
    confirmPurchase() {
      this.bagStore.pay(this.selectedItem.price)
      this.selectedItem.place = "bag";
      this.bagStore.putIn(this.selectedItem);
      console.log("Куплено:", this.selectedItem);
      this.inShop = false;
      this.closePopup();
    },
    handleBuy(lootItem: LootItemModel) {
      if (!this.canAfford) return;
      if (!lootItem) {
        return
      }
      this.openConfirmPopup(lootItem);
    }
  }
}
</script>

<style>
.slotContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2vh;
  width: clamp(6vw, 20vw, 7vw);
}

.slotBackground {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.slotImage {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.itemImage {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.slotFrame {
  position: absolute;
  width: 17vw;
  height: 17vh;
  z-index: 1;
  pointer-events: none;
}

.soldOut {
  position: absolute;
  width: 8vw;
  height: 4vh;
  z-index: 2;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(39, 37, 37, 0.9);
  border-radius: 2%;
}

.soldOutText {
  color: #ff4d4d;
  text-shadow: 0 0 6px rgba(255, 77, 77, 0.8);
  font-weight: 700;
  font-size: 1vw;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
}


.slotFrameImage {
  width: 100%;
  height: 100%;
  background-image: url("/images/overlays/shop-place/shop-item-frame.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.slotPriceContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vh;
  z-index: 2;
}

.priceInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}

.noInfo {
  width: 5vw;
  height: 4vh;
  display: flex;
  align-items: center;
  gap: 0.2vw;
}

.priceRow {
  width: 5vw;
  height: 4vh;
  display: flex;
  align-items: center;
  gap: 0.2vw;
}

.itemPrice {
  color: gold;
  font-size: clamp(1vw, 2vw, 1vw);
  font-weight: bold;
}

.coinIcon {
  width: clamp(1vw, 2vw, 1vw);
  height: clamp(1vw, 2vw, 1vw);
  object-fit: contain;
}

.modalCoinIcon {
  width: clamp(1.3vw, 2vw, 18px);
  height: clamp(1.3vw, 2vw, 18px);
  object-fit: contain;
}

.buyBtn {
  background: rgb(43, 37, 37);
  border: 2px solid #ffaa00;
  padding: 0.4em 0.8em;
  border-radius: 1vh;
  font-weight: bold;
  font-size: clamp(14px, 1vw, 16px);
  cursor: pointer;
  transition: 0.3s;
}

.buyBtn.notEnough {
  border-color: rgba(255, 0, 0, 0.5);
  color: rgba(255, 0, 0, 0.6);
  cursor: not-allowed;
}

.buyBtn.notEnough:hover {
  background: rgba(117, 0, 0, 0.48);
  transform: none;
}

.buyBtn.canAfford:hover {
  background: rgb(74, 65, 65);
  transform: scale(1.05);
}


.buyBtn:active {
  transform: scale(0.95);
  box-shadow: inset 0 0 8px rgba(255, 170, 0, 0.6);
}

.confirmOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.confirmPopup {
  width: 30vw;
  background: rgba(35, 35, 35, 0.8);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.44);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 15px rgba(44, 44, 44, 0.96);
  color: rgba(255, 144, 17, 0.92);
}

.popupText {
  font-size: 1.3vw;
  margin-bottom: 1.5rem;
}

.popupActions {
  display: flex;
  justify-content: space-around;
}

.confirmBtn, .cancelBtn {
  padding: 0.6em 1.2em;
  border-radius: 0.6rem;
  font-weight: bold;
  font-size: 1vw;
  cursor: pointer;
  transition: 0.3s;
}

.confirmBtn {
  background: rgba(87, 255, 119, 0.3);
  border: 2px solid rgba(87, 255, 119, 0.7);
  color: #61ff85;
}

.confirmBtn:hover {
  background: rgba(87, 255, 119, 0.6);
}

.cancelBtn {
  background: rgba(255, 70, 70, 0.2);
  border: 2px solid rgba(255, 70, 70, 0.6);
  color: #ff6464;
}

.cancelBtn:hover {
  background: rgba(255, 70, 70, 0.5);
}
</style>