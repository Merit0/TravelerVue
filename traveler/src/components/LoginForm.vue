<template>
<section class="loginPage">
<div v-if="userStore.state.error" class="loginFormError"> {{userStore.state.error}} </div>
<div class="loginContainer">
      <h1 class="loginPageTitle" id="loginTitle">Traveler</h1>
      <div class="loginForm">
      <form @submit.prevent="onSubmit" id="itemEntryForm">
        <input v-model="form.username" class="loginSection__input" id="username" type="text" maxlength="40" autocomplete="off" placeholder="Username"/>
        <input v-model="form.password" class="loginSection__input" id="password" type="text" maxlength="40" autocomplete="off" placeholder="Password"/>
        <button id="goButton" class="loginSection_button" type="submit" aria-label="sign in">
          GO
        </button>
      </form>
    </div>
</div>
</section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import userStore from '@/stores/User'
import hero from '@/stores/Hero'

export default defineComponent({
    setup() {
        const form = reactive({
            username: "",
            password: ""
        });

        const onSubmit = () => {
            userStore.login(form.username, form.password);
            form.username = "";
            form.password = "";
            hero.getHero();
        }

        return {form, onSubmit, userStore}
    },
})
</script>
