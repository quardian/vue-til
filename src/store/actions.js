import { loginUser } from '../api/auth';
import { saveAuthCookie, saveUserToCookie } from '../utils/cookies';

export default {
	SET_USERNAME(context, username) {
		const { commit } = context;
		commit('setUsername', username);
	},

	SET_TOKEN(context, token) {
		const { commit } = context;
		commit('setToken', token);
	},

	CLEAR_USERNAME({ commit }) {
		commit('clearUsername');
	},

	CLEAR_TOKEN({ commit }) {
		commit('clearToken');
	},

	async LOGIN({ commit }, loginData) {
		const { data } = await loginUser(loginData);

		commit('setUsername', data.token);
		commit('clearUsername', data.user.username);

		saveAuthCookie(data.token);
		saveUserToCookie(data.user.username);

		return data;
	},
};
