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
            <ul class="inventory_showButtonDiv">
                <div class="inventory_showButton" id="inventory_openbutton" @click="userStore.open_inventoty()"></div>
            </ul>
            <ul class="bag" id="bag" style="visibility: hidden;">
                <ul class="bag_frame">
                    <ul class="bag_inner">
                        <ul class="bag_helmet_slot">
                            <ul class="item_slot">
                                <li class="add_item_button" @click="userStore.add_item_to_slot()"></li>
                            </ul>
                        </ul>
                        <ul class="bag_armour_slot">
                            <ul class="item_slot">
                                <li class="add_item_button" @click="userStore.add_item_to_slot()"></li>
                            </ul>
                        </ul>
                        <ul class="bag_sword_slot">
                            <ul class="item_slot">
                                <li class="add_item_button" @click="userStore.add_item_to_slot()"></li>
                            </ul>
                        </ul>
                        <ul class="bag_shield_slot">
                            <ul class="item_slot">
                                <li class="add_item_button" @click="userStore.add_item_to_slot()"></li>
                            </ul>
                        </ul>
                    </ul>
                </ul>
            </ul>
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
