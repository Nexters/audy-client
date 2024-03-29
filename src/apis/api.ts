import axios, {
    type AxiosError,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';

import { STATUS_CODE } from '@/constants/status';
import { ApiError } from '@/utils/error/ApiError';

/**
 * 백엔드로부터 인계 받은 응답의 기본 Interface ApiResponseType
 * @param T 응답으로 받을 데이터의 타입
 */
export interface ApiResponseType<T> {
    code: number;
    message: string;
    data: T;
}

/**
 * API 요청에서 범용적으로 사용할 Axios Instance 생성
 * baseURL, responseType 같은 공용 속성을 일괄적으로 적용
 */
const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

/**
 * Audy 백엔드 서버로부터 온 요청인지를 판별하는 Type Guard 함수 isServerApiResponse
 * Tmap API 서버로부터 온 응답의 경우를 걸러내기 위해 사용한다.
 */
const isServerApiResponse = (
    response: unknown,
): response is ApiResponseType<unknown> =>
    typeof response === 'object' &&
    response !== null &&
    'code' in response &&
    'data' in response &&
    'message' in response;

API.interceptors.response.use(
    (response: AxiosResponse<unknown>) => {
        if (isServerApiResponse(response.data)) {
            const { code, data, message } = response.data;

            if (code !== STATUS_CODE.OK) {
                throw new ApiError({ code, data, message });
            }
        }
        return response;
    },
    (error: AxiosError | Error): Promise<ApiError> => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                throw new ApiError({
                    code: STATUS_CODE.NETWORK_ERROR,
                    data: null,
                    message:
                        error.response?.data ??
                        '알 수 없는 에러가 발생했습니다',
                });
            }
        }
        throw new ApiError({
            code: STATUS_CODE.NETWORK_ERROR,
            data: null,
            message: '알 수 없는 에러가 발생했습니다',
        });
    },
);

/**
 * GET 요청을 처리하는 유틸 API 함수 getAsync
 * @param T 요청 결과로 받을 데이터의 타입
 *
 * @param url API 요청을 보낼 url (string)
 * @param config API 요청과 관련된 config (AxiosRequestConfig)
 * @returns API 요청 성공 시 받을 객체 (T)
 */
export async function getAsync<T>(url: string, config?: AxiosRequestConfig) {
    const response = await API.get<T, AxiosResponse<T, unknown>, unknown>(url, {
        ...config,
    });
    return response.data;
}

/**
 * POST 요청을 처리하는 유틸 API 함수 postAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D API 요청 시 서버에 전송할 데이터의 타입
 *
 * @param url API 요청을 보낼 url (string)
 * @param data API 요청과 함께 동봉할 data
 * @param config API 요청과 관련된 config (AxiosRequestConfig)
 * @returnsAPI 요청 성공 시 받을 객체 (T)
 */
export async function postAsync<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
) {
    const response = await API.post<T, AxiosResponse<T, D>, D>(url, data, {
        ...config,
    });
    return response.data;
}

/**
 * PATCH 요청을 처리하는 유틸 API 함수 patchAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D API 요청 시 서버에 전송할 데이터의 타입
 *
 * @param url API 요청을 보낼 url (string)
 * @param data API 요청과 함께 동봉할 data
 * @param config API 요청과 관련된 config (AxiosRequestConfig)
 * @returns API 요청 성공 시 받을 객체 (T)
 */
export async function patchAsync<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
) {
    const response = await API.patch<T, AxiosResponse<T, D>, D>(url, data, {
        ...config,
    });

    return response.data;
}

/**
 * PUT 요청을 처리하는 유틸 API 함수 putAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D API 요청 시 서버에 전송할 데이터의 타입
 *
 * @param url API 요청을 보낼 url (string)
 * @param data API 요청과 함께 동봉할 data
 * @param config API 요청과 관련된 config (AxiosRequestConfig)
 * @returns API 요청 성공 시 받을 객체 (T)
 */
export async function putAsync<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
) {
    const response = await API.patch<T, AxiosResponse<T, D>, D>(url, data, {
        ...config,
    });

    return response.data;
}

/**
 * DELETE 요청을 처리하는 유틸 Api 함수 deleteAsync
 * @param T 요청 결과로 받을 데이터의 타입
 * @param D Api 요청 시 서버에 전송할 데이터의 타입
 *
 * @param url Api 요청을 보낼 url (string)
 * @param config Api 요청과 관련된 config (AxiosRequestConfig)
 * @returns API 요청 성공 시 받을 객체 (T)
 */
export async function deleteAsync<T, D>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
) {
    const response = await API.delete<T, AxiosResponse<T, unknown>, unknown>(
        url,
        {
            ...config,
            data,
        },
    );

    return response.data;
}
