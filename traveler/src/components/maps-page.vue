<template>
  <title>Maps</title>
  <HeroDetailsBar :hero="hero"></HeroDetailsBar>
  <div class="mapTiles">
    <DungeonTile :isEmpty="false"></DungeonTile>
    <DungeonTile :isEmpty="true"></DungeonTile>
    <DungeonTile :isEmpty="true"></DungeonTile>
    <DungeonTile :isEmpty="true"></DungeonTile>
  </div>
</template>

<script lang="ts">
import DungeonTile from './DungeonTile.vue';
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
.mapTiles {
  max-width: 100%;
  max-height: 100%;
  position: relative;
  margin-left: 20px;
  border-radius: 50px 0 50px 0;
  border: 1px solid rgba(54, 2, 2, 0.795);
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: rgba(54, 2, 2, 0.274);
  padding: 5px;
}
</style>