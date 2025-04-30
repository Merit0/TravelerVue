<template>
  <div v-if="showConfirmPurchaseOverlay" class="confirmOverlay">
    <div class="confirmPopup">
      <p v-if="lootItem" class="popupText">{{ operationName }} <strong>{{ lootItem.name }}</strong> for {{ operationName === 'Buy' ? lootItem.price : (Math.ceil(lootItem.price * 0.1)) }}
        <img class="modalCoinIcon" src="/images/top-bar-items/coin-icon.png" alt="coin-icon"/> ?</p>
      <div class="popupActions">
        <button class="confirmBtn" @click="confirmAction(lootItem)">{{ operationName.toUpperCase() }}</button>
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
  emits: ["closeModal", 'outOfStock'],
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel | null>,
      default: null
    },
    showConfirmPurchaseOverlay: {
      type: Boolean,
      required: true,
      default: false
    },
    operationName: {
      type: String,
      required: true,
      default: 'Buy',
      validator: (value: string) => ['Buy', 'Sell'].includes(value),
    }
  },
  data() {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    return {
      heroStore,
      bagStore,
    }
  },
  methods: {
    confirmAction(lootItem: LootItemModel) {
      if (this.operationName === "Buy") {
        this.heroStore.pay(lootItem.price)
        lootItem.place = "bag";
        this.bagStore.putIn(lootItem);
        console.log(`Куплено: ${lootItem.name} for ${lootItem.price} coins!`);
        this.$emit("closeModal");
        this.$emit("outOfStock");
      } else {
        const sellPrice: number = Math.ceil(lootItem.price * 0.1);
        this.heroStore.collect(sellPrice);
        this.bagStore.removeItem(lootItem);
        console.log(`Продано: ${lootItem.name} for ${sellPrice} coins!`);
        this.$emit("closeModal");
      }
    },
  }
}
</script>

<style>
@import '@/styles/shop-styles/confirm-shop-action-modal-style.css';
</style>