<template>
    <section class="homePage">
        <HeroDataBar :hero="hero"></HeroDataBar>
        <BagInventory></BagInventory>
        <MapsList></MapsList>
        <button @click="userStore.logout()" v-if="userStore.getters.isLoggedIn" class="logout">Logout</button>
    </section>
</template>

<script lang="ts">
import userStore from '@/stores/User';
import heroStore from '@/stores/HeroStore'
import HeroDataBar from './HeroDataBar.vue';
import BagInventory from './BagInventory.vue';
import MapsList from './MapsList.vue';

export default {
    name: "HomePage",
    components: { HeroDataBar, BagInventory, MapsList },
    data() {
        const userId: number = userStore.state.user.getId();
        heroStore.getHero(userId);
        const hero = heroStore.state.hero;
        return { userStore, hero };
    }
}
</script>
      
