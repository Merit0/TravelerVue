<template>
  <title>Maps</title>
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
  <div class="mapsViewPort">
    <button class="mapNavigationButton"></button>
<!--    <Map>-->
    <div class="map old-forest-map">
      <DungeonTile :isEmpty="false"></DungeonTile>
      <div class="map-name">Старий Ліс</div>
    </div>
    <div class="map evil-tree">
      <div class="map-name">Прокляте Дерево</div>
    </div>
    <div class="map magic-circle">
      <div class="map-name">Магічне Коло</div>
    </div>
    <button class="mapNavigationButton"></button>
  </div>
</template>

<script lang="ts">
import DungeonTile from './dungeon-tile.vue';
import HeroDetailsBar from "@/components/HeroDetailsBar.vue";
import {useHeroStore} from "@/stores/HeroStore";

export default {
  name: "maps-page",
  components: {HeroDetailsBar, DungeonTile},
  data() {
    const heroStore = useHeroStore();
    const hero = heroStore.hero;
    return {hero};
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

.evil-tree {
  background-image: url('/images/maps-page/map-2-evil-tree.png');
  background-size: cover;
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.magic-circle {
  background-image: url('/images/maps-page/map-3-magic-circle.png');
  background-size: cover;
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.mapNavigationButton {
  min-width: 1vw;
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-color: rgba(43, 0, 0, 0.94);
}

.map-name {
  position: absolute; /* Ensures it stays in a fixed place */
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
  font-family: 'Cinzel', serif; /* Medieval-style font */
  text-align: center;
  white-space: nowrap;
}
</style>