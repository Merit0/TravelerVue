<template>
  <div class="inventorySlotContainer">
    <div
        class="dungeon-loot-item"
        :style="getItemStyle(lootItem)"
    ></div>
    <div class="inventoryFrameImage"></div>
  </div>
</template>

<script lang="ts">
import {LootItemModel} from '@/models/LootItemModel';
import {PropType} from 'vue';

export default {
  name: "dungeon-loot-tile",
  props: {
    lootItem: {
      type: Object as PropType<LootItemModel>,
      required: true
    }
  },
  methods: {
    getItemStyle(lootItem: LootItemModel) {
      return {
        backgroundImage: `url(${lootItem.imgPath})`,
      };
    }
  }
};
</script>

<style>
.dungeon-loot-item {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 10%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 1;
}

.dungeon-loot-item:active {
  filter: brightness(1.2);
}

.dungeon-loot-item:hover {
  box-shadow: 0 0 10px rgba(255, 204, 69, 0.6);
  transform: scale(1.05);
}
</style>