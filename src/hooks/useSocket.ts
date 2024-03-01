import { useContext } from 'react';

import type { CourseSocketPubType } from '@/apis/course/type';
import { StompContext } from '@/utils/socket/StompClientProvider';

export const useSocket = (courseId: number) => {
    const { stompClient } = useContext(StompContext);

    const modifyPinName = ({
        pinId,
        pinName,
    }: CourseSocketPubType['modifyName']) => {
        stompClient?.publish({
            destination: `/pub/${courseId}/pin/modification/name`,
            body: JSON.stringify({
                pinId,
                pinName,
            }),
        });
    };

    const modifyPinSequence = ({
        pinId,
        sequence,
    }: CourseSocketPubType['modifySequence']) => {
        stompClient?.publish({
            destination: `/pub/${courseId}/pin/modification/sequence`,
            body: JSON.stringify({
                pinId,
                sequence,
            }),
        });
    };

    const addPin = ({
        courseId,
        pinName,
        originName,
        latitude,
        longitude,
        sequence,
        address,
    }: CourseSocketPubType['addition']) => {
        stompClient?.publish({
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
    };

    const removePin = ({ pinId }: CourseSocketPubType['removal']) => {
        stompClient?.publish({
            destination: `/pub/${courseId}/pin/removal`,
            body: JSON.stringify({
                pinId,
            }),
        });
    };

    return {
        modifyPinName,
        modifyPinSequence,
        addPin,
        removePin,
    };
};
