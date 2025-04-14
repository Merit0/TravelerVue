<template>
  <div class="mapLocation pulsing" :style="getMapLocationPosition(mapLocation.position)">
    <button @click="enterToMapLocation()" class="buttonMap" :disabled="useMapLocationStore.isMapLocationCleared"></button>
    <div class="resetBtnBackground" v-if="useMapLocationStore.isMapLocationCleared">
      <div class="resetImg">
        <button class="btnReset" @click="mapStore.resetMap"></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router/index';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from "vue";
import {MapLocationModel} from "@/models/map-location-model";
import {IPosition} from "@/interfaces/el-position-interface";

export default {
  name: "MapLocationSpot",
  props: {
    mapLocation: {
      type: Object as PropType<MapLocationModel>,
    }
  },
  data() {
    let isDisabled = false;
    return {isDisabled, useMapLocationStore};
  },
  methods: {
    async enterToMapLocation() {
      router.push(this.mapLocation.endPoint);
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