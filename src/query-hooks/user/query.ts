import {
    type UseSuspenseQueryOptions,
    useSuspenseQuery,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { UserRepository } from '@/apis/user';
import { UserType } from '@/types';

import { USER_QUERY_KEY } from './key';

export const useGetUserInformation = ({
    ...options
}: {
    options?: UseSuspenseQueryOptions<
        UserType,
        AxiosError,
        UserType
    >;
}) => {
    return useSuspenseQuery<
        UserType,
        AxiosError,
        UserType
    >({
        ...options,
        queryFn: () => UserRepository.getInformationAsync(),
        queryKey: USER_QUERY_KEY.info(),
    });
};
