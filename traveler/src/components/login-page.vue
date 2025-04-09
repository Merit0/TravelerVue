<template>
  <section class="login-page">
    <video class="background-video" autoplay muted loop playsinline>
      <source src="/videos/login-page/login-page-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="video-overlay">
      <game-logo imageSrc="/images/logos/monstrum-logo.png"></game-logo>
    </div>
    <main class="login-container">
      <login-form></login-form>
    </main>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import GameLogo from "@/components/game-logo.vue";
import LoginForm from "@/components/login-form.vue";


export default defineComponent({
  components: {LoginForm, GameLogo},
})
</script>
<style scoped>
@import '@/styles/login-page.css';
</style>
