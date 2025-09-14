<template>
  <div
      v-if="!tile.isInitial && !hasAliveEnemies && !tile.isHeroHere"
      class="mapTile"
      :style="getTileBackground(tile)"
  ></div>
</template>

<script lang="ts">

import TileModel from "@/models/TileModel";
import {PropType} from 'vue';
import EnemyModel from "@/models/EnemyModel";

export default {
  name: "empty-tile",
  props: {
    tile: {
      type: Object as PropType<TileModel>,
      required: true
    }
  },
  computed: {
    firstAliveEnemy(): EnemyModel | null {
      return this.tile.enemies.find((e) => e.health > 0) || null;
    },
    hasAliveEnemies(): boolean {
      return !!this.firstAliveEnemy && this.tile.enemies.length > 0;
    }
  },
  methods: {
    getTileBackground(tile: TileModel) {
      return {
        backgroundImage: `url(${tile.backgroundSrc})`,
        'background-size': '100% 100%'
      }
    }
  }
}
</script>