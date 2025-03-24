<template>
  <div class="overlay">
    <div class="overlayContent">
      <div class="imgContainer"></div>
      <button @click="quitMap()" class="quit">Camp</button>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';

export default {
  methods: {
    async quitMap() {
      router.push("/camping");
    }
  }
}
</script>

<style>
.overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.404);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.overlayContent {
  width: 1200px;
  height: 700px;
  background-color: rgba(65, 0, 0, 0.781);
  box-shadow: 0 -3px 15px 4px rgba(255, 195, 195, 0.5);
  border-radius: 20px;
  margin-top: 50px;
  padding: 40px;
  align-items: center;

}

.imgContainer {
  width: 1000px;
  height: 550px;
  border-radius: 20px;
  margin: auto;
  background-image: url("../assets/images/deathOverlayBackground.jpg");
  margin-top: 5px;
}

</style>