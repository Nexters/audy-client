import type { ApiResponseType } from "@/apis/api";

/**
 * 서버와의 Api 요청에서 발생한 에러를 관리하는 객체 ApiError
 * 현재 서버에서 요청의 성공, 실패와 관계 없이 200으로 응답을 보내기에 별도의 에러를 던져야 한다.
 */
export class ApiError extends Error {
    code: number;
    data: unknown;
    name = 'ApiError';

    constructor({ code, data, message }: ApiResponseType<unknown>) {
        super(message);
        this.code = code;
        this.data = data;
    }
}

// 해당 에러가 ApiError 인지 아닌지를 판별하기 위한 Type Narrow 함수 isApiError
export const isApiError = (error: unknown): error is ApiError => {
    return error instanceof Error && error.name === 'ApiError';
}