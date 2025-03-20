<template>
  <title>Login</title>
  <section class="loginPage">
    <div v-if="userStore.error" class="loginFormError"> {{ userStore.error }}</div>
    <div class="loginContainer">
      <h1 class="loginPageTitle" id="loginTitle" title="Traveler">Traveler</h1>
      <div class="loginForm">
        <form @submit.prevent="onSubmit" id="itemEntryForm">
          <input v-model="form.username" class="loginSection__input" id="username" type="text" maxlength="40"
                 autocomplete="off" placeholder="Username"/>
          <input v-model="form.password" class="loginSection__input" id="password" type="text" maxlength="40"
                 autocomplete="off" placeholder="Password"/>
          <button id="goButton" class="loginSection_button" type="submit" aria-label="sign in">
            GO
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent, reactive, onMounted} from 'vue';
import {useUserStore} from '@/stores/UserStore'


export default defineComponent({
  setup() {
    const userStore = useUserStore();

    const form = reactive({
      username: "",
      password: ""
    });

    const onSubmit = () => {
      userStore.login(form.username, form.password);
      form.username = "";
      form.password = "";
    }

    onMounted(() => userStore.clearErrorMsg());

    return {form, onSubmit, userStore}
  }
})
</script>
<style scoped>
.loginPage {
  min-height: 100vh;
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  background-image: url('@/assets/images/loginPageBackground.jpg');
}
</style>
