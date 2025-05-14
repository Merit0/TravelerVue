<template>
  <div
      class="dice"
      :class="[
      { rolling: isRolling },
      effectClass
    ]"
  >
    <img :src="`images/dice-face-icons/${face}.png`" :alt="face" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineProps } from 'vue';

const props = defineProps<{
  face: 'sword' | 'shield' | 'energy';
  isRolling: boolean;
}>();

const flash = ref(false);

// Визначаємо CSS-клас для анімації за типом грані
const effectClass = computed(() => {
  if (props.isRolling || !flash.value) return '';
  return `flashed-${props.face}`;
});

// Запускаємо ефект одразу після завершення ролу
watch(() => props.isRolling, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    flash.value = true;
    setTimeout(() => {
      flash.value = false;
    }, 600);
  }
});
</script>

<style scoped>
.dice {
  width: 4vw;
  height: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.dice img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.rolling {
  animation: spin 0.3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* === Анімації для кожного типу === */

@keyframes flash-sword {
  0%, 100% { box-shadow: none; transform: scale(1); }
  50% { box-shadow: 0 0 20px rgba(255, 140, 0, 0.9); transform: scale(1.15); }
}

@keyframes flash-shield {
  0%, 100% { box-shadow: none; transform: scale(1); }
  50% { box-shadow: 0 0 20px rgba(0, 200, 255, 0.9); transform: scale(1.15); }
}

@keyframes flash-energy {
  0%, 100% { box-shadow: none; transform: scale(1); }
  50% { box-shadow: 0 0 20px rgba(255, 255, 150, 0.9); transform: scale(1.15); }
}

.flashed-sword {
  animation: flash-sword 0.6s ease;
}

.flashed-shield {
  animation: flash-shield 0.6s ease;
}

.flashed-energy {
  animation: flash-energy 0.6s ease;
}
</style>