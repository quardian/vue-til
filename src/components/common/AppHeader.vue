<template>
	<div>
		<header>
			<template v-if="!isLogin">
				<router-link to="/login">로그인</router-link> |
				<router-link to="/signup">회원가입</router-link>
			</template>
			<template v-else>
				<span>{{ username }}</span> |
				<a href="#" @click.prevent="logoutUser">로그아웃</a>
			</template>
		</header>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { deleteCookie } from '../../utils/cookies';

export default {
	computed: {
		...mapGetters(['username', 'isLogin']),
	},

	methods: {
		...mapActions(['CLEAR_USERNAME', 'CLEAR_TOKEN']),

		logoutUser() {
			//this.$store.commit('clearUsername');
			this.CLEAR_USERNAME();
			this.CLEAR_TOKEN();
			this.$router.push('/');
			deleteCookie('til_auth');
			deleteCookie('til_user');
		},
	},
};
</script>

<style></style>
