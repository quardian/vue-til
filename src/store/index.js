import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { getAuthFromCookie, getUserFromCookie } from '../utils/cookies';

export default createStore({
	state: {
		username: getUserFromCookie() || '',
		token: getAuthFromCookie() || '',
	},
	getters: {
		username(state) {
			return state.username;
		},

		isLogin(state) {
			return state.token.length != '';
		},
	},
	mutations: mutations,
	actions: actions,
});
