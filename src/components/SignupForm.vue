<template>
	<form @submit.prevent="submitForm">
		<div>
			<label for="username">아이디</label>
			<input type="text" id="username" v-model="username" v-autofocus />
		</div>
		<div>
			<label for="password">패스워드</label>
			<input type="text" id="password" v-model="password" />
		</div>
		<div>
			<label for="nickname">닉네임</label>
			<input type="text" id="nickname" v-model="nickname" />
		</div>
		<button type="submit">회원가입</button>
		<p>{{ logMessage }}</p>
	</form>
</template>

<script>
import { registerUser } from '../api/auth';

export default {
	data() {
		return {
			username: '',
			password: '',
			nickname: '',
		};
	},

	methods: {
		async submitForm() {
			console.log('submitForm()');
			const userData = {
				username: this.username,
				password: this.password,
				nickname: this.nickname,

				//log
				logMessage: '',
			};
			const response = await registerUser(userData);
			const { data } = response;
			this.logMessage = `${data.username}님이 가입되었습니다.`;
			this.resetForm();
			console.log(response);
		},

		resetForm() {
			this.username = '';
			this.password = '';
			this.nickname = '';
		},
	},
};
</script>

<style></style>
