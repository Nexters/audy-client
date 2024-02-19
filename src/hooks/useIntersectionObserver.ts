import { useEffect, useRef } from 'react';

interface PropsType extends IntersectionObserverInit {
    onIntersect?: IntersectionObserverCallback;
}

// targetRef 가 사용자가 명시한 root 와 교차하는지를 검증하는 Hook useIntersectionObserver
export const useIntersectionObserver = <T extends HTMLElement>({
    root,
    rootMargin,
    threshold,
    onIntersect,
}: PropsType) => {
    const targetRef = useRef<T>(null);

    useEffect(() => {
        if (!targetRef.current) return;

        const observer = new IntersectionObserver(
            (entries, observer) => onIntersect?.(entries, observer),
            { root, rootMargin, threshold },
        );

        observer.observe(targetRef.current);

        return () => observer.disconnect();

    }, [root, rootMargin, threshold, onIntersect]);

    return { targetRef }
};
