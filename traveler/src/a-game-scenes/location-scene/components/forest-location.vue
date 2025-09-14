<template>
  <section class="mapContent">
    <tiles-grid
        v-if="tilesShown && heroStore.isAlive()"
        :mapTiles="mapLocationStore.tiles"
        :backgroundImageSrc="mapLocation.imgPath"
    />
    <HeroDeathOverlay
        v-if="!heroStore.isAlive() && userStore.isUserLoggedIn"
    />
    <hero-inventory />
    <battlefield-overlay v-if="isBattleActive" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useHeroStore } from '@/stores/HeroStore';
import { useMapLocationStore } from '@/stores/map-location-store';
import { useUserStore } from '@/stores/UserStore';
import { useOverlayStore } from '@/stores/overlay-store';
import { MapLocationModel } from '@/a-game-scenes/location-scene/models/map-location-model';
import MapModel from '@/a-game-scenes/silesia-world-scene/models/map-model';

import TilesGrid from '@/a-game-scenes/location-scene/components/tiles-grid.vue';
import HeroInventory from '../../inventory-scene/components/hero-inventory-overlay.vue';
import HeroDeathOverlay from '@/a-game-scenes/hearo-death-scene/components/hero-death-overlay.vue';
import BattlefieldOverlay from '@/components/battle/battlefield-overlay.vue';

const heroStore = useHeroStore();
const userStore = useUserStore();
const mapLocationStore = useMapLocationStore();
const overlayStore = useOverlayStore();

const mapLocationName = 'Forest';
mapLocationStore.initMapsList();

  const silesia: MapModel = mapLocationStore.getSilesia();
  const silesiaLocations: MapLocationModel[] = silesia.mapLocations;
const mapLocation: MapLocationModel = silesiaLocations.find(
    location => location.name === mapLocationName
)!;

mapLocation.hero = heroStore.hero;
mapLocationStore.buildLocationMap(mapLocation);

const tilesShown = true;

const isBattleActive = computed(() => overlayStore.isOverlay('battle'));

onMounted(() => {
  overlayStore.closeOverlay();
});
</script>

<style scoped>
.mapContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
