<template>
  <div class="logo-container">
    <img :src="imageSrc" alt="Monstrum Logo"/>
  </div>
</template>

<script lang="ts">

export default {
  name: "GameLogo",
  props: {
    imageSrc: {
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
@import '@/styles/game-logo-style.css';
</style>