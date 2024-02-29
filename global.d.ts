import type { MarkerType } from '@/types/map';

// T-MAP API NameSpace
declare global {
    interface Window {
        // FIXME : 추후 Tmapv3 Type 정의 모듈을 찾거나 자체적으로 정의할 필요 있음
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Tmapv3: any;
    }

    interface CustomEventMap {
        'marker:create': CustomEvent<{ marker: MarkerType; index: number }>;
        'marker:remove': CustomEvent<string>;
    }

    interface WindowEventMap extends CustomEventMap {}
}

//  SVGR Plugin NameSpace
declare module '*.svg' {
    const svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default svg;
}
v;

export {};
