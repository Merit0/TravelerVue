<template>
  <div class="battleEnemyTile" :style="getStyle(enemy)" v-if="enemyShown && enemyAlive">
    <div class="infoBlock">
      ℹ️
      <div class="tooltipText">
        <h3>Enemy Info</h3>
        <p><strong>ID:</strong> {{ enemy.id }}</p>
        <p><strong>Health:</strong> {{ enemy.health }}</p>
        <p><strong>Attack:</strong> {{ enemy.attack }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EnemyModel from '@/models/EnemyModel';

export default {
  name: "battle-enemy-tile",
  props: {
    enemy: {
      type: Object,
      required: true
    },
    enemyShown: {
      type: Boolean,
      default: false
    },
    enemyAlive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getStyle(enemy: EnemyModel) {
      return {
        backgroundImage: `url(${enemy.imgPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 12px rgba(255, 0, 0, 0.5)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      };
    }
  }
}
</script>

<style scoped>
.battleEnemyTile {
  width: 10vw;
  height: 20vh;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.battleEnemyTile:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
}

/* Info badge */
.infoBlock {
  position: absolute;
  background-color: #fff;
  color: #333;
  font-size: 1.2vw;
  font-weight: bold;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  text-align: center;
  line-height: 2vw;
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  z-index: 5;
}

/* Tooltip */
.tooltipText {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 110%;
  right: 50%;
  transform: translateX(50%);
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  width: max-content;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  transition: opacity 0.3s ease;
  font-size: 0.8vw;
  z-index: 10;
}

.infoBlock:hover .tooltipText {
  visibility: visible;
  opacity: 1;
}
</style>