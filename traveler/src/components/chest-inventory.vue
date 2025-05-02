<template>
  <div class="chestOverlay" v-if="showChestInventory">
    <div class="chestContent">
      <button class="closeChestInventoryBtn" @click="closeChestInventory()">X</button>
      <div class="chestItemsContainer">
        <chest-item-tile v-for="item in chest.items" :key="item.id" :lootItem="item"></chest-item-tile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ChestItemTile from './ChestItemTile.vue';
import { PropType, watch, defineComponent, computed } from 'vue';
import { ChestModel } from '@/models/ChestModel';
import { useChestStore } from '@/stores/ChestStore';

export default defineComponent({
  name: 'chest-inventory',
  components: { ChestItemTile },
  props: {
    chest: {
      type: Object as PropType<ChestModel>,
      required: true
    },
    showChestInventory: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const chestStore = useChestStore();

    // Слідкуємо за змінами айтемів
    const isChestEmpty = computed(() => {
      return chestStore.chestItems.filter(item => item.name).length === 0;
    });

    // Автоматичне закриття при спорожненні
    watch(isChestEmpty, (empty) => {
      if (props.showChestInventory && empty) {
        closeChestInventory();
      }
    });

    const closeChestInventory = async () => {
      emit('chestInventory', false);
      await chestStore.resetChest();
    };

    return {
      chestStore,
      closeChestInventory
    };
  }
});
</script>

<style>

.chestContent {
  position: relative;
  width: 500px;
  height: 400px;
  border-radius: 20px;
  margin: auto;
  background-image: url("/images/chests/chest_items_area.png");
  background-size: 100% 100%;
  margin-top: 150px;
}

.chestOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  align-items: center;
}

.chestItemsContainer {
  margin-top: 50px;
  max-width: 410px;
  height: 270px;
  margin-left: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.closeChestInventoryBtn {
  position: absolute;
  left: 440px;
  top: 40px;
  width: 50px;
  height: 50px;
  background-color: rgb(184, 0, 61);
  border-radius: 100%;
  z-index: 1;
}
</style>
