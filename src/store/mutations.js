export default {
	setUsername(state, username) {
		state.username = username;
	},
	clearUsername(state) {
		state.username = '';
	},

	clearToken(state) {
		state.token = '';
	},

	setToken(state, token) {
		state.token = token;
	},
};
