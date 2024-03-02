import { UserType } from '@/types';

export interface UserResponseType {
    getInformation: UserType;
}

export interface UserSocketSubType {
    getUserList: {
        total: number;
        users: Pick<UserType, 'userId'>[];
    };
}
