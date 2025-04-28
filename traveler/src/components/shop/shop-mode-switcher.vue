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
  background: rgba(87, 86, 86, 0.66);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  user-select: none;

}

.switcher-option {
  flex: 1;
  text-align: center;
  z-index: 1;
  color: #aaa;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.switcher-option.active {
  color: white;
}

.switcher-indicator {
  position: absolute;
  top: 5px;
  bottom: 5px;
  width: 50%;
  background: linear-gradient(135deg, #7a3cff, #b066ff);
  border-radius: 1.5rem;
  transition: transform 0.4s ease;
  z-index: 0;
}
</style>