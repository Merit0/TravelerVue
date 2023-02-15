import { computed, reactive } from 'vue'
import * as Request from '@/api/Requests'
import router from '@/router/index';
import { UserModel } from '../models/UserModel';

const state = reactive({
    user: new UserModel().build(),

    error: ""
});

const getters = reactive({
    isLoggedIn: computed(() => state.user.getStatus())
});
const actions = {
    async getUser() {
        const user = await Request.getUser();
        if (!user.loggedIn) {
            console.log(user.username + " in not logged in");
            return;
        }
        state.user
            .setName(user.name)
            .setUsername(user.username);
    },

    async login(username: string, password: string) {
        const userFromApi = await Request.login(username, password);
        if (userFromApi == null) {
            state.error = username + " is not found."
            return false;
        }
        state.user
            .setName(userFromApi.name)
            .setUsername(userFromApi.username)
            .setId(userFromApi.id)
            .setLoggedIn(true);
        state.error = "";
        router.push("/")
        return true;
    },
    async logout() {
        state.user
            .setName("")
            .setUsername("")
            .setId(0);
        await router.push("/login")
        location.reload();
    }
}

export default { state, getters, ...actions }