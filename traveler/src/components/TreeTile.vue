<template>
  <div v-if="tile.isInitial" class="initialTileView mapTile" :style="getTileImage(tile.imageSrc)">
    <button class="mapTile tileButton" @click="clearTile(tile)"></button>
  </div>
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
    getTileImage(imageSrc: string) {
      return {
        backgroundImage: `url(${imageSrc})`,
      }
    },
    async clearTile(tile: TileModel) {
      tile.isInitial = false;
      if (tile.enemies.length === 0) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
}
</script>
<style>
.initialTileView {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
  0 4px 6px rgba(0, 0, 0, 0.3);
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.initialTileView:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.4);
}

.tileButton {
  background: none;
  border: none;
}
</style>