import { createApp } from 'vue';
import App from './App.vue';
import router from '../src/router';
import mitt from './bus/mitt';
import store from './store/index';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(mitt);

app.directive('autofocus', {
	mounted(el) {
		el.focus();
	},
});
app.mount('#app');
