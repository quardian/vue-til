import store from '../../store/index';

export function setInterceptor(axiosInstance) {
	// 요청 인터셉터
	axiosInstance.interceptors.request.use(
		function (config) {
			config.headers.Authorization = store.state.token || 'required login!!';
			console.log(config);
			// 요청 보내기전 인터셉터
			console.log('##api.interceptors.request.resolve()');
			return config;
		},
		function (error) {
			// 오류 요청을 보내기전 수행할일
			console.log('##api.interceptors.request.reject()', error);
			return Promise.reject(error);
		},
	);

	// 응답 인터셉터
	axiosInstance.interceptors.response.use(
		function (response) {
			console.log('##api.interceptors.response.resolve()', response);
			// 요청 보내기전 인터셉터
			return response;
		},
		function (error) {
			console.log('##api.interceptors.response.reject()', error);
			// 오류 요청을 보내기전 수행할일
			return Promise.reject(error);
		},
	);

	return axiosInstance;
}
