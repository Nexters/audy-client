//  SVGR Plugin NameSpace
declare module '*.svg' {
    const svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default svg;
}

// T-MAP API NameSpace
declare global {
    interface Window {
        // FIXME : 추후 Tmapv3 Type 정의 모듈을 찾거나 자체적으로 정의할 필요 있음
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Tmapv3: any;
    }
}
