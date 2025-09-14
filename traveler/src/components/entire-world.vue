<template>
  <hex-world-map :tiles="tiles"/>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {HexTileModel} from '@/a-game-scenes/silesia-world-scene/models/hex-tile-model';
import HexWorldMap from "@/a-game-scenes/silesia-world-scene/hex-world-map.vue";
import { useWorldMapStore } from '@/stores/world-map-store';

const store = useWorldMapStore();
store.loadFromStorage();
store.generateIfEmpty();


const tiles = ref<HexTileModel[]>([]);
tiles.value = store.map.tiles;
</script>