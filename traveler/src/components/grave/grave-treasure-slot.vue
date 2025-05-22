<template>
  <div class="graveInventorySlotContainer">
    <div class="graveInventoryFrameImage">
      <div
          v-if="lootItem"
          class="graveItemImg"
          :style="itemStyle"
          @click="lootItem.place === 'grave' && takeItem()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue';
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import {useHeroStore} from '@/stores/HeroStore';
import {ItemType} from '@/enums/ItemType';
import {useGraveStore} from "@/stores/grave-store";

export default defineComponent({
  name: 'grave-treasure-slot',
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel | null>,
      required: true,
      default: null
    }
  },
  setup(props) {
    const bagStore = useBagStore();
    const heroStore = useHeroStore();
    const graveStore = useGraveStore();

    const itemStyle = computed(() => ({
      backgroundImage: props.lootItem?.imgPath ? `url(${props.lootItem.imgPath})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }));

    const takeItem = async () => {
      const item = props.lootItem;
      if (!item) return;

      if (item.itemType === ItemType.COIN) {
        heroStore.collect(item.value);
      } else {
        bagStore.putIn(item);
      }

      item.place = 'keeper';
      graveStore.removeItem(item);
    };

    return {
      itemStyle,
      takeItem
    };
  }
});
</script>

<style scoped>
.graveInventorySlotContainer {
  width: 13vh;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.graveInventoryFrameImage {
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

.graveItemImg {
  width: 60%;
  height: 60%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.graveItemImg:hover {
  transform: scale(1.05);
}
</style>