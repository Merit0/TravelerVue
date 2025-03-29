<template>
  <div class="dungeonTile dungeon-point pulsing" v-if="!isEmpty">
    <button @click="startDungeon()" class="buttonMap" :disabled="mapStore.isMapCleared"></button>
    <div class="resetBtnBackground" v-if="mapStore.isMapCleared">
      <div class="resetImg">
        <button class="btnReset" @click="mapStore.resetMap"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router/index';
import {useMapStore} from '@/stores/MapStore';

export default {
  name: "DungeonTile",
  props: {
    isEmpty: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const mapStore = useMapStore();
    let isDisabled = false;
    return {isDisabled, mapStore};
  },
  methods: {
    async startDungeon() {
      router.push("/old-forest");
    }
  }
}
</script>

<style>
@import url('@/styles/dungeon-spot.css');
</style>