<template>
  <section class="page">
    <title>{{mapLocationName}}</title>
    <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <tiles-grid :mapTiles="mapLocationStore.tiles" v-if="tilesShown && heroStore.isAlive()" :backgroundImageSrc="mapLocation.imgPath"></tiles-grid>
    <HeroDeathOverlay v-if="!heroStore.isAlive() && userStore.isUserLoggedIn"></HeroDeathOverlay>
    <hero-inventory :show-inventory="heroStore.inventoryShown" @heroInventory="closeInventory($event)"></hero-inventory>
    <button @click="quitMap()" class="escapeBtn">Escape</button>
  </section>
</template>

<script lang="ts">
import HeroDetailsBar from '../../hero-details-bar.vue';
import HeroDeathOverlay from '@/components/hero-death-overlay.vue'
import {useHeroStore} from '@/stores/HeroStore'
import {useMapLocationStore} from '@/stores/map-location-store';
import HeroInventoryOverlay from '../../hero-equipment-modal/hero-inventory-overlay.vue';
import {useUserStore} from "@/stores/UserStore";
import {MapLocationModel} from "@/models/map-location-model";
import MapModel from "@/models/MapModel";
import TilesGrid from "@/components/tiles-grid.vue";

export default {
  name: "mountain-hill-map-location",
  components: {TilesGrid, HeroDetailsBar: HeroDetailsBar, HeroDeathOverlay: HeroDeathOverlay, HeroInventory: HeroInventoryOverlay},
  data() {
    const mapLocationName = 'Mountain Hill'
    const heroStore = useHeroStore();
    const userStore = useUserStore();
    const hero = heroStore.hero;
    const tilesShown = true;
    const mapLocationStore = useMapLocationStore();
    mapLocationStore.initMapsList();
    const oldForest: MapModel = mapLocationStore.getOldForestMap();
    const locations: MapLocationModel[] = oldForest.mapLocations;
    const mapLocation: MapLocationModel = locations.find(location => location.name === mapLocationName);
    mapLocation.hero = hero;
    mapLocationStore.buildLocationMap(mapLocation);

    return {hero, tilesShown, heroStore, mapLocationStore, userStore, mapLocationName, mapLocation}
  },
  methods: {
    async closeInventory(inventoryStatus: boolean) {
      this.heroStore.showInventory(inventoryStatus);
    },
  }
}
</script>