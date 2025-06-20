<template>
  <img
      v-if="isActionFace(face)"
      :src="`/images/dice-face-icons/dice-${face}-face-image.png`"
      :alt="face"
      class="dice-face-image"
  />
  <dice-enemy-face v-else :face="face"/>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
import {DiceFace} from "@/models/DiceModel";
import DiceEnemyFace from "@/components/dice-roller/dice-enemy-face.vue";

defineProps<{
  face: 'sword' | 'shield' | 'energy' | `x${number}`;
}>();

const isActionFace = (face: DiceFace) => {
  return ['sword', 'shield', 'energy'].includes(face);
};
</script>

<style scoped>
.dice-face-image {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>