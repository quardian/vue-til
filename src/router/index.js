import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
//import LoginPage from '../views/LoginPage.vue';
//import SignupPage from '../views/SignupPage.vue';

const routes = [
	{
		name: 'loginPage',
		path: '/login',
		component: () => import('../views/LoginPage.vue'), // code splitting
		meta: { auth: false },
	},
	{
		name: 'add',
		path: '/add',
		component: () => import('../views/PostAddPage'), // code splitting
		meta: { auth: true },
	},
	{
		name: 'signupPage',
		path: '/signup',
		component: () => import('../views/SignupPage.vue'),
		meta: { auth: false },
	},
	{
		name: 'updatePage',
		path: '/post/:id',
		component: () => import('../views/PostEditPage.vue'),
		meta: { auth: true },
	},
	{
		name: 'mainPage',
		path: '/main',
		component: () => import('../views/MainPage.vue'),
		meta: { auth: true },
	},
	{
		name: 'homPage',
		path: '/',
		redirect: '/login',
	},
	{
		name: 'notFound',
		path: '/:pathMatch(.*)*',
		component: () => import('../views/NotFoundPage.vue'),
		meta: { auth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes: routes,
});

// global router guard
router.beforeEach((to, from, next) => {
	console.log('router.beforeEach:', to, from);
	if (to.meta.auth && !store.getters.isLogin) {
		console.log('인증이 필요한 페이지 입니다.');
		next('/login');
		return;
	}
	next();
});

export default router;
