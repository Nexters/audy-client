import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { UserRepository } from '@/apis/user';
import { UserType } from '@/types';

import { USER_QUERY_KEY } from './key';

export const useGetUserInformation = ({
    ...options
}: Omit<UseQueryOptions<UserType, AxiosError, UserType>, 'queryKey'>) => {
    return useQuery<UserType, AxiosError, UserType>({
        ...options,
        queryFn: () => UserRepository.getInformationAsync(),
        queryKey: USER_QUERY_KEY.info(),
    });
};
