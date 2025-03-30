<template>
  <div class="dungeonSpot pulsing" :style="getDungeonPosition(dungeon.position)">
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
import {IPosition} from "@/interfaces/el-position-interface";
import {PropType} from "vue";
import {DungeonModel} from "@/models/DungeonModel";

export default {
  name: "DungeonSpot",
  props: {
    dungeon: {
      type: Object as PropType<DungeonModel>,
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
    },

    getDungeonPosition(spotPosition: IPosition) {
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
@import url('@/styles/dungeon-spot.css');
</style>