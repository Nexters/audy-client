export interface UserRequestParamsType {
    getInformation: {
        accessToken: string;
        userId: string;
    };
}

export interface UserResponseType {
    getInformation: {
        userId: string;
        email: string;
        username: string;
        imageUrl: string;
    };
}
