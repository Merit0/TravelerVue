<template>
  <div class="battlefield-logger-container">
    <p class="logger-title">Battle Log:</p>
    <div class="logger-list">
      <p v-for="(log, index) in battleStore.battleLog" :key="index">
        {{ log }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useBattleStore} from "@/stores/battle-store";

const battleStore = useBattleStore();
</script>


<style scoped>

.energy-image img {
  width: 180%;
  height: 180%;
  object-fit: contain;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
}

.battlefield-logger-container {
  position: relative;
  margin-top: 4%;
  margin-bottom: 3%;
  right: -58vh;
  width: 18vw;
  height: 71vh;
  background: rgb(64, 27, 1);
  border-radius: 5px;
  color: #ffe900;
  text-align: left;
  padding: 1vh;
  overflow-y: auto;
  font-family: 'Crimson Pro', cursive;
  font-size: 1.4vh;
  z-index: 0;
  box-shadow: inset 0 0 5px rgb(0, 20, 115);
}

.logger-title {
  font-weight: bold;
  margin-bottom: 0.5vh;
  color: #fff300;
  font-size: 1.4vh;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  font-family: 'IM Fell English SC', cursive;
  text-align: center;
}

.logger-list p {
  margin: 0.2vh 0;
  animation: fadeLog 0.3s ease-in;
}

@keyframes fadeLog {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>