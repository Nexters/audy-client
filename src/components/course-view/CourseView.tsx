import { useState } from 'react';

import { Reorder } from 'framer-motion';

import { dummyCourseList } from '@/constants/dummy';

import CourseItem from './CourseItem';
import * as styles from './CourseView.css';

const CourseView = () => {
    // FIXME : 추후 백엔드 API 연동 시, 코스 API 로부터 받은 값을 활용할 예정
    const [courseList, setCourseList] = useState(dummyCourseList);

    return (
        <Reorder.Group
            as="section"
            values={courseList}
            onReorder={setCourseList}
            axis="y"
            className={styles.wrapper}
        >
            {courseList.map((course, index) => (
                <CourseItem key={course.id} course={course} order={index + 1} />
            ))}
        </Reorder.Group>
    );
};

export default CourseView;
