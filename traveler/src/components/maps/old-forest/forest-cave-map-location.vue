<!--<template>-->
<!--  <section class="page">-->
<!--    <title>Old Forest</title>-->
<!--    <HeroDetailsBar :hero="hero"></HeroDetailsBar>-->
<!--    <Tiles :mapTiles="mapStore.tiles" v-if="tilesShown && heroStore.isAlive()"></Tiles>-->
<!--    <HeroDeathOverlay v-if="!heroStore.isAlive() && userStore.isUserLoggedIn"></HeroDeathOverlay>-->
<!--    <hero-inventory :show-inventory="heroStore.inventoryShown" @heroInventory="closeInventory($event)"></hero-inventory>-->
<!--    <button @click="quitMap()" class="escapeBtn">Escape</button>-->
<!--  </section>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import Tiles from '../../dungeon-tiles-list.vue';-->
<!--import HeroDetailsBar from '../../HeroDetailsBar.vue';-->
<!--import HeroDeathOverlay from '@/components/HeroDeathOverlay.vue'-->
<!--import {useHeroStore} from '@/stores/HeroStore'-->
<!--import router from '@/router';-->
<!--import {useMapStore} from '@/stores/MapStore';-->
<!--import MapModel from '../../../models/MapModel';-->
<!--import HeroInventory from '../../HeroInventory.vue';-->
<!--import {MapProvider} from '@/providers/MapProvider';-->
<!--import {useUserStore} from "@/stores/UserStore";-->

<!--export default {-->
<!--  name: "old-forest",-->
<!--  components: {Tiles, HeroDetailsBar, HeroDeathOverlay, HeroInventory},-->
<!--  data() {-->
<!--    const heroStore = useHeroStore();-->
<!--    const userStore = useUserStore();-->
<!--    const hero = heroStore.hero;-->
<!--    const tilesShown = true;-->
<!--    const mapStore = useMapStore();-->
<!--    const oldForest: MapModel = MapProvider.getOldForest();-->
<!--    oldForest.mapLocations[0].hero = hero;-->
<!--    mapStore.buildMap(oldForest);-->

<!--    return {hero, tilesShown, heroStore, mapStore, userStore}-->
<!--  },-->
<!--  methods: {-->
<!--    async quitMap() {-->
<!--      if (this.mapStore.isMapCleared) {-->
<!--        this.mapStore.isCleared = this.mapStore.isMapCleared;-->
<!--      }-->
<!--      await this.mapStore.resetMap().then(() => {-->
<!--        router.push("/maps");-->
<!--      });-->
<!--    },-->
<!--    async closeInventory(inventoryStatus: boolean) {-->
<!--      this.heroStore.showInventory(inventoryStatus);-->
<!--    },-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--.escapeBtn {-->
<!--  color: #ffb671;-->
<!--  position: relative;-->
<!--  width: 100px;-->
<!--  height: 50px;-->
<!--  background-color: rgba(255, 196, 0, 0.185);-->
<!--  border-radius: 10px;-->
<!--  border: 2px solid rgb(95, 64, 43);-->
<!--  margin-top: 10px;-->
<!--  align-self: center;-->
<!--  margin-left: 45%;-->
<!--}-->
<!--</style>-->