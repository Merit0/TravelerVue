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
      <button @click="userStore.logout()" v-if="userStore.isLoggedIn" class="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from 'vue';
import {IHero} from '@/abstraction/IHero';
import {useUserStore} from '@/stores/UserStore'

export default {
  name: "hero-data-bar",
  props: {
    hero: {
      type: Object as PropType<IHero>,
      required: true
    }
  },
  data() {
    const userStore = useUserStore();
    return {userStore};
  },
}
</script>

<style>
.bar {
  position: relative;
  width: 100%;
  margin-top: 2px;
  min-width: 100vh;
  background: linear-gradient(135deg, rgba(55, 21, 0, 0.83), #401b01);
  border-radius: 10px;
  border: 1px solid rgba(96, 75, 61, 0.83);
}

.heroStats {
  display: flex;
  justify-content: space-between;
}

.item {
  background-color: rgb(255, 240, 186);
  border: 2px solid rgb(64, 27, 1);
  border-radius: 5px;
  width: 200px;
  margin: 0.5em;
  display: flex;
  justify-content: center;
}

.heroDetailsText {
  text-align: center;
  font-size: 25px;
  color: rgb(96, 57, 0);
  -webkit-text-stroke: 1px rgb(100, 0, 0);
  margin-left: 10px;
}

.iconImg {
  width: 35px;
  height: 35px;
  background-size: 100%, 100%;
}

.heart {
  background-image: url("@/assets/images/items/heart_icon.png");
}

.doubleSword {
  background-image: url("@/assets/images/items/double_sword.png");
}

.skull {
  background-image: url("@/assets/images/items/skull.png");
  background-size: 110%, 110%;
  border-radius: 100%;
}

.coin {
  background-image: url("@/assets/images/items/coin.png");
}

.logout {
  width: 60px;
  color: #ffc400;
  position: relative;
  background-color: rgba(228, 175, 1, 0.18);
  border: 5px solid rgba(56, 0, 0, 0.603);
  outline-color: rgba(56, 0, 0, 0.603);
}
</style>
