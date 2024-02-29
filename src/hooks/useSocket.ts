import { useEffect, useRef } from 'react';

import { Client as StompClient } from '@stomp/stompjs';

import type {
    CourseSocketPubType,
    CourseSocketSubType,
} from '@/apis/course/type';
import { useTmap } from '@/hooks/useTmap';

export const useSocket = (courseId: number) => {
    const stompClient = useRef<StompClient | null>(null);
    const { tmapModuleRef } = useTmap();

    const modifyPinName = ({
        pinId,
        pinName,
    }: CourseSocketPubType['modificationName']) => {
        stompClient.current?.publish({
            destination: `/pub/${courseId}/pin/modification/name`,
            body: JSON.stringify({
                pinId,
                pinName,
            }),
        });
    };

    const modifyPinOrder = ({
        pinId,
        sequence,
    }: CourseSocketPubType['modificationOrder']) => {
        stompClient.current?.publish({
            destination: `/pub/${courseId}/pin/modification/order`,
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
            }),
        });
    };

    const removePin = ({ pinId }: CourseSocketPubType['removal']) => {
        stompClient.current?.publish({
            destination: `/pub/${courseId}/pin/removal`,
            body: JSON.stringify({
                courseId,
                pinId,
            }),
        });
    };

    useEffect(() => {
        const stomp = new StompClient({
            brokerURL: `wss://api.audy-gakka.com/course/${courseId}`,
            onConnect: () => {
                console.log('Connected to the broker');
                stomp.subscribe(`/sub/${courseId}/pin/addition`, (message) => {
                    if (!tmapModuleRef.current) return;
                    const newMarker: CourseSocketSubType['addition'] =
                        JSON.parse(message.body);
                    tmapModuleRef.current.createMarker({
                        id: newMarker.pinId,
                        name: newMarker.pinName,
                        originName: newMarker.originName,
                        address: newMarker.address,
                        lat: String(newMarker.latitude),
                        lng: String(newMarker.longitude),
                    });
                });
                stomp.subscribe(
                    `/sub/${courseId}/pin/modification/name`,
                    (message) => {
                        if (!tmapModuleRef.current) return;
                        const {
                            pinId,
                            pinName,
                        }: CourseSocketSubType['modificationName'] = JSON.parse(
                            message.body,
                        );
                        console.log(pinId, pinName); // TODO : TMapModule 에서 Marker 에 Sequence 개념 도입 이후 수정 예정
                    },
                );
                stomp.subscribe(
                    `/sub/${courseId}/pin/modification/order`,
                    (message) => {
                        if (!tmapModuleRef.current) return;
                        const {
                            pinId,
                            sequence,
                        }: CourseSocketSubType['modificationOrder'] =
                            JSON.parse(message.body);
                        console.log(pinId, sequence); // TODO : TMapModule 에서 Marker 에 Sequence 개념 도입 이후 수정 예정
                    },
                );
                stomp.subscribe(`/sub/${courseId}/pin/removal`, (message) => {
                    if (!tmapModuleRef.current) return;
                    const { pinId }: CourseSocketSubType['removal'] =
                        JSON.parse(message.body);
                    tmapModuleRef.current.removeMarker(pinId);
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from the broker');
                stomp.deactivate();
            },
            onStompError: (frame) => {
                console.log('Broker reported error:', frame);
                stomp.deactivate();
            },
        });

        stomp.activate();
        stompClient.current = stomp;

        return () => {
            stompClient.current?.deactivate();
        };
    }, [courseId, tmapModuleRef]);

    return {
        modifyPinName,
        modifyPinOrder,
        addPin,
        removePin,
    };
};
