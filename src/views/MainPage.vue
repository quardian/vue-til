<template>
	<div>
		<h1>Today I Learned</h1>
		<div v-if="isLoading">
			<loading-spinner></loading-spinner>
		</div>
		<ul v-else>
			<post-list-item
				v-for="item in this.postItems"
				:key="item._id"
				:item="item"
				@refresh="fetchData"
			>
			</post-list-item>
		</ul>

		<router-link to="/add">+</router-link>
	</div>
</template>

<script>
import { fetchPosts } from '../api/posts';
import PostListItem from '../components/posts/PostListItem.vue';
import LoadingSpinner from '../components/common/LoadingSpinner.vue';

export default {
	components: {
		PostListItem,
		LoadingSpinner,
	},

	data() {
		return {
			postItems: [],
			isLoading: true,
		};
	},

	methods: {
		async fetchData() {
			this.isLoading = true;
			const response = await fetchPosts();
			this.postItems = response.data.posts;
			setTimeout(() => {
				this.isLoading = false;
			}, 100);

			console.log(response);
		},
	},

	created() {
		this.fetchData();
	},
};
</script>

<style scoped></style>
