<template>
  <div class="bag-content">
    <div class="bag-title-container">
      <span class="bag-title">Bag</span>
    </div>
    <bag-inventory-slots-grid></bag-inventory-slots-grid>
    <div class="separator-wooden-plank"></div>
    <div class="right-side-wooden-plank"></div>
  </div>
</template>
<script lang="ts">

import BagInventorySlotsGrid from "@/components/hero-equipment-modal/bag-inventory/bag-inventory-slots-grid.vue";

export default {
  name: "hero-bag-inventory",
  components: {
    BagInventorySlotsGrid,
  }
}
</script>

<style scoped>
.bag-content {
  position: absolute;
  align-items: center;
  display: flex;
  flex-direction: column;
  right: 0;
  width: 27vw;
  height: 100%;
  background: #27171b;
  background-size: 100%, 100%;
  z-index: 1;
}

.bag-title-container {
  position: relative;
  margin-top: 9vh;
  width: 15vh;
  height: 5vh;
  text-align: center;
  align-content: center;
}

.bag-title {
  font-size: 3.2vh;
  font-weight: 700;
  color: #ffdfb0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6),
  0 0 5px rgba(255, 230, 200, 0.15);

  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: 'Cinzel', serif;
}

.right-side-wooden-plank {
  position: absolute;
  right: 0;
  width: 0.7rem;
  height: 100%;
  background: linear-gradient(
      to left,
      #513139 0%,
      #3a2329 50%,
      #685353 100%
  );
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1),
  0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #252525;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.separator-wooden-plank {
  position: absolute;
  left: 0;
  width: 0.7rem;
  height: 100%;
  background: linear-gradient(
      to left,
      #685353 0%,
      #3a2329 50%,
      #685353 100%
  );
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.1),
  0 0 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #252525;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
</style>