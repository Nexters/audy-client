import { useState } from 'react';

import { Reorder } from 'framer-motion';

import CourseItem from '@/features/course/course-item';

import * as styles from './CourseView.css';
import CourseViewContextProvider from './CourseViewContextProvider';
import { MarkersType } from '@/types/map';

interface PropsType {
    markers: MarkersType[]
}

const CourseView = ({markers}: PropsType) => {
    // FIXME : 추후 백엔드 API 연동 시, 코스 API 로부터 받은 값을 활용할 예정
    const [courseList, setCourseList] = useState(markers);

    return (
        <CourseViewContextProvider>
            <Reorder.Group
                as="section"
                dragListener={false}
                values={courseList}
                onReorder={setCourseList}
                axis="y"
                className={styles.wrapper}
            >
                {courseList.map((course, index) => (
                    <CourseItem
                        key={course.id}
                        course={course}
                        order={index + 1}
                    />
                ))}
            </Reorder.Group>
        </CourseViewContextProvider>
    );
};

export default CourseView;
