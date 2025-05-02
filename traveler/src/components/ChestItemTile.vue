<template>
  <div class="chestItemArea">
    <button class="chestItemImg" v-if="lootItem.place === 'chest'" :style="getItemStyle(lootItem)"
            @click="takeItem(lootItem)"></button>
  </div>
</template>

<script lang="ts">
import {PropType} from 'vue';
import {LootItemModel} from "@/models/LootItemModel";
import {useBagStore} from "@/stores/BagStore";
import {useHeroStore} from "@/stores/HeroStore";
import {useChestStore} from "@/stores/ChestStore";
import {ItemType} from "@/enums/ItemType";

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
  mounted() {
    const chestStore = useChestStore();
    chestStore.addItem(this.lootItem);
  },
  methods: {
    getItemStyle(lootItem: LootItemModel): Record<string, string> {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
      };
    },
    async takeItem(item: LootItemModel): Promise<void> {
      if (item.itemType === ItemType.COIN) {
        this.heroStore.collect(item.value);
        item.place = null; // або null, якщо в тебе дозволено
      } else {
        this.bagStore.putIn(item);
        item.place = 'bag';
      }
    }
  }
}
</script>

<style>
.chestItemArea {
  width: 110px;
  height: 110px;
  margin: auto;
  display: flex;
  align-items: center;
  background-image: url("/images/chests/chest_item_area_orange.png");
  background-size: 100% 100%;
}

.chestItemImg {
  position: relative;
  width: 84px;
  height: 84px;
  background: none;
  background-size: 100% 100%;
  border-radius: 13%;
  margin-left: 12px;
}
</style>