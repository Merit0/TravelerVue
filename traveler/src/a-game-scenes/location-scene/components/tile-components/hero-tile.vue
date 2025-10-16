<template>
  <div
      class="initialTileView mapTile"
      :style="tileBackgroundStyle"
      @mouseenter="isHoveringHero = true"
      @mouseleave="isHoveringHero = false"
  >
    <div
        class="inventory-button"
        @click="openInventory"
    >
      <hero-top-view
          container="map-hero-view"
          scale="0.3"
          test-id="map-hero-top-view-container"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from "vue";
import TileModel from '@/a-game-scenes/silesia-world-scene/models/tile-model'
import {useHeroStore} from '@/stores/HeroStore'
import HeroTopView from "@/components/hero-top-view.vue";

const heroStore = useHeroStore()

const props = defineProps<{
  tile: TileModel
}>();

const tileBackgroundStyle = computed(() => ({
  backgroundImage: `url(${props.tile.backgroundSrc})`,
  backgroundSize: '100% 100%',
}))

const openInventory = () => {
  heroStore.inventoryShown = true
}
</script>

<style scoped>
.inventory-button {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
}
</style>
