import { type RefObject, useEffect } from 'react';

interface PropsType {
    ref: RefObject<HTMLElement>;
    handler: (event: PointerEvent) => void;
}

export const useOnClickOutside = ({ ref, handler }: PropsType) => {
    useEffect(() => {
        const eventListener = (event: PointerEvent) => {
            // NOTE : ref 에 element 가 없거나, 클릭한 대상이 ref의 자식 요소인지를 판별
            if (!ref.current || ref.current.contains(event.target as Node))
                return;
            handler(event);
        };
        document.addEventListener('pointerdown', eventListener);
        return () => document.removeEventListener('pointerdown', eventListener);
    }, [handler, ref]);
};
