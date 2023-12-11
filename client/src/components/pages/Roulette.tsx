import { useNavigate } from "react-router-dom";
import Button from "../global/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { socket } from "../../socket";
import { getRoom } from "../../clients/roomsService";
import { Room } from "../../models/Room";
import {
  getCurrentPlayer,
  isSessionUsersIncludeCurrentUser,
} from "../../utils/Utility";
import { deleteUser } from "../../clients/usersService";
import { LS_USER_KEY } from "../../utils/Constants";

type RouletteProps = {
  updateCounter: number;
  setUpdateCounter: Dispatch<SetStateAction<number>>;
  roomId: string | undefined;
  players: User[];
};

export default function Roulette({
  updateCounter,
  setUpdateCounter,
  roomId,
  players,
}: RouletteProps) {
  const navigate = useNavigate();

  const [roulette, setRoulette] = useState(0);
  const [room, setRoom] = useState<Room | null>(null);

  const currentPlayerName = getCurrentPlayer(players, room?.current)?.name;
  const isCurrentPlayerIsOurSession = isSessionUsersIncludeCurrentUser(
    room?.current
  );

  function onConnect() {}
  function onDisconnect() {}

  function onStartRoulette() {
    socket.emit("roulette", {
      roomId,
      players,
    });
  }
  function onRoulette(data: any) {
    setRoulette(data.ranNum);
    // update UI
    setTimeout(() => {
      setUpdateCounter(updateCounter + 1);
    }, 1000);
  }
  async function onExit() {
    if (confirm("Are you sure to exit this game?")) {
      const sessionUsersString = localStorage.getItem(LS_USER_KEY);
      if (sessionUsersString) {
        const sessionUsers = JSON.parse(sessionUsersString) as User[];
        sessionUsers.forEach(async (user) => {
          await deleteUser(user._id);
        });
      }
      localStorage.removeItem(LS_USER_KEY);
      navigate("/");
    }
  }

  // rest
  useEffect(() => {
    async function getRoomData() {
      const { data } = await getRoom(roomId!);
      setRoom(data);
    }
    getRoomData();
  }, [updateCounter]);

  // socket
  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("roulette", onRoulette);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("roulette", onRoulette);

      socket.emit("enter", {
        roomId,
      });
    };
  }, []);

  console.log("room data", room);
  return (
    <div className="w-full flex flex-row gap-[8px] border  overflow-y-auto">
      <div className="flex flex-col w-full items-center justify-center border">
        {roulette}
      </div>
      <div className="w-[300px] flex flex-col mt-[24px] ml-[24px] mr-[24px] gap-[24px]">
        <div className="flex flex-row items-center text-xl font-bold">
          {currentPlayerName}'s turn!
        </div>
        {/* Roulette Buttons */}
        {isCurrentPlayerIsOurSession && (
          <Button color="green" title="Roulette" onClick={onStartRoulette} />
        )}
        <Button color="red" title="Exit" onClick={onExit} />
      </div>
    </div>
  );
}
