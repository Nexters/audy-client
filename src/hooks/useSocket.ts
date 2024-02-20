import { useEffect, useState } from 'react';

import { Socket, io } from 'socket.io-client';

const serverUrl = 'wss://api.audy-gakka.com/course';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [receivedData, setReceivedData] = useState<string>('');

    useEffect(() => {
        const newSocket = io(serverUrl);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleSocketData = (data: string) => {
            setReceivedData(data);
        };

        socket.on('data', handleSocketData);

        return () => {
            socket.off('data', handleSocketData);
        };
    }, [socket]);

    useEffect(() => {
        const handleDisconnect = () => {
            console.log('연결이 종료되었습니다.');
        };

        if (socket) {
            socket.on('disconnect', handleDisconnect);
        }

        return () => {
            if (socket) {
                socket.off('disconnect', handleDisconnect);
            }
        };
    }, [socket]);

    const sendData = (data: string) => {
        if (socket && socket.connected) {
            socket.emit('sendData', data);
        }
    };

    return { sendData, receivedData };
};
