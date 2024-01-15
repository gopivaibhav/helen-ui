import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.REACT_APP_SOCKET}/ws/${JSON.parse(sessionStorage.getItem('userDetail')).email}`);
    newSocket.onopen = () => {
      console.log('WebSocket connected');
    };
    setSocket(newSocket);

    newSocket.onclose = (event) => {
      console.log('WebSocket closed:', event);

      setTimeout(() => {
        const reopenedSocket = new WebSocket(`${process.env.REACT_APP_SOCKET}/ws/${JSON.parse(sessionStorage.getItem('userDetail')).email}`);
        setSocket(reopenedSocket);
      }, 100);
    };

    return () => {
      newSocket.close();
    };
  }, []); // Only run once during component mounting

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const socket = useContext(WebSocketContext);

  if (!socket) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }

  return socket;
};
