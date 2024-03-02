import type { CourseSocketPubType } from '@/apis/course/type';
import { UserSocketSubType } from '@/apis/user/type';
import type { MarkerType } from '@/types/map';

// T-MAP API NameSpace
declare global {
    interface Window {
        // FIXME : 추후 Tmapv3 Type 정의 모듈을 찾거나 자체적으로 정의할 필요 있음
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Tmapv3: any;
    }

    interface CustomEventMap {
        'marker:create': CustomEvent<MarkerType>;
        'marker:remove': CustomEvent<string>;
        'marker:reorder': CustomEvent<Pick<MarkerType, 'pinId' | 'sequence'>>;
        'marker:rename': CustomEvent<Pick<MarkerType, 'pinId' | 'pinName'>>;
        'infoWindow:confirm': CustomEvent<
            Omit<CourseSocketPubType['addition'], 'courseId'>
        >;
        'infoWindow:revert': CustomEvent<string>;
        'duration:update': CustomEvent<number>;
        'user:list': CustomEvent<UserSocketSubType['getUserList']>;
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
