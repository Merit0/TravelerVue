<template>
  <div
      class="initialTileView mapTile"
      :style="getTileBackgroundImage(tile)"
  >
    <div class="damage-popup" v-if="damageValue">
      -{{ damageValue }}
    </div>
    <div class="blood-splash" v-if="bloodSplash"/>
    <div class="battle-enemy-tile"
        :class="{ 'dodged': wasDodged }"
    >
      <div
          class="enemy-body-tile-image"
      >
        <div class="podium-hero-image enemy-stand-base-top-view"/>
        <div
            class="podium-hero-image"
            :style="getEnemyImage(tile)"
        />
      </div>
    </div>
    <div class="enemy-stats-hover">
      ❤️ {{ enemy?.health }}
      ⚔️ {{ enemy?.attack }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model';
import {useBattleStore} from "@/stores/battle-store";

const battleStore = useBattleStore();

const props = defineProps<{
  tile: TileModel
}>();

const enemy = computed(() => props.tile.enemies[0] || null);

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const wasDodged = computed(() => battleStore.missedEnemies.includes(props.tile.id));

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

const getTileBackgroundImage = (tile: TileModel) => {
  const forestTileImagesPath: string[] = [
    '/src/a-game-scenes/battlefield-scene/battlefield/assets/forest-tiles/grass-tile-image.png',
    '/src/a-game-scenes/battlefield-scene/battlefield/assets/forest-tiles/middle-grass-tile-image.png',
    '/src/a-game-scenes/battlefield-scene/battlefield/assets/forest-tiles/grass-tile-image-2.png',
    '/src/a-game-scenes/battlefield-scene/battlefield/assets/forest-tiles/soft-grass-tile-image-2.png',
  ];
  const randomTilePath: string = forestTileImagesPath[Math.floor(Math.random() * forestTileImagesPath.length)];
  return {
    backgroundImage: `url(${randomTilePath})`,
  }
}

const getEnemyImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.enemies[0].imgPath})`,
  }
};

</script>

<style scoped>
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battlefield-map-tile-style.css";
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battle-enemy-tile-style.css";
@import "@/a-game-scenes/battlefield-scene/battlefield/styles/battle-effects-style.css";

.battle-enemy-tile {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.battle-enemy-tile.dodged {
  animation: dodgeShake 0.6s ease-in-out;
}
</style>