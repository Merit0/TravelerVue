<template>
  <div class="battlefield-overlay">
    <div class="battlefield-modal-content">
      <button class="escapeButton" @click="closeOverlay()">
        🏃
      </button>
      <div class="battleArea">
        <battle-grid :tile="tile"></battle-grid>
        <div class="battle-controls-gui">
          <div class="attack-button"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBattleStore} from '@/stores/battle-store'
import {computed} from 'vue'
import BattleGrid from "@/components/battle/battle-grid.vue";
import {useOverlayStore} from "@/stores/overlay-store";

const battleStore = useBattleStore();
const tile = computed(() => battleStore.tileWithEnemies);
const closeOverlay = () => {
  const overlayStore = useOverlayStore();
  const battleStore = useBattleStore();
  battleStore.finishBattle();
  overlayStore.closeOverlay();
}
</script>

<style scoped>
@import "@/styles/battlefield-style/battlefield-overlay-stile.css";

.attack-button {
  position: relative;
  width: 5vw;
  height: 5vh;
  background: #cbd3ff;
}

.battle-controls-gui {
  position: relative;
  width: 30vw;
  height: 10vw;
  background: #025E3E;
}
</style>