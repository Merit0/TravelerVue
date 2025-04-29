<template>
  <div class="switcher">
    <div
        class="switcher-option"
        :class="{ active: isBuyMode }"
        @click="$emit('update:isBuyMode', true)"
    >
      SHOP
    </div>
    <div
        class="switcher-option"
        :class="{ active: !isBuyMode }"
        @click="$emit('update:isBuyMode', false)"
    >
      TRADE
    </div>
    <div
        class="switcher-indicator"
        :style="indicatorStyle"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "shop-mode-switcher",
  props: {
    isBuyMode: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['update:isBuyMode'],
  computed: {
    indicatorStyle() {
      return {
        transform: this.isBuyMode ? 'translateX(0%)' : 'translateX(100%)',
      };
    },
  },
};
</script>

<style scoped>
.switcher {
  position: absolute;
  top: 20vh;
  width: 50vw;
  height: 4vh;
  background: rgba(225, 245, 255, 0.15);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  user-select: none;
  backdrop-filter: blur(8px); /* ефект замерзлого скла */
  box-shadow: inset 0 0 10px rgba(200, 230, 255, 0.15), 0 0 12px rgba(180, 220, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.switcher-option {
  flex: 1;
  text-align: center;
  z-index: 2;
  color: #cfeaff;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.switcher-option:hover {
  color: #ffffff;
  text-shadow: 0 0 4px rgba(220, 245, 255, 0.8);
}

.switcher-option.active {
  color: #324d68;
  text-shadow:
      0 0 2px rgba(137, 111, 253, 0.6),
      0 0 10px rgba(56, 144, 255, 0.4);
}

.switcher-indicator {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 50%;
  background: linear-gradient(135deg, #c9eeff, #a9dcff);
  border-radius: 1.5rem;
  transition: transform 0.4s ease;
  box-shadow: 0 0 8px rgba(200, 240, 255, 0.4);
  z-index: 1;
}
</style>