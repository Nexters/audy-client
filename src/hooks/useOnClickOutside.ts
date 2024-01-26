import { type RefObject, useEffect } from 'react';

interface PropsType {
    ref: RefObject<HTMLElement>;
    handler: (event: PointerEvent) => void;
}

export const useOnClickOutside = ({ ref, handler }: PropsType) => {
    useEffect(() => {
        const eventListener = (event: PointerEvent) => {
            if (!ref.current) return;
            handler(event);
        };
        document.addEventListener('pointerdown', eventListener);
        return () => document.removeEventListener('pointerdown', eventListener);
    }, [handler, ref]);
};
