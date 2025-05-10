<template>
  <div class="globalOverlay" v-if="heroStore.inventoryShown">
    <div class="inventoryContent">
      <close-hero-inventory-modal-button @heroInventory="closeInventory($event)"/>
      <inventory-top-element/>
      <div class="left-side-wooden-plank"></div>
      <div class="bottom-wooden-plank"></div>
      <hero-bag-inventory/>
      <HeroEquipmentHolder :equipment="hero.equipment" :hero-image-path="hero.imgPath"/>
    </div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import HeroEquipmentHolder from '@/components/hero-equipment-modal/hero-equipment-holder/hero-equipment-holder.vue'
import {useHeroStore} from '@/stores/HeroStore';
import InventoryTopElement from "@/components/hero-equipment-modal/inventory-top-element.vue";
import CloseHeroInventoryModalButton from "@/components/gui/buttons/close-hero-inventory-modal-button.vue";
import HeroBagInventory from "@/components/hero-equipment-modal/bag-inventory/hero-bag-inventory.vue";


export default {
  name: "hero-inventory-overlay",
  components: {
    HeroBagInventory,
    CloseHeroInventoryModalButton,
    InventoryTopElement,
    HeroEquipmentHolder: HeroEquipmentHolder
  },
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const bagStore = useBagStore();
    const bagItems: LootItemModel[] = bagStore.bagItems;

    return {bagItems, hero, heroStore};
  },
  methods: {
    async closeInventory(inventoryStatus: boolean) {
      this.heroStore.showInventory(inventoryStatus);
    },
  }
}
</script>

<style>
.inventoryContent {
  position: relative;
  width: 51vw;
  height: 70vh;
  margin: 15vh auto auto;
}

.left-side-wooden-plank {
  position: absolute;
  left: 0;
  width: 0.7rem;
  height: 100%;
  background: linear-gradient(
      to right,
      #513139 0%,
      #3a2329 50%,
      #685353 100%
  );
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1),
  0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #252525;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}

.bottom-wooden-plank {
  position: absolute;
  bottom: 0;
  left: -1vh;
  width: 102%;
  height: 3vh;
  background-image: url("/images/hero-inventary/dark-wood.jpg");
  background-size: contain;
  background-repeat: repeat;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.4), /* верхня зовнішня тінь */ inset 0 2px 4px rgba(255, 255, 255, 0.1), /* внутрішній світлий блиск */ inset 0 -2px 6px rgba(0, 0, 0, 0.3); /* внутрішня глибина */
}

</style>