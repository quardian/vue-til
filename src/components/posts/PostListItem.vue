<template>
	<li>
		<div>{{ item.title }}</div>
		<div>{{ item.contents }}</div>
		<div>
			<small>
				{{ formatDate }}
				<a href="#" @click.prevent="editPost">수정</a> |
				<a href="#" @click.prevent="deletePost">삭제</a>
			</small>
		</div>
	</li>
</template>

<script>
import { deletePost } from '../../api/posts';
export default {
	props: {
		item: { type: Object },
	},
	methods: {
		editPost() {
			console.log('updatePost');
			this.$router.push(`/post/${this.item._id}`);
		},

		async deletePost() {
			const answer = confirm('Do you want to delete it?');
			if (answer) {
				console.log('deletePost');
				await deletePost(this.item._id);
				this.$emit('refresh');
			}
		},
	},

	computed: {
		formatDate() {
			return new Date(this.item.createdAt);
		},
	},
};
</script>

<style></style>
