<template>
    <form class="login-form" @submit.prevent="onSubmit" novalidate>
      <div class="form-field">
        <input
            v-model.trim="form.username"
            class="login-form-input"
            data-testid="username"
            type="text"
            maxlength="40"
            autocomplete="off"
            placeholder="Username"
            required
            @input="clearError"
        />
      </div>
      <div class="form-field">
        <input
            v-model.trim="form.password"
            class="login-form-input"
            data-testid="password"
            :type="showPassword ? 'text' : 'password'"
            maxlength="40"
            autocomplete="off"
            placeholder="Password"
            required
            @input="clearError"
        />
        <button
            type="button"
            class="toggle-password"
            @click="togglePassword"
            aria-label="Toggle password visibility"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </button>
      </div>
      <button
          class="login-form-submit"
          type="submit"
          :disabled="isLoading"
          aria-label="Sign in"
      >
        {{ isLoading ? 'Loading...' : 'PLAY' }}
      </button>
    </form>
    <transition name="fade">
      <div v-if="userStore.error" class="login-form-error">
        {{ userStore.error }}
      </div>
    </transition>
</template>

<script lang="ts">
import {useUserStore} from "@/stores/UserStore";
import {defineComponent, reactive, ref, onMounted} from 'vue';

export default defineComponent({
  name: "LoginForm",
  setup() {
    const userStore = useUserStore();
    const form = reactive({
      username: "",
      password: ""
    });
    const showPassword = ref(false);
    const isLoading = ref(false);
    const onSubmit = async () => {
      try {
        isLoading.value = true;
        await userStore.login(form.username, form.password);
        form.username = '';
        form.password = '';
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const clearError = () => {
      if (userStore.error) {
        userStore.clearErrorMsg();
      }
    };

    onMounted(() => {
      userStore.clearErrorMsg();
      userStore.logout()
      document.title = 'Monstrum - Login';
    });

    return {
      form,
      userStore,
      showPassword,
      isLoading,
      onSubmit,
      togglePassword,
      clearError
    }
  }
});
</script>

<style scoped>

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0.5rem;
}

.form-field {
  position: relative;
}

.login-form-input {
  width: 100%;
  padding: 0.2rem;
  border: 1px solid #ae8e00;
  border-radius: 6px;
  font-size: 1rem;
  color: white;
  background: linear-gradient(135deg, #292929, #252121);
}

.login-form-input:focus {
  outline: none;
  box-shadow: 0 0 0 1px rgb(32, 32, 32);
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #ffcccc;
}

.login-form-submit {
  position: relative;
  width: 100%;
  top: 10rem;
  background: linear-gradient(135deg, #292929, #252121);
  color: #ffb888;
  border-radius: 6px;
  border: 1px solid #ae8e00;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
  height: 1.6rem;
  text-align: center;
}

.login-form-submit:hover:not(:disabled) {
  background-color: rgba(64, 26, 0, 0.83);
}

.login-form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-form-error {
  position: absolute;
  top: 1rem;
  margin-left: 100px;
  z-index: 1;
  padding: 0.3rem;
  color: #c62828;
  border-radius: 4px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-form-input::placeholder {
  font-size: 10px;
  color: #636363 !important;
}
</style>