import { socket } from "../socket";
import { useState, useEffect } from "react";

type Props = {};

export default function Sockettest({}: Props) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roulette, setRoulette] = useState(0);

  function onConnect() {
    setIsConnected(true);
  }

  function onDisconnect() {
    setIsConnected(false);
  }

  function onRoulette(value: any) {
    setRoulette(value);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("roulette", onRoulette);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("roulette", onRoulette);

      socket.emit("enter", {
        roomId: "1",
      });
    };
  }, []);

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function emit() {
    socket.emit("roulette", {
      roomId: "1",
    });
  }

  return (
    <div>
      <div>
        {isConnected.toString()} {roulette}
      </div>
      <>
        <button onClick={connect}>Connect</button>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={emit}>Roulette</button>
      </>
    </div>
  );
}
