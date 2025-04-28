<template>
  <div v-if="showConfirmPurchaseOverlay" class="confirmOverlay">
    <div class="confirmPopup">
      <p class="popupText">Buy <strong>{{ this.lootItem.name }}</strong> for {{ lootItem.price }}
        <img class="modalCoinIcon" src="/images/top-bar-items/coin-icon.png" alt="coin-icon"/> ?</p>
      <div class="popupActions">
        <button class="confirmBtn" @click="confirmPurchase">BUY</button>
        <button class="cancelBtn" @click="$emit('closeModal')">CANCEL</button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {PropType} from 'vue';
import {LootItemModel} from "@/models/LootItemModel";
import {useBagStore} from "@/stores/BagStore";
import {useHeroStore} from "@/stores/HeroStore";

export default {
  name: "confirm-purchase-modal",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    },
    showConfirmPurchaseOverlay: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    let itemStore = this.lootItem;
    return {
      heroStore,
      bagStore,
      itemStore
    }
  },
  methods: {
    confirmPurchase() {
      this.heroStore.pay(this.itemStore.price)
      this.itemStore.place = "bag";
      this.bagStore.putIn(this.itemStore);
      console.log("Куплено:", this.itemStore);
      this.$emit("closeModal");
      this.$emit("outOfStock");
    },
  }
}
</script>

<style>
@import '@/styles/shop-styles/confirm-purchase-modal-style.css';
</style>