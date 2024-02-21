import {
    type ComponentProps,
    type PropsWithChildren,
    Suspense,
} from 'react';

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

interface PropsType
    extends Omit<ComponentProps<typeof ErrorBoundary>, 'fallbackRender'> {
    pendingFallback?: ComponentProps<typeof Suspense>['fallback'];
    rejectedFallback?: ComponentProps<typeof ErrorBoundary>['fallbackRender'];
}

// FIXME : 추후 에러 Fallback UI 시안이 나올 경우 대체해야 함
const FallbackComponent = ({ error }: FallbackProps) => <p>{error.message}</p>;

// FIXME : 추후 Suspense Fallback UI 시안이 나올 경우 대체해야 함
const PendingComponent = () => <p>로딩 중..</p>;

/**
 * 컴포넌트 내부에서 발생한 에러나 Pending 상태의 비동기 요청이 존재할 경우 이를 대체하는 fallback Component를 보여주는 AsyncBoundary
 * 컴포넌트 내부에서 에러가 발생했을 경우에 대한 rejectedFallback, Pending 상태의 요청이 있을 경우에 대한 pendingFallback 으로 나뉜다.
 * @param param.pendingFallback Suspense에 넘겨줄 fallback Component
 * @param param.rejectedFallback ErrorBoundary의 fallbackRender Props에 넘겨줄 fallback Component
 */
const AsyncBoundary = ({
    pendingFallback,
    rejectedFallback,
    children,
}: PropsWithChildren<PropsType>) => (
    <ErrorBoundary fallbackRender={rejectedFallback || FallbackComponent}>
        <Suspense fallback={pendingFallback || <PendingComponent />}>
            {children}
        </Suspense>
    </ErrorBoundary>
);

export default AsyncBoundary;
