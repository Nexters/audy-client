import { useEffect, useState } from 'react';

import { Socket, io } from 'socket.io-client';

const serverUrl = 'wss://api.audy-gakka.com/course';

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [receivedMessage, setReceivedMessage] = useState<string>('');

    useEffect(() => {
        const newSocket = io(serverUrl);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const handleSocketMessage = (data: string) => {
            setReceivedMessage(data);
        };

        socket.on('message', handleSocketMessage);

        return () => {
            socket.off('message', handleSocketMessage);
        };
    }, [socket]);

    const sendMessage = (message: string) => {
        if (socket && socket.connected) {
            socket.emit('message', message);
        }
    };

    return { sendMessage, receivedMessage };
};
