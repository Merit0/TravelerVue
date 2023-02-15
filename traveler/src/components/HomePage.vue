<template>
    <section class="homePage">
        <HeroDataBar></HeroDataBar>
        <BagInventory></BagInventory>
        <MapTiles></MapTiles>
        <button @click="userStore.logout()" v-if="userStore.getters.isLoggedIn" class="logout">Logout</button>
        <h2 class="heroName">{{ userStore.state.user.getName() }}</h2>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import userStore from '@/stores/User';
import heroStore from '@/stores/HeroStore'
import HeroDataBar from './HeroDataBar.vue';
import BagInventory from './BagInventory.vue';
import MapTiles from './MapTiles.vue';

export default {
    name: "HomePage",

    components: { HeroDataBar, BagInventory, MapTiles },

    data() {
        const userId: number = userStore.state.user.getId();
        heroStore.getHero(userId);
            
        return { userStore, heroStore };
    },

    methods: {

    }
}
</script>
<style>

</style>/