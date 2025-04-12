<template>
  <button v-if="tile.isTree" class="treeTile mapTile" @click="cutTree(tile)"></button>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';


export default {
  name: "tree-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  data() {
    const mapLocationStore = useMapLocationStore();
    const heroStore = useHeroStore();
    return {mapLocationStore, heroStore};
  },
  methods: {
    async cutTree(tile: TileModel) {
      tile.isTree = false;
      if (tile.enemies.length === 0) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
}
</script>
<style>
.treeTile {
  border-radius: 20%;
  background-image: url('/images/maps/lost-forest/tree-tile.png');
  border: 2px solid rgb(108, 108, 108);
  background-size: 100% 100%;
}
</style>