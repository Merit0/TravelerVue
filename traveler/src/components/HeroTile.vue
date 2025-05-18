<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackgroundStyle"
  >
    <div
        class="mapTile heroTile"
        :style="heroImgStyle"
        :class="{ flipped }"
    >
      <button
          class="mapTile tileButton"
          @click="openInventory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import TileModel from '@/models/TileModel'
import { useHeroStore } from '@/stores/HeroStore'

const props = defineProps<{
  tile: TileModel
}>()

const heroStore = useHeroStore()

const heroImgStyle = computed(() => ({
  backgroundImage: `url(${heroStore.hero.imgPath})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}))

const flipped = heroStore.hero.flippedImage;

const tileBackgroundStyle = computed(() => ({
  backgroundImage: `url(${props.tile.backgroundSrc})`,
  backgroundSize: '100% 100%',
}))

const openInventory = () => {
  heroStore.inventoryShown = true
}
</script>

<style scoped>
@keyframes heroJump {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

.heroTile {
  width: 100%;
  height: 100%;
  animation: heroJump 0.5s ease-out;
  background-repeat: no-repeat;
  transition: transform 0.4s ease-in-out;
}

.heroTile.flipped {
  transform: scaleX(-1);
}
</style>
