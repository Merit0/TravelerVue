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
@import "@/styles/battlefield-style/battlefield-map-tile-style.css";
@import "@/styles/battlefield-style/battle-hero-tile-style.css";
@import "@/styles/battlefield-style/battle-effects-style.css";
</style>