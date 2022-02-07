<template>
	<form @submit.prevent="postUpdateSubmit">
		<div>
			<label for="title">제목 : </label>
			<input id="title" type="text" v-model="title" />
		</div>
		<div>
			<label for="contents">내용 : </label>
			<textarea id="contents" type="text" v-model="contents" rows="5" />
		</div>
		<button type="submit" :disabled="!isValidForm">수정하기</button>
		<p v-if="!isValidContent">내용을 250자 이하로 입력해주세요!!</p>
	</form>
</template>

<script>
import { updatePost, fetchPost } from '../../api/posts';
export default {
	data() {
		return {
			title: '',
			contents: '',
			logMessage: '',
			item: {},
		};
	},

	methods: {
		async postUpdateSubmit() {
			if (!this.isValidForm) return;

			const id = this.$route.params.id;
			const postData = {
				title: this.title,
				contents: this.contents,
			};

			try {
				const { data } = await updatePost(id, postData);
				console.log(data);
				this.$router.push('/main');
			} catch (error) {
				const { statusText } = error.response;
				this.logMessage = statusText;
				console.log(error.response);
			}
		},
	},

	computed: {
		isValidTitle() {
			return this.title.length > 1;
		},
		isValidContent() {
			return this.contents.length <= 200;
		},
		isValidForm() {
			return this.isValidTitle && this.isValidContent;
		},
	},

	async created() {
		console.log('created', this.$route.params);
		const response = await fetchPost(this.$route.params.id);
		this.item = response.data;
		this.title = this.item.title;
		this.contents = this.item.contents;
	},
};
</script>

<style></style>
