export interface UserRequestParamsType {
    getInformation: {
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
