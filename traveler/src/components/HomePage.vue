<template>
    <section class="homePage">
        <div class="heroStats">
            <div class="leftBar heroStats">
                <div class="heroHealth item">Health: {{ heroStats.state.health }}</div>
                <div class="heroAttack item">Attack: {{ heroStats.state.attack }}</div>
            </div>
            <div class="rightBar heroStats">
                <div class="heroDiffense item">Diffense: {{ heroStats.state.diffense }}</div>
                <div class="heroCoins item">Coins: {{ heroStats.state.coins }}</div>
            </div>
        </div>
        <button @click="userStore.logout()" class="logout">Logout</button>
        <h2 class="heroName">{{ userStore.state.name }}</h2>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userStore from '@/stores/User';
import heroStats from '@/stores/Hero'

export default defineComponent({
    name: "HomePage",
    setup() {
        return { userStore, heroStats };
    },
})
</script>
