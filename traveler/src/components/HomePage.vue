<template>
    <div class="page">
        <HeroDataBar :hero="hero"></HeroDataBar>
        <section class="content">
            <MapsList></MapsList>
            <div class="buttons">
                <BagInventory></BagInventory>
                <button @click="userStore.logout()" v-if="userStore.getters.isLoggedIn" class="logout">Logout</button>
            </div>
        </section>
    </div>
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

<style>
.buttons {
    display: flex;
}
.page {
    background-color: black;
    min-height: 100vh;
    padding: 5px;
}
.content {
    margin-top: 10px;
    min-height: 90vh;
    border-radius: 20px;
    border: 2px solid rgb(95, 64, 43);
    background-image: url('@/assets/images/img.jpg');
    background-size: flex-direction;
}

.logout {
    color:#ffb671;
    position: relative;
    width: 100px;
    height: 100px;
    background-color:rgba(255, 196, 0, 0.185);
    outline-color: rgba(0, 0, 0, 0.295);
    outline-width: 3px;
    outline-style: solid;
    border-radius:30%;
    background-size: 100px 100px;
    margin-top: 400px;
    margin-left: 50px;
 }
</style>
      
