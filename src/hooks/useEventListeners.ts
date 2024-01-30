import { useEffect } from 'react';

/**
 * Window 기반의 커스텀 이벤트를 수신 받아 로직을 실행시키는 Hook useEventListeners
 */
export const useEventListeners = <T extends keyof WindowEventMap>(
    eventName: T,
    handler: (event: WindowEventMap[T]) => void,
    options?: boolean | AddEventListenerOptions,
): void => {
    useEffect(() => {
        window.addEventListener(eventName, handler, options);

        return () => {
            window.removeEventListener(eventName, handler, options);
        };
    }, [eventName, handler, options]);
};
