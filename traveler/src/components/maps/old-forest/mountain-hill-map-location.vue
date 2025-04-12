<template>
  <section class="page">
    <title>{{mapLocationName}}</title>
    <HeroDetailsBar :hero="hero"></HeroDetailsBar>
    <Tiles :mapTiles="mapLocationStore.tiles" v-if="tilesShown && heroStore.isAlive()"></Tiles>
    <HeroDeathOverlay v-if="!heroStore.isAlive() && userStore.isUserLoggedIn"></HeroDeathOverlay>
    <hero-inventory :show-inventory="heroStore.inventoryShown" @heroInventory="closeInventory($event)"></hero-inventory>
    <button @click="quitMap()" class="escapeBtn">Escape</button>
  </section>
</template>

<script lang="ts">
import TilesGrid from '../../tiles-grid.vue';
import HeroDetailsBar from '../../HeroDetailsBar.vue';
import HeroDeathOverlay from '@/components/HeroDeathOverlay.vue'
import {useHeroStore} from '@/stores/HeroStore'
import router from '@/router';
import {useMapLocationStore} from '@/stores/map-location-store';
import HeroInventory from '../../HeroInventory.vue';
import {useUserStore} from "@/stores/UserStore";
import {MapLocationModel} from "@/models/map-location-model";
import MapModel from "@/models/MapModel";

export default {
  name: "mountain-hill-map-location",
  components: {Tiles: TilesGrid, HeroDetailsBar, HeroDeathOverlay, HeroInventory},
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
    const mountainHillLocation: MapLocationModel = locations.find(location => location.name === mapLocationName);
    mountainHillLocation.hero = hero;
    mapLocationStore.buildLocationMap(mountainHillLocation);

    return {hero, tilesShown, heroStore, mapLocationStore, userStore, mapLocationName}
  },
  methods: {
    async quitMap() {
      if (this.mapLocationStore.isMapLocationCleared) {
        this.mapLocationStore.isCleared = this.mapLocationStore.isMapLocationCleared;
      }
      await this.mapLocationStore.saveProgress(this.mapLocationName).then(() => {
        router.push("/maps");
      });
    },
    async closeInventory(inventoryStatus: boolean) {
      this.heroStore.showInventory(inventoryStatus);
    },
  }
}
</script>

<style>
.escapeBtn {
  color: #ffb671;
  position: relative;
  width: 100px;
  height: 50px;
  background-color: rgba(255, 196, 0, 0.185);
  border-radius: 10px;
  border: 2px solid rgb(95, 64, 43);
  margin-top: 10px;
  align-self: center;
  margin-left: 45%;
}
</style>