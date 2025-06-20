<template>
  <div
      class="battle-initial-tile-view battle-map-tile"
      :style="getTileBackgroundImage(tile)"
  >
    <div
        class="battle-hero-tile"
        :style="heroImgStyle"
        :class="{ flipped }"
        @mousemove="handleMouse">
      <div class="damage-popup" v-if="damageValue">
        -{{ damageValue }}
      </div>
      <div class="blood-splash" v-if="bloodSplash"/>
      <button
          class="battle-map-tile tileButton"
          @click="openInventory()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps, ref} from 'vue';
import TileModel from '@/models/TileModel';
import {useHeroStore} from "@/stores/HeroStore";
import {useBattleStore} from "@/stores/battle-store";

const battleStore = useBattleStore();
const heroStore = useHeroStore();

const props = defineProps<{
  tile: TileModel
}>();

const flipped = ref(false);

const damageValue = computed(() => {
  return battleStore.damagePopups[props.tile.id] || null
});

const bloodSplash = computed(() => {
  return battleStore.bloodSplashTiles.includes(props.tile.id)
});

function handleMouse(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2

  flipped.value = e.clientX > centerX
}

const getTileBackgroundImage = (tile: TileModel) => {
  return {
    backgroundImage: `url(${tile.backgroundSrc})`,
    'background-size': '100% 100%'
  }
}

const heroImgStyle = computed(() => ({
  backgroundImage: `url(${heroStore.hero.imgPath})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}));

const openInventory = () => {
  heroStore.inventoryShown = true;
};

</script>

<style scoped>

.battle-hero-tile {
  background-size: cover;
  animation: heroJump 0.5s ease-out;
  background-repeat: no-repeat;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.battle-hero-tile.flipped {
  transform: scaleX(-1);
}

.battle-map-tile {
  height: 11vh;
  aspect-ratio: 1 / 1;
  box-sizing: border-box;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.battle-initial-tile-view {
  will-change: transform;
  background-size: 100% 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.battle-hero-tile {
  image-rendering: crisp-edges;
}

.battle-initial-tile-view:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
}

.damage-popup {
  position: absolute;
  top: -5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2vh;
  color: #ff4a4a;
  font-weight: bold;
  text-shadow: 0 0 5px black;
  animation: damageFloat 1.2s ease-out;
  pointer-events: none;
  z-index: 15;
}

.blood-splash {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/images/overlays/battlefield/blood-splash-effect-image.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  animation: bloodFadeOut 1s ease-out forwards;
  pointer-events: none;
  z-index: 2;
}
</style>