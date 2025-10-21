<template>
  <div
      class="initialTileView mapTile"
      :style="getTileImage(tile.backgroundSrc)"
      :class="`tile-id-${tile.id}`"
      :data-id="tile.id"
  >
    <div
        class="initialTileView mapTile"
        :style="getTileImage(tile.imageSrc)"
        :class="{
          'shake': isShaking,
        }"
    >
      <button
          class="mapTile tileButton"
          :disabled="!tile.isReachable"
          :class="{
    unreachable: !tile.isReachable,
    'reachable-tile': tile.isReachable && !tile.isHeroHere,
    'chop-cursor': tile.isInitial && !isShaking,
    'chop': isShaking
  }"
          @click="onTileClick(tile)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model';
import {useHeroStore} from '@/stores/HeroStore';
import {useMapLocationStore} from '@/stores/map-location-store';
import {PropType} from 'vue';

export default {
  name: "relief-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  data() {
    const mapLocationStore = useMapLocationStore();
    const heroStore = useHeroStore();
    return {
      mapLocationStore,
      heroStore,
      isShaking: false,
    };
  },
  methods: {
    getTileImage(imageSrc: string) {
      return {
        backgroundImage: `url(${imageSrc})`,
      };
    },
    async onTileClick(tile: TileModel) {
      if (!tile.isReachable) return;

      this.isShaking = true;
      setTimeout(() => {
        this.isShaking = false;
        if (this.heroStore.hero.currentEnergy > 0) {
          this.heroStore.hero.useEnergy();
          this.checkTile(tile);
        }
      }, 1000);
    },
    async checkTile(tile: TileModel) {
      if (!tile.isReachable) return;
      tile.isInitial = false;

      if (tile.isDungeon) {
        return;
      }

      if (!tile.isEnemyHere) {
        this.mapLocationStore.moveHero(tile);
      }
    }
  }
};
</script>

<style scoped>
@import '@/a-game-scenes/location-scene/styles/animated-tile.css';

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-2px, 0);
  }
  40% {
    transform: translate(2px, 0);
  }
  60% {
    transform: translate(-2px, 0);
  }
  80% {
    transform: translate(2px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.shake {
  animation: shake 0.3s linear 3;
}

.chop {
  width: 100%;
  height: 100%;
  background-image: url('../../../battlefield-scene/battlefield/assets/axe-cursor-100x100.png');
  background-repeat: no-repeat;
  background-position: center;

  animation: chopRotate 0.6s ease-in-out infinite;
}

@keyframes chopRotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.chop-cursor {
  cursor: url('../../../battlefield-scene/battlefield/assets/axe-cursor-100x100.png') 50 50, auto;
}
</style>