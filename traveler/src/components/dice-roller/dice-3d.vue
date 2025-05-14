<template>
  <div class="dice-wrapper" :class="{ rolling: isRolling }">
    <div class="dice" :style="rotationStyle">
      <div class="face front"><img :src="getFaceImage('sword')"  alt="sword"/></div>
      <div class="face back"><img :src="getFaceImage('shield')" alt="shield"/></div>
      <div class="face right"><img :src="getFaceImage('energy')" alt="energy"/></div>
      <div class="face left"><img :src="getFaceImage('sword')" alt="sword"/></div>
      <div class="face top"><img :src="getFaceImage('shield')" alt="shield"/></div>
      <div class="face bottom"><img :src="getFaceImage('energy')" alt="energy"/></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  face: 'sword' | 'shield' | 'energy';
  isRolling: boolean;
}>();

// Обертання кубика при прокрутці
const rotationStyle = computed(() => {
  if (!props.isRolling) return getStaticRotation(props.face);
  const x = Math.random() * 360;
  const y = Math.random() * 360;
  return `transform: rotateX(${x}deg) rotateY(${y}deg);`;
});

function getFaceImage(type: string) {
  return `/images/dice-face-icons/${type}.png`;
}

// Після прокрутки — зупиняємося на грані
function getStaticRotation(face: string) {
  switch (face) {
    case 'sword': return 'transform: rotateX(0deg) rotateY(0deg);';
    case 'shield': return 'transform: rotateX(0deg) rotateY(180deg);';
    case 'energy': return 'transform: rotateX(90deg) rotateY(0deg);';
    default: return '';
  }
}
</script>

<style scoped>
.dice-wrapper {
  width: 3vw;
  height: 3vw;
  perspective: 600px;
}

.dice {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1.5s ease;
  position: relative;
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #fff9c4 0%, #ffe082 60%, #fbc02d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border-radius: 0.5rem;

  border: 1px solid rgba(0, 0, 0, 0.15);

  box-shadow:
      inset 0 0 4px rgba(255, 255, 255, 0.2),  /* легке внутрішнє світіння */
      0 2px 4px rgba(0, 0, 0, 0.2);           /* зовнішня тінь як глибина */
}

.face img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

/* Розміщення граней */
.front  { transform: rotateY(  0deg) translateZ(1.5vw); }
.back   { transform: rotateY(180deg) translateZ(1.5vw); }
.right  { transform: rotateY( 90deg) translateZ(1.5vw); }
.left   { transform: rotateY(-90deg) translateZ(1.5vw); }
.top    { transform: rotateX( 90deg) translateZ(1.5vw); }
.bottom { transform: rotateX(-90deg) translateZ(1.5vw); }
</style>