import { useCallback, useRef } from 'react';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useGetCourses } from '@/query-hooks/course/query';

import CourseTab from '../course-tab';

import * as S from './CoursesContainer.css';

const CoursesContainer = () => {
    const rootRef = useRef<HTMLDivElement>();

    const { data: courses, fetchNextPage } = useGetCourses({ limit: 10 });

    const intersectLastElement = useCallback<IntersectionObserverCallback>(
        (entries) => {
            const isIntersecting = entries.some(
                (entry) => entry.isIntersecting,
            );
            if (isIntersecting) fetchNextPage();
        },
        [fetchNextPage],
    );

    const { targetRef } = useIntersectionObserver<HTMLDivElement>({
        root: rootRef.current,
        onIntersect: intersectLastElement,
    });

    return (
        <div className={S.layout}>
            {courses.map(
                ({ courseId, courseName, editorCnt, pinCnt, owner }) => (
                    <CourseTab
                        key={courseId}
                        name={courseName}
                        memberCount={editorCnt}
                        pinCount={pinCnt}
                        isMyCourse={owner}
                    />
                ),
            )}
            <div className={S.lastChildren} ref={targetRef} />
        </div>
    );
};

export default CoursesContainer;
