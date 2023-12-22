import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${process.env.REACT_APP_SOCKET}/ws`);
    setSocket(newSocket);

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
