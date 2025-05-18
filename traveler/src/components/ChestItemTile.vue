<template>
  <div class="chestInventorySlotContainer">
    <div class="chestInventoryFrameImage">
      <div
          class="chestItemImg"
          v-if="lootItem.place === 'chest'"
          :style="getItemStyle(lootItem)"
          @click="takeItem(lootItem)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { LootItemModel } from "@/models/LootItemModel";
import { useBagStore } from "@/stores/BagStore";
import { useHeroStore } from "@/stores/HeroStore";
import { useChestStore } from "@/stores/ChestStore";
import { ItemType } from "@/enums/ItemType";

export default {
  name: "chest-item-tile",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  data() {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    return {
      bagStore,
      heroStore,
    };
  },
  methods: {
    getItemStyle(lootItem: LootItemModel): Record<string, string> {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };
    },
    async takeItem(item: LootItemModel): Promise<void> {
      if (item.itemType === ItemType.COIN) {
        this.heroStore.collect(item.value);
      } else {
        this.bagStore.putIn(item);
      }

      item.place = null;
      const chestStore = useChestStore();
      chestStore.removeItem(item);
    }
  }
}
</script>

<style>
.chestInventorySlotContainer {
  width: 13vh;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chestInventoryFrameImage {
  width: 100%;
  height: 100%;
  background-image: url("/images/overlays/shop-place/shop-inventory-frame-image.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chestItemImg {
  width: 60%;
  height: 60%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.chestItemImg:hover {
  transform: scale(1.05);
}
</style>
