/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_TMAP_APP_KEY: string;
    readonly VITE_SERVER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
