<template>
    <section class="homePage">
        <div class="heroStats">
            <div class="leftBar heroStats">
                <div class="heroHealth item">Health: {{ Hero.state.hero.getHealth() }}</div>
                <div class="heroAttack item">Attack: {{ Hero.state.hero.getAttack() }}</div>
            </div>
            <div class="rightBar heroStats">
                <div class="heroDiffense item">Diffense: {{ Hero.state.hero.getDefense() }}</div>
                <div class="heroCoins item">Coins: {{ Hero.state.hero.getCoins() }}</div>
            </div>
        </div>
        <button @click="userStore.logout()" class="logout">Logout</button>
        <h2 class="heroName">{{ userStore.state.user.getName() }}</h2>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userStore from '@/stores/User';
import Hero from '@/stores/Hero'

export default defineComponent({
    name: "HomePage",
    setup() {
        const userId: number = userStore.state.user.getId();
        Hero.getHero(userId);
            
        return { userStore, Hero };
    },
})
</script>
