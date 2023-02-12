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
        <div>
        <div class="inventory_showButton" id="inventory_openbutton" @click="userStore.open_inventoty()"></div>
        <div class="bag" id="bag" style="visibility: hidden;">
            <div class="bag_frame">
                <ul class="bag_inner">
                    <li class="item_holder">
                        <div class="img_helmet"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_armor"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_sword"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                    <li class="item_holder">
                        <div class="img_shield"></div>
                        <div class="add_item_slot">
                            <div class="add_item_button" @click="add_item_to_slot()"></div>
                        </div>
                    </li>
                </ul>
            </div>
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
    methods: {
        async add_item_to_slot() {
            alert('No functionality yet!')
        }
    }
})
</script>
