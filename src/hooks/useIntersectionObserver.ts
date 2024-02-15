import { useEffect, useRef } from 'react';

interface PropsType extends IntersectionObserverInit {
    onIntersect?: IntersectionObserverCallback;
}

// targetRef 가 사용자가 명시한 root 와 교차하는지를 검증하는 Hook useIntersectionObserver
export const useIntersectionObserver = ({
    root,
    rootMargin,
    threshold,
    onIntersect,
}: PropsType) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const targetRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!targetRef.current) return;

        observerRef.current = new IntersectionObserver(
            (entries, observer) => onIntersect?.(entries, observer),
            { root, rootMargin, threshold },
        );
    }, [root, rootMargin, threshold, onIntersect]);

    return { targetRef }
};
