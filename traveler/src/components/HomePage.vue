<template>
    <div class="page">
        <HeroDetailsBar :hero="hero"></HeroDetailsBar>
        <section class="content">
            <MapsList></MapsList>
            <div class="buttons">
                <BagInventory></BagInventory>
                <button @click="userStore.logout()" v-if="userStore.isLoggedIn" class="logout">Logout</button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/UserStore'
import HeroDetailsBar from './HeroDetailsBar.vue';
import BagInventory from './BagInventory.vue';
import MapsList from './MapsList.vue';
import { useHeroStore } from '../stores/HeroStore'

export default {
    name: "HomePage",
    components: { HeroDetailsBar, BagInventory, MapsList },
    data() {
        const userStore = useUserStore();
        const heroStore = useHeroStore();
        const hero = heroStore.hero;
        return { userStore, hero, heroStore, time: ''};
    },
    methods: {
        async increaseHealth() { 
        let count = 0;
        this.time = setInterval(() => {  
            if(this.heroStore.hero.getHealth() < 100 && count < 100)     {
                this.heroStore.hero.healthIncreaser();
                count++;
            }else {
                clearInterval(this.time);
            }   
            }, 3000); 
        },        
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
.buttons {
    display: flex;
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
      
