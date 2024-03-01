import type { PropsWithChildren, MutableRefObject } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

import { Client as StompClient } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

import type { ApiResponseType } from '@/apis/api';
import type { CourseSocketSubType } from '@/apis/course/type';
import { TmapContext } from '@/utils/tmap/TmapModuleProvider';

interface StompProviderType {
    stompClient: MutableRefObject<StompClient | null>;
}

export const StompContext = createContext<StompProviderType>(
    {} as StompProviderType,
);

/**
 * StompClient 를 생성하여 주입하는 Provider StompProvider
 */
export const StompProvider = ({ children }: PropsWithChildren) => {
    const stompClient = useRef<StompClient | null>(null);
    const { courseId } = useParams();
    const { tmapModule } = useContext(TmapContext);

    useEffect(() => {
        if (stompClient.current) return;

        const stomp = new StompClient({
            brokerURL: `wss://api.audy-gakka.com/course/${courseId}`,
            onConnect: () => {
                console.log('Connected to the broker');

                stomp.subscribe(`/sub/${courseId}/pin/addition`, (message) => {
                    const {
                        data: newMarker,
                    }: ApiResponseType<CourseSocketSubType['addition']> =
                        JSON.parse(message.body);

                    tmapModule?.createMarker({
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
                        const {
                            data: { pinId, pinName },
                        }: ApiResponseType<CourseSocketSubType['modifyName']> =
                            JSON.parse(message.body);
                        console.log(pinId, pinName); // TODO : TMapModule 에서 Marker 에 Sequence 개념 도입 이후 수정 예정
                    },
                );

                stomp.subscribe(
                    `/sub/${courseId}/pin/modification/sequence`,
                    (message) => {
                        const {
                            data: { pinId, sequence },
                        }: ApiResponseType<
                            CourseSocketSubType['modifySequence']
                        > = JSON.parse(message.body);
                        console.log(pinId, sequence); // TODO : TMapModule 에서 Marker 에 Sequence 개념 도입 이후 수정 예정
                    },
                );

                stomp.subscribe(`/sub/${courseId}/pin/removal`, (message) => {
                    if (!tmapModule) return;
                    console.log('remove from socket', message.body);
                    const { pinId }: CourseSocketSubType['removal'] =
                        JSON.parse(message.body);
                    tmapModule.removeMarker(pinId);
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
            stompClient.current = null;
        };
    }, [courseId, stompClient, tmapModule]);

    const value = useMemo(
        () => ({
            stompClient,
        }),
        [stompClient],
    );

    return (
        <StompContext.Provider value={value}>{children}</StompContext.Provider>
    );
};
