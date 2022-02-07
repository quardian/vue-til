<template>
	<form @submit.prevent="loginSubmit">
		<div>
			<label for="username">아이디</label>
			<input type="text" id="username" v-model="username" v-autofocus />
		</div>
		<div>
			<label for="password">패스워드</label>
			<input type="text" id="password" v-model="password" />
		</div>
		<button ref="loginButton" type="submit" :disabled="!isValidForm">
			로그인
		</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { validateEmail } from '../utils/validation';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			username: '',
			password: '',
			logMessage: '',
		};
	},

	methods: {
		...mapActions(['LOGIN']),

		async loginSubmit() {
			const loginData = {
				username: this.username,
				password: this.password,
			};
			try {
				//await this.$store.dispatch('LOGIN', loginData);
				await this.LOGIN(loginData);
				this.$router.push('/main');
				this.resetForm();
			} catch (e) {
				const { status } = e.response;
				if (status == 401) {
					this.logMessage = '아이디 또는 패스워드를 올바르게 입력해주세요';
				}
				console.log(e.response);
			}
		},

		resetForm() {
			this.username = '';
			this.password = '';
		},
	},

	computed: {
		isUsernameValid() {
			const b = validateEmail(this.username);
			return b;
		},

		isPasswordValid() {
			const b = this.password.length >= 1;
			return b;
		},

		isValidForm() {
			return this.isUsernameValid && this.isPasswordValid;
		},
	},
};
</script>

<style></style>
