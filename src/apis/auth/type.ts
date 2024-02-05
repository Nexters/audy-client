import { SocialPlatformType } from "@/types";

export interface AuthRequestParamsType {
    getAuthorization: {
        code: string;
        socialPlatform: SocialPlatformType;
    };
}

export interface AuthResponseType {
    getAuthorization: {
        userId: string;
        email: string;
        username: string;
        imageUrl: string;
    };
}
