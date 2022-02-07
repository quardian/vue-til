import axios from 'axios';
import { setInterceptor } from './interceptors';
/**
 * axios 응답스키마
    {
        // 서버가 제공한 데이터
        data : {}, 

        // 서버 응답의 HTTP 상태코드
        status: 200,

        // 서버 응답 HTTP 상태 메시지
        statusText: 'OK',

        // 서버 응답 헤더 (모든 헤더 이름은 소문자)
        headers: {},

        // 요청에 대해 axios에 설정된 구성
        config: {},

        // 응답과 관련된 요청
        request: {}

    }
 */
// 기본 HTTP Request & Response 관련 기본 설정
const config = {
	/* 요청에 사용될 서버 URL */
	url: '',

	/*url 속성값이 절대 URL이 아니라면, url 앞에 baseURL이 붙는다.*/
	baseURL: process.env.VUE_APP_API_URL,

	/**
	 * 서버에 전송 될 사용자 정의 헤더.
	 */
	//headers : {'X-Requested-with': 'XMLHttpRequest'},
	//headers: { Authorization: store.state.token },
	/** 요청과 함께 전송될 URL 매개변수 ( 일반객체 또는 URLSearchParams 객체 ) */
	// params: {},

	/**
	 * params를 직렬화 하는 옵션 함수
	 *  (예: https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
	 */
	// paramsSerializer: function(params){
	//     return Qs.stringify(params, {arrayFormat: 'brackets'});
	// },

	/**
	 *  요청이 타임 아웃되는 밀리 초(ms)를 설정합니다.
	 */
	timeout: 2500,

	/**
	 * 요청 본문(request body)로 전송할 데이터( PUT, POST, PATCH만 적용)
	 */
	// data:{},

	// `withCredentials`는 자격 증명(credentials)을 사용하여
	// 크로스 사이트 접근 제어(cross-site Access-Control) 요청이 필요한 경우 설정합니다.
	withCredentials: false, // 기본 값

	// `auth`는 HTTP 기본 인증(auth)이 사용되며, 자격 증명(credentials)을 제공함을 나타냅니다.
	// 기존의 `Authorization` 커스텀 헤더를 덮어쓰는 `Authorization` 헤더(header)를 설정합니다.
	// auth: {username: 'janedoe',password: 's00pers3cret'},

	// `responseType`은 서버에서 응답할 데이터 타입을 설정합니다.
	// [ 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' ]
	responseType: 'json', // 기본 값

	// `responseEncoding`은 응답 디코딩에 사용할 인코딩을 나타냅니다.
	// [주의!] 클라이언트 사이드 요청 또는 `responseType`이 'stream'인 경우는 무시합니다.
	responseEncoding: 'utf8', // 기본 값

	// `xsrfCookieName`은 xsrf 토큰(token)에 대한 값으로 사용할 쿠키 이름입니다.
	//xsrfCookieName: 'XSRF-TOKEN', // 기본 값

	// `xsrfHeaderName`은 xsrf 토큰 값을 운반하는 HTTP 헤더 이름입니다.
	//xsrfHeaderName: 'X-XSRF-TOKEN', // 기본 값

	// `onUploadProgress`는 업로드 프로그래스 이벤트를 처리합니다.
	// onUploadProgress: function (progressEvent) {
	//     // 네이티브 프로그래스 이벤트(Native Progress Event) 처리 코드
	//     // ...
	// },

	// `onDownloadProgress`는 다운로드 프로그래스 이벤트를 처리합니다.
	// onDownloadProgress: function (progressEvent) {
	//     // 네이티브 프로그래스 이벤트(Native Progress Event) 처리 코드
	//     // ...
	// },

	// `maxContentLength`는 HTTP 응답 콘텐츠의 최대 크기를 바이트(Bytes) 단위로 설정합니다.
	// maxContentLength: 2000,

	// `validateStatus`는 주어진 HTTP 응답 상태 코드에 대한 약속을 해결할지 거절 할지를 정의합니다.
	// `validateStatus`가`true`를 반환하면 (또는`null`,`undefined`) promise를 resolve 합니다.
	// 그렇지 않으면 promise가 reject 됩니다.
	// validateStatus: function (status) {
	//     return status >= 200 && status < 300; // 기본 값
	// },

	// `maxRedirects`는 Node.js에서 리디렉션 가능한 최대 갯수를 정의합니다.
	// 0으로 설정하면 리디렉션이 수행되지 않습니다.
	//maxRedirects: 5, // 기본 값

	// `socketPath`는 Node.js에서 사용될 UNIX 소켓을 정의합니다.
	// 예: '/var/run/docker.sock'을 사용하여 docker 데몬에 요청을 보냅니다.
	// `socketPath` 또는`proxy`만이 지정 될 수 있습니다.
	// 둘 다 지정되면`socketPath`가 사용됩니다.
	//socketPath: null, // 기본 값

	// `httpAgent`와`httpsAgent`는 각각 Node.js에서 http와 https 요청을 수행 할 때
	// 사용할 커스텀 에이전트를 정의합니다. 이것은 기본적으로 활성화되지 않은 `keepAlive`와 같은
	// 옵션을 추가 할 수 있게 합니다.
	//httpAgent: new http.Agent({ keepAlive: true }),
	//httpsAgent: new https.Agent({ keepAlive: true }),

	// 'proxy'는 프록시 서버의 호스트 이름과 포트를 정의합니다.
	// 기존의 `http_proxy` 및 `https_proxy` 환경 변수를 사용하여 프록시를 정의 할 수도 있습니다.
	// 프록시 설정에 환경 변수를 사용하고 있다면 `no_proxy` 환경 변수를 쉼표로 구분 된 도메인 목록으로
	// 정의하여 프록시 할 필요가 없습니다.
	// 환경 변수를 무시하고 프록시를 사용하지 않으려면 `false`를 설정합니다.
	// `auth`는 HTTP 기본 인증(Basic Auth)를 사용하여 프록시에 연결하고 자격 증명을 제공해야 함을 나타냅니다.
	// 기존의 `Proxy-Authorization` 커스텀 헤더를 덮어쓰는 `Proxy-Authorization` 헤더(header)를 설정합니다.
	/*
    proxy: {
        host: '127.0.0.1',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    },
*/

	// `cancelToken`은 요청을 취소하는 데 사용할 수 있는 취소 토큰을 지정합니다.
	// (자세한 내용은 해제(Cancellation) 섹션 참조).
	//   cancelToken: new CancelToken(function (cancel) {
	//     // ...
	//   }),

	/** 
     * 서버에 요청을 보내기 전에 요청 데이터를 변경할 수 있다 ( PUT, POST, PATCH만 적용) 
       배열의 마지막 함수는 버퍼(buffer)의 문자열이나 인스턴스를 반환해야 함.
       ArrayBuffer, FormData 또는 Stream 헤더 객체를 수정할 수 있음
    */
	// transformRequest : [
	//     function(data, headers){
	//         return data;
	//     }
	// ],

	/**
	 * 서버 응답할 데이터에 대한 변경을 전달해 then/catch에 전달하도록 허용.
	 */
	// transformResponse: [
	//     function(data){
	//         return data;
	//     }
	// ],
};

function createInstanceWithAuth(url) {
	const instance = axios.create({
		baseURL: `${process.env.VUE_APP_API_URL}${url}`,
	});
	// 모든 요청은 2.5초 간만 대기 후 타임아웃 처리
	instance.defaults.timeout = 2500;

	// 인터셉터 : then 이나 catch로 처리되기 전에 요청이나 응답을 가로챌 수 있다.
	return setInterceptor(instance);
}

function createInstance() {
	//const instance = axios.create(config);
	const instance = axios.create({
		baseURL: `${process.env.VUE_APP_API_URL}`,
	});
	// 모든 요청은 2.5초 간만 대기 후 타임아웃 처리
	instance.defaults.timeout = 2500;

	return instance;
}

export { createInstanceWithAuth, createInstance };
