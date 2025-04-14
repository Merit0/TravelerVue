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
    <button class="homeBtn" @click="goCamp()">Home</button>
    <button @click="userStore.logout()" class="logout">Logout</button>
  </div>
<!--  <button @click="quitMap()" class="escapeBtn">Escape</button>-->
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { IHero } from '@/abstraction/IHero';

defineProps<{
  hero: IHero;
}>();

const router = useRouter();
const userStore = useUserStore();

const goCamp = () => {
  router.push('/camping');
};

// const quitMap = async() {
//   if (this.mapLocationStore.isMapLocationCleared) {
//     this.mapLocationStore.isCleared = this.mapLocationStore.isMapLocationCleared;
//   }
//   await this.mapLocationStore.saveProgress(this.mapLocationName).then(() => {
//     router.push("/maps");
//   });
// };

</script>

<style>
@import '@/styles/hero-details-top-bar.css';
.escapeBtn {
  color: #ffb671;
  position: relative;
  width: 100px;
  height: 50px;
  background-color: rgba(255, 196, 0, 0.185);
  border-radius: 10px;
  border: 2px solid rgb(95, 64, 43);
  margin-top: 10px;
  align-self: center;
  margin-left: 45%;
}
</style>
