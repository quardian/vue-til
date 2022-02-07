// 로그인, 회원가입
import { createInstance } from './common/axios.factory';

const instance = createInstance();

/**
 *
 * @param {*} userData
 * @returns
 */
function registerUser(userData) {
	const url = 'signup';
	return instance.post(url, userData);
}

/**
 *
 * @param {*} loginData
 * @returns
 */
function loginUser(loginData) {
	const url = 'login';
	console.log('instance', instance);
	return instance.post(url, loginData);
}

export { registerUser, loginUser };
