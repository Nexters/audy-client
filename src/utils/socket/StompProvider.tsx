import type { MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef } from 'react';

import { Client as StompClient } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';

import type { ApiResponseType } from '@/apis/api';
import type { CourseSocketSubType } from '@/apis/course/type';
import { UserSocketSubType } from '@/apis/user/type';
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
        if (stompClient.current || !tmapModule) return;

        const stomp = new StompClient({
            brokerURL: `wss://api.audy-gakka.com/course/${courseId}`,
            onConnect: () => {
                console.log('Connected to the broker');

                stomp.subscribe(`/sub/${courseId}/pin/addition`, (message) => {
                    const {
                        data: newMarker,
                    }: ApiResponseType<CourseSocketSubType['addition']> =
                        JSON.parse(message.body);

                    tmapModule?.createMarker(newMarker);
                });

                stomp.subscribe(
                    `/sub/${courseId}/pin/modification/name`,
                    (message) => {
                        const {
                            data: { pinId, pinName },
                        }: ApiResponseType<CourseSocketSubType['modifyName']> =
                            JSON.parse(message.body);
                        tmapModule?.renameMarker({ pinId, pinName });
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

                        tmapModule?.setMarkerSequence({
                            pinId,
                            sequence: sequence,
                        });
                    },
                );

                stomp.subscribe(`/sub/${courseId}/pin/removal`, (message) => {
                    const {
                        data: { pinId },
                    }: ApiResponseType<CourseSocketSubType['removal']> =
                        JSON.parse(message.body);

                    tmapModule?.removeMarker(pinId);
                });

                stomp.subscribe(`/sub/${courseId}/user`, (message) => {
                    const {
                        data: { total, users },
                    }: ApiResponseType<UserSocketSubType['getUserList']> =
                        JSON.parse(message.body);

                    window.dispatchEvent(
                        new CustomEvent('user:list', {
                            detail: { total, users },
                        }),
                    );
                });

                // NOTE : 유저가 접속했을 때 Trigger 하도록 유도
                stompClient.current?.publish({
                    destination: `/pub/${courseId}/user`,
                });
            },
            onDisconnect: () => {
                stompClient.current?.publish({
                    destination: `/pub/${courseId}/user`,
                });
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
