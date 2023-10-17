import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socketContext = createContext<Socket | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const useSocket = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <socketContext.Provider value={socket}>{children}</socketContext.Provider>
  );
};
