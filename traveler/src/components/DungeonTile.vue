<template>
  <div class="dungeonTile" v-if="!isEmpty">
    <button @click="startDungeon()" class="buttonMap" :disabled="mapStore.isMapCleared"></button>
    <div class="resetBtnBackground" v-if="mapStore.isMapCleared">
      <div class="resetImg">
        <button class="btnReset" @click="mapStore.resetMap"></button>
      </div>
    </div>
  </div>
  <EmptyMapSlot v-if="isEmpty"></EmptyMapSlot>
</template>

<script lang="ts">
import router from '@/router/index';
import EmptyMapSlot from './EmptyMapSlot.vue';
import {useMapStore} from '@/stores/MapStore';

export default {
  name: "dungeon-tile",
  components: {EmptyMapSlot},
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
.dungeonTile {
  width: 190px;
  height: 190px;
  background-image: url('/images/maps-page/maps-tiles/evil-land-map-icon.png');
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
}

.buttonMap {
  width: 160px;
  height: 170px;
  background: transparent;
  margin-top: 10%;
  margin-left: 11%;
  border: none;
}

.resetBtnBackground {
  width: 200px;
  height: 200px;
  background-color: rgba(168, 25, 0, 0.438);
  position: fixed;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.resetImg {
  width: 65px;
  height: 65px;
  background-image: url('/images/maps-page/refresh-map-icon.png');
  background-size: 100%;
}

.btnReset {
  width: 65px;
  height: 65px;
  border: none;
  border-radius: 100%;
  background: none;
}
</style>