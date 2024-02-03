/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_KAKAO_CLIENT_ID: string;
    readonly VITE_KAKAO_REDIRECTION_URL: string;
    readonly VITE_APPLE_CLIENT_ID: string;
    readonly VITE_APPLE_REDIRECT_URL: string;
    readonly VITE_TMAP_APP_KEY: string;
    readonly VITE_SERVER_URL: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
