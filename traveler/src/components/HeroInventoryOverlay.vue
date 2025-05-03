<template>
  <div class="globalOverlay" v-if="showInventory">
    <div class="inventoryContent">
      <div class="close-button-container">
        <div class="closeInventoryBtn" @click="$emit('heroInventory', false)">CLOSE</div>
      </div>
      <div class="inventory-corner-bag-image"></div>
      <div class="top-component">
        <div class="left-component-bar"></div>
        <div class="middle-component-bar">
          <div class="top-plank-title-container">
            <span class="top-plank-title">{{ hero.name }}</span>
          </div>
        </div>
        <div class="right-component-bar"></div>
      </div>
      <div class="left-side-wooden-plank"></div>
      <div class="bottom-wooden-plank"></div>
      <div class="bag-content">
        <div class="bag-title-container">
          <span class="bag-title">Bag</span>
        </div>
        <bag-inventory-slots-grid></bag-inventory-slots-grid>
        <div class="separator-wooden-plank"></div>
        <div class="right-side-wooden-plank"></div>
      </div>
      <HeroEquipmentHolder :equipment="hero.equipment" :hero-image-path="hero.imgPath" />
    </div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import HeroEquipmentHolder from '@/components/HeroEquipmentHolder.vue'
import {useHeroStore} from '@/stores/HeroStore';
import BagInventorySlotsGrid from "@/components/bag-inventory/bag-inventory-slots-grid.vue";


export default {
  name: "hero-inventory-overlay",
  components: {BagInventorySlotsGrid, HeroEquipmentHolder: HeroEquipmentHolder},
  props: {
    showInventory: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const bagStore = useBagStore();
    const bagItems: LootItemModel[] = bagStore.bagItems;

    return {bagItems, hero};
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

.bag-content {
  position: absolute;
  align-items: center;
  display: flex;
  flex-direction: column;
  right: 0;
  width: 27vw;
  height: 100%;
  background: #27171b;
  background-size: 100%, 100%;
  z-index: 1;
}

.bag-title-container {
  position: relative;
  margin-top: 9vh;
  width: 15vh;
  height: 5vh;
  text-align: center;
  align-content: center;
}

.top-plank-title-container {
  position: relative;
  margin-top: 3%;
  width: 65vh;
  height: 50%;
  text-align: center;
  align-content: center;
  border-radius: 1vw;
}

.bag-title {
  font-size: 3.2vh;
  font-weight: 700;
  color: #ffdfb0; /* Теплий майже білий відтінок */
  text-shadow:
      0 1px 2px rgba(0, 0, 0, 0.6),
      0 0 5px rgba(255, 230, 200, 0.15);

  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: 'Cinzel', serif; /* класичний фентезі-стиль */
}

.top-plank-title {
  font-family: 'Cinzel', serif;
  color: rgb(64, 27, 1);
  font-size: 3vh;
  font-weight: bold;
  text-align: center;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.top-component {
  position: absolute;
  top: -5vh;
  left: -1%;
  width: 102%;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  padding: 0;
}

.middle-component-bar {
  position: absolute;
  width: 100%;
  height: 75%;
  background-image: url("/images/hero-inventary/middle-part.png");
  background-repeat: repeat;
  background-size: contain;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-direction: column;
}

.left-component-bar {
  position: absolute;
  left: -2%;
  width: 5%;
  height: 100%;
  background-image: url("/images/hero-inventary/left-part-top-bar.png");
  background-repeat: no-repeat;
  background-size: contain;
  z-index: 1;
}

.right-component-bar {
  position: absolute;
  right: -3%;
  width: 5%;
  height: 100%;
  background-image: url("/images/hero-inventary/right-part-top-bar.png");
  background-repeat: no-repeat;
  background-size: contain;
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

.right-side-wooden-plank {
  position: absolute;
  right: 0;
  width: 0.7rem;
  height: 100%;
  background: linear-gradient(
      to left,
      #513139 0%,
      #3a2329 50%,
      #685353 100%
  );
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1),
  0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #252525;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.separator-wooden-plank {
  position: absolute;
  left: 0;
  width: 0.7rem;
  height: 100%;
  background: linear-gradient(
      to left,
      #685353 0%,
      #3a2329 50%,
      #685353 100%
  );
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1),
  0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #252525;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.closeInventoryBtn {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/images/hero-inventary/close-button.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: bold;
  font-size: 100%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.closeInventoryBtn:hover {
  transform: scale(1.05);
}

.close-button-container {
  position: absolute;
  top: 2%;
  left: 88%;
  width: 7vw;
  height: 6vh;
  align-content: center;
  z-index: 11;
}

</style>