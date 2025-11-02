<template>
  <section class="mapContent">
    <tiles-grid
        v-if="tilesShown && heroStore.isAlive()"
        :mapTiles="mapLocationStore.tiles"
        :backgroundImageSrc="dungeonMap.imgPath"
    />
    <HeroDeathOverlay
        v-if="!heroStore.isAlive() && userStore.isUserLoggedIn"
    />
    <hero-inventory/>
    <battlefield-overlay v-if="isBattleActive"/>
  </section>
</template>

<script setup lang="ts">
import {onMounted, computed} from 'vue';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {useUserStore} from '@/stores/UserStore';
import {useOverlayStore} from '@/stores/overlay-store';
import {MapLocationModel} from '@/a-game-scenes/location-scene/models/map-location-model';
import MapModel from '@/a-game-scenes/silesia-world-scene/models/map-model';

import TilesGrid from '@/a-game-scenes/location-scene/components/tiles-grid.vue';
import HeroInventory from '../../inventory-scene/components/hero-inventory-overlay.vue';
import HeroDeathOverlay from '@/a-game-scenes/hero-death-scene/components/hero-death-overlay.vue';
import BattlefieldOverlay from '@/a-game-scenes/battlefield-scene/battlefield/components/battlefield-overlay.vue';

const heroStore = useHeroStore();
const userStore = useUserStore();
const mapLocationStore = useMapLocationStore();
const overlayStore = useOverlayStore();

const dungeonLocationName = 'Fallen Bones';
mapLocationStore.initMapsList();

const underground: MapModel = mapLocationStore.getUnderground();
const undergroundLocations: MapLocationModel[] = underground.mapLocations;
const dungeonMap: MapLocationModel = undergroundLocations.find(
    location => location.name === dungeonLocationName
);

dungeonMap.hero = heroStore.hero;
mapLocationStore.buildLocationMap(dungeonMap);

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
