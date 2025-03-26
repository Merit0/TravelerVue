<template>
  <div class="mapTile" v-if="tile.hero && showHero">
    <div class="heroTile mapTile" :style="getStyle(tile)">
      <button class="heroBag" @click="openInventory()"></button>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '@/models/TileModel';
import {useHeroStore} from '@/stores/HeroStore';

export default {
  name: "hero-tile",
  props: {
    tile: {
      type: TileModel,
      required: true
    },
    showHero: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const heroStore = useHeroStore();

    return {heroStore}
  },
  methods: {
    getStyle(tile: TileModel) {
      return {
        backgroundImage: `url(/images/heroes_150_150/${tile.hero.imgPath})`,
        border: '2px solid rgb(127, 0, 255)',
        outline: 'none',
        boxShadow: '0 0 10px rgb(127, 0, 255)'
      };
    },
    async openInventory() {
      this.heroStore.inventoryShown = true;
    }
  }
}
</script>
<style>
.heroTile {
  background: none;
  border-radius: 20%;
  background-size: 100% 100%;
  display: inline;
}

.heroBag {
  width: 30px;
  height: 30px;
  background-color: rgba(255, 217, 0, 0);
  background-image: url("/images/bag/hero-bag-icon.png");
  background-size: 110% 110%;
  border: 1px solid rgba(53, 53, 53, 0);
  border-radius: 50%;
  margin-left: 1px;
}

.heroBag:active {
  box-shadow: 1px 1px 14px 1px rgba(0, 0, 0, 0.24);
  transform: translateY(1px);
}
</style>