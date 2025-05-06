<template>
  <div class="close-button-container">
    <div class="closeInventoryBtn" @click="$emit('heroInventory')">CLOSE</div>
  </div>
</template>
<script lang="ts">

export default {
  name: "CloseHeroInventoryModalButton",
  emits: ["heroInventory"],
}
</script>