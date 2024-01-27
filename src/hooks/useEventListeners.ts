import { useEffect } from 'react';

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
