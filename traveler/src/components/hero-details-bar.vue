<template>
  <div class="bar">
    <div class="heroStats">
      <div class="item">
        <p class="heroDetailsText" label="heroName"> {{ hero.name }} </p>
      </div>
      <div class="item">
        <div class="iconImg heart"></div>
        <p class="heroDetailsText" label="heroHealth">{{ hero.currentHealth }} / {{ hero.maxHealth }}</p>
      </div>
      <div class="item">
        <div class="iconImg doubleSword" label="heroAttack"></div>
        <p class="heroDetailsText">{{ hero.attack }}</p>
      </div>
      <div class="item">
        <div class="iconImg skull" label="heroKills"></div>
        <p class="heroDetailsText">{{ hero.kills }}</p>
      </div>
      <div class="item">
        <div class="iconImg coin" label="heroCoins"></div>
        <p class="heroDetailsText">{{ hero.coins }}</p>
      </div>
    </div>
    <button @click="userStore.logout()" class="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useUserStore } from '@/stores/UserStore';
import { IHero } from '@/abstraction/IHero';

defineProps<{
  hero: IHero;
}>();

const userStore = useUserStore();

</script>

<style>
@import '@/styles/hero-details-top-bar.css';
</style>
