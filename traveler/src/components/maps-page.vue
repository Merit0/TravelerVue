<template>
  <title>Maps</title>
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
  <div class="mapsViewPort">
    <button class="mapNavigationButton"></button>
    <MapView v-for="map in mapLocationStore.mapsList" :key="map.id" :map="map"></MapView>
    <button class="mapNavigationButton"></button>
  </div>
</template>

<script lang="ts">
import HeroDetailsBar from "@/components/HeroDetailsBar.vue";
import {useHeroStore} from "@/stores/HeroStore";
import {useMapLocationStore} from "@/stores/map-location-store";
import MapView from "@/components/map-view.vue";

export default {
  name: "maps-page",
  components: {MapView, HeroDetailsBar},
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
.mapsViewPort {
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

.map {
  position: relative;
  width: 100%;
  max-width: 690px;
  min-height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.old-forest-map {
  background-image: url('/images/maps-page/map-1-old-forest.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.map-name {
  position: absolute;
  top: 1vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: clamp(16px, 4vw, 20px);
  font-weight: bold;
  color: #d4af37; /* Gold color */
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
  background: rgba(0, 0, 0, 0.6);
  padding: 1vh 2vw;
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.8);
  font-family: 'Cinzel', serif;
  text-align: center;
  white-space: nowrap;
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