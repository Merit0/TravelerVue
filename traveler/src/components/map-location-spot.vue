<template>
  <div class="mapLocation pulsing" :style="getMapLocationPosition(mapLocation.position)">
    <button @click="enterToMapLocation()" class="buttonMap" :disabled="mapStore.isMapCleared"></button>
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
import {PropType} from "vue";
import {MapLocationModel} from "@/models/map-location-model";
import {IPosition} from "@/interfaces/el-position-interface";

export default {
  name: "MyLocationSpot",
  props: {
    mapLocation: {
      type: Object as PropType<MapLocationModel>,
    }
  },
  data() {
    const mapStore = useMapStore();
    let isDisabled = false;
    return {isDisabled, mapStore};
  },
  methods: {
    async enterToMapLocation() {
      router.push("/old-forest");
    },

    getMapLocationPosition(spotPosition: IPosition) {
      return {
        top: spotPosition.top ? spotPosition.top : 0,
        bottom: spotPosition.bottom ? spotPosition.bottom : 0,
        left: spotPosition.left ? spotPosition.left : 0,
        right: spotPosition.right ? spotPosition.right : 0,
      }
    }
  }
}
</script>

<style>
@import url('@/styles/map-location-spot.css');
</style>