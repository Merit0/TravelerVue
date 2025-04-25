<template>
  <div class="chestItemArea">
    <button class="chestItemImg" v-if="lootItem.place === 'chest'" :style="getItemStyle(lootItem)"
            @click="takeItem(lootItem)"></button>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {useBagStore} from '@/stores/BagStore';
import {useChestStore} from '@/stores/ChestStore';
import {PropType} from 'vue'


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
    const chestStore = useChestStore();
    chestStore.addItem(this.lootItem);
    return {bagStore};
  },

  methods: {
    getItemStyle(lootItem: LootItemModel) {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
      }
    },
    async takeItem(item: LootItemModel) {
      this.bagStore.putIn(item);
      item.place = "bag";
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