<template>
    <title>Home</title>
    <div class="page">
        <HeroDetailsBar :hero="hero"></HeroDetailsBar>
        <section class="homeContent">
            <MapsList></MapsList>
            <div class="homeButtons">
                <button id="openInventoryBtn" @click="inventory()"></button>
                <button @click="userStore.logout()" v-if="userStore.isLoggedIn" class="logout">Logout</button>
            </div>
            <BagInventory :hero="hero" v-if="showInventory"></BagInventory>
        </section>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/UserStore'
import HeroDetailsBar from './HeroDetailsBar.vue';
import BagInventory from './BagInventory.vue';
import MapsList from './MapsList.vue';
import { useHeroStore } from '../stores/HeroStore'
import { IHero } from '@/abstraction/IHero'

export default {
    name: "HomePage",
    components: { HeroDetailsBar, BagInventory, MapsList },
    data() {
        const userStore = useUserStore();
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        let showInventory = false;
        return { userStore, hero, heroStore, time: '', showInventory};
    },
    methods: {
        async increaseHealth() { 
            let count = 0;
            this.time = setInterval(() => {  
                if(this.heroStore.hero.getHealth() < this.heroStore.hero.maxHealth && count < this.heroStore.hero.maxHealth)     {
                    this.heroStore.hero.healthIncreaser();
                    count++;
                }else {
                    clearInterval(this.time);
                }   
                }, 3000); 
        },    
        async inventory() {
            if (!this.showInventory) {
                this.showInventory = true;
            } else {
                this.showInventory = false;
            }
        }
    },
    mounted() {
        this.increaseHealth();
    },
    unmounted() {
        clearInterval(this.time);
    }
}
</script>

<style>
.homeButtons {
    width: 220px;
    height: 120px;
    margin-top: 270px;
    margin-left: 1800px;
    display: flex;
    justify-content:space-between;
    align-items: center;
}
.homeContent {
    margin-top: 10px;
    min-height: 90vh;
    border-radius: 20px;
    border: 2px solid rgb(95, 64, 43);
    background-image: url('@/assets/images/img.jpg');
    background-size: 100%;
}

.logout {
    color:#630000;
    position: relative;
    width: 100px;
    height: 100px;
    background-color:rgba(202, 155, 0, 0.185);
    border: 1px solid rgba(56, 0, 0, 0.603);
    outline-color: rgba(56, 0, 0, 0.603);
    border-radius:30%;
    background-size: 100px 100px;
 }
</style>
      
