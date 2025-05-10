<template>
  <div class="hero-details-container">
    <div class="stat-row" v-for="(stat, index) in stats" :key="index">
      <span class="tooltip">{{ stat.tooltip }}</span>
      <div class="icon" :class="stat.iconClass"/>
      <div class="bar-container" :style="{ backgroundColor: stat.bgColor }">
        <div
            class="bar-fill"
            :class="{ danger: stat.name === 'Health' && stat.percentage <= 25 }"
            :style="{
            width: stat.percentage + '%',
            background: stat.fillColor
          }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useHeroStore} from '@/stores/HeroStore';

export default defineComponent({
  name: 'hero-core-details',
  setup() {
    const {hero} = useHeroStore();

    const healthPercentage = computed(() => {
      if (!hero.maxHealth || hero.maxHealth === 0) return 0;
      return Math.min(100, Math.round((hero.currentHealth / hero.maxHealth) * 100));
    });

    const stats = computed(() => [
      {
        name: 'Health',
        percentage: Math.round((hero.currentHealth / hero.maxHealth) * 100),
        fillColor: 'linear-gradient(to bottom, #aa4444 0%, #5a0000 50%, #aa4444 100%)',
        bgColor: '#ffeeaa',
        tooltip: `${healthPercentage.value}%`,
        iconClass: 'heart-icon',
      },
      {
        name: 'Attack',
        percentage: Math.min(hero.attack * 10, 100),
        fillColor: '#fb8c00',
        bgColor: '#ffeeaa',
        tooltip: `${hero.attack}`,
        iconClass: 'crossed-swords-icon',
      },
      {
        name: 'Defense',
        percentage: 0,
        fillColor: '#8d6e63',
        bgColor: '#ffeeaa',
        tooltip: `0`,
        iconClass: 'shield-icon',
      },
    ]);

    return {stats};
  }
});
</script>

<style scoped>
@import '@/styles/inventory-style/hero-core-details-style.css';
</style>