<template>
  <title>Maps</title>
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
  <div class="worldViewPort">
    <world-map v-for="map in mapLocationStore.mapsList" :key="map.id" :map="map"></world-map>
  </div>
</template>

<script lang="ts">
import HeroDetailsBar from "@/components/hero-details-bar.vue";
import {useHeroStore} from "@/stores/HeroStore";
import {useMapLocationStore} from "@/stores/map-location-store";
import WorldMap from "@/components/world-map.vue";

export default {
  name: "entire-page",
  components: {WorldMap, HeroDetailsBar: HeroDetailsBar},
  setup() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    const mapLocationStore = useMapLocationStore();
    mapLocationStore.initMapsList();
    return {
      hero,
      mapLocationStore,
    };
  },
}
</script>

<style>
.worldViewPort {
  position: relative;
  background: linear-gradient(135deg, #013220, #025E3E, #038C65);
  margin: auto;
  width: 100%;
  min-height: 94vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.1vh;
}

.mapNavigationButton {
  min-width: 1vw;
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-color: rgba(43, 0, 0, 0.94);
}
</style>