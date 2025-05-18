<template>
  <div class="chestInventorySlotContainer">
    <div class="chestInventoryFrameImage">
      <div
          v-if="lootItem.place === 'chest'"
          class="chestItemImg"
          :style="itemStyle"
          @click="takeItem"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { LootItemModel } from "@/models/LootItemModel";
import { useBagStore } from "@/stores/BagStore";
import { useHeroStore } from "@/stores/HeroStore";
import { useChestStore } from "@/stores/ChestStore";
import { ItemType } from "@/enums/ItemType";

export default defineComponent({
  name: "chest-item-tile",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  setup(props) {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    const chestStore = useChestStore();

    const itemStyle = computed(() => ({
      backgroundImage: `url(${props.lootItem.imgPath})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }));

    const takeItem = async () => {
      const item = props.lootItem;
      if (item.itemType === ItemType.COIN) {
        heroStore.collect(item.value);
      } else {
        bagStore.putIn(item);
      }

      item.place = null;
      chestStore.removeItem(item);
    };

    return {
      itemStyle,
      takeItem
    };
  }
});
</script>

<style scoped>
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
}

.chestItemImg:hover {
  transform: scale(1.05);
}
</style>