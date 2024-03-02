import { useCallback, useContext, useMemo } from 'react';

import type { CourseSocketPubType } from '@/apis/course/type';
import { StompContext } from '@/utils/socket/StompProvider';

export const useSocket = (courseId: number) => {
    const { stompClient } = useContext(StompContext);

    const modifyPinName = useCallback(
        ({ pinId, pinName }: CourseSocketPubType['modifyName']) => {
            stompClient.current?.publish({
                destination: `/pub/${courseId}/pin/modification/name`,
                body: JSON.stringify({
                    pinId,
                    pinName,
                }),
            });
        },
        [courseId, stompClient],
    );

    const modifyPinSequence = useCallback(
        ({ pinId, order }: CourseSocketPubType['modifySequence']) => {
            stompClient.current?.publish({
                destination: `/pub/${courseId}/pin/modification/sequence`,
                body: JSON.stringify({
                    pinId,
                    order,
                }),
            });
        },
        [courseId, stompClient],
    );

    const addPin = useCallback(
        ({
            courseId,
            pinName,
            originName,
            latitude,
            longitude,
            sequence,
            address,
        }: CourseSocketPubType['addition']) => {
            stompClient.current?.publish({
                destination: `/pub/${courseId}/pin/addition`,
                body: JSON.stringify({
                    courseId,
                    pinName,
                    originName,
                    latitude,
                    longitude,
                    sequence,
                    address,
                }),
            });
        },
        [stompClient],
    );

    const removePin = useCallback(
        ({ pinId }: CourseSocketPubType['removal']) => {
            stompClient.current?.publish({
                destination: `/pub/${courseId}/pin/removal`,
                body: JSON.stringify({
                    pinId,
                }),
            });
        },
        [courseId, stompClient],
    );

    const leaveCourse = useCallback(() => {
        stompClient.current?.publish({
            destination: `/pub/${courseId}/user`,
        });
    }, [courseId, stompClient]);

    const socketModule = useMemo(
        () => ({
            modifyPinName,
            modifyPinSequence,
            addPin,
            removePin,
            leaveCourse,
        }),
        [addPin, leaveCourse, modifyPinName, modifyPinSequence, removePin],
    );

    return socketModule;
};
