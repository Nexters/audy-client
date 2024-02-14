import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { UserRepository } from '@/apis/user';
import { UserResponseType } from '@/apis/user/type';

import { QUERY_KEY } from './key';

export const useGetUserInformation = ({
    userId,
    ...options
}: {
    userId?: string;
    options: UseSuspenseQueryOptions<
        UserResponseType['getInformation'],
        AxiosError,
        UserResponseType['getInformation']
    >;
}) => {
    return useSuspenseQuery<
        UserResponseType['getInformation'],
        AxiosError,
        UserResponseType['getInformation']
    >({
        ...options,
        queryFn: () => UserRepository.getInformationAsync(userId),
        queryKey: QUERY_KEY.info(userId),
    });
};
