import { createInstanceWithAuth } from './common/axios.factory';

const posts = createInstanceWithAuth('posts');

/**
 *
 * @returns
 */
function fetchPosts() {
	return posts.get('/');
}

/**
 *
 * @param {*} postData
 * @returns
 */
function createPost(postData) {
	return posts.post('/', postData);
}

function updatePost(postId, postData) {
	return posts.put(postId, postData);
}

function deletePost(postId) {
	return posts.delete(postId);
}

function fetchPost(postId) {
	return posts.get(postId);
}

export { fetchPosts, createPost, updatePost, fetchPost, deletePost };
