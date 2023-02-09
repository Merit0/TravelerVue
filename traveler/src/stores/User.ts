import { computed, reactive } from 'vue'
import * as Request from '@/stores/Requests'
import router from '@/router/index';

const state = reactive({
    name: "",
    username: "",

    error: ""
});

const getters = reactive({
    isLoggedIn: computed(() => state.username !== "")
});

const actions = {
    async getUser() {
        const user = await Request.getUser();
        if (!user.loggedIn) {
            console.log(user.username + " in not logged in");
            return;
        }
        state.name = user.name;
        state.username = user.username;
    },

    async login(username: string, password: string) {
        const user = await Request.login(username, password);
        if (user == null) {
            state.error = username + " is not found."
            return false;
        }

        state.name = user.name;
        state.username = user.username;
        state.error = "";
        router.push("/home")
        return true;
    },
    async logout() {
        state.name = "";
        state.username = "";
        router.push("/login")
    }
}

export default { state, getters, ...actions }