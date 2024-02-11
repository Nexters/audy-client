import { QueryClient } from '@tanstack/react-query';

import { UserRepository } from '@/apis/user';
import { QUERY_KEY } from '@/query-hooks/user/key';
import { json } from 'react-router-dom';

export const MainPageLoader = (queryClient: QueryClient) => async () => {
    try {
        await queryClient.ensureQueryData({
            queryFn: () => UserRepository.getInformationAsync(),
            queryKey: QUERY_KEY.info(),
        });
    } catch (error) {
        console.log(error);
    }
    return json({}, {status: 200})
};
