import { useNavigate } from "react-router-dom";
import Button from "../global/Button";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { getRoom } from "../../clients/roomsService";
import { Room } from "../../models/Room";
import {
  getCurrentPlayer,
  isSessionUsersIncludeCurrentUser,
} from "../../utils/Utility";
import { LS_USER_KEY } from "../../utils/Constants";
import { useTranslation } from "../../../node_modules/react-i18next";

type RouletteProps = {
  updateCounter: number;
  notifyUIUpdateForBingo: () => void;
  notifyUIUpdateForPlayers: () => void;
  roomId: string | undefined;
  players: User[];
};

export default function Roulette({
  updateCounter,
  notifyUIUpdateForBingo,
  notifyUIUpdateForPlayers,
  roomId,
  players,
}: RouletteProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [roulette, setRoulette] = useState(0);
  const [isRouletteAnimation, setIsRouletteAnimation] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  const currentPlayerName = getCurrentPlayer(players, room?.current)?.name;
  const isCurrentPlayerIsOurSession = isSessionUsersIncludeCurrentUser(
    room?.current
  );

  function onConnect() {}
  function onDisconnect() {}

  // After "you" started the roulette
  function onStartRoulette() {
    socket.emit("roulette", {
      roomId,
    });
  }

  // After someone started enters the room
  function onSomeoneEnterRoom() {
    console.log("someone enters a room");
    setTimeout(() => {
      notifyUIUpdateForPlayers();
    }, 500);
  }

  // After someone started the roulette
  function onSomeoneRouletteStarted(data: any) {
    setIsRouletteAnimation(true);
    setRoulette(data.ranNum);
    // it takes 2s for the transition. ref:index.css
    setTimeout(() => {
      notifyUIUpdateForBingo();
      setIsRouletteAnimation(false);
    }, 2000);
  }

  // When user decide to disconnect
  function onExit() {
    if (confirm("Are you sure to exit this game?")) {
      const sessionUsersString = localStorage.getItem(LS_USER_KEY);
      if (sessionUsersString) {
        const sessionUsers = JSON.parse(sessionUsersString) as User[];
        socket.emit("exitRoom", { sessionUsers, roomId });
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
    socket.on("roulette", onSomeoneRouletteStarted);
    socket.on("enter", onSomeoneEnterRoom);
    socket.emit("enter", {
      roomId,
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("roulette", onSomeoneRouletteStarted);
      socket.off("enter", onSomeoneEnterRoom);
    };
  }, []);

  return (
    <div className="w-full flex flex-row gap-[8px] border  overflow-y-auto">
      <div className="flex flex-col w-full items-center justify-center border bg-[url('/bg.png')]">
        <div
          className={"ball " + (isRouletteAnimation ? "ball-animation" : "")}
        >
          <p className="ball-number">{roulette.toString()}</p>
        </div>
      </div>
      <div className="w-[300px] flex flex-col mt-[24px] ml-[24px] mr-[24px] gap-[24px]">
        <div className="flex flex-row items-center text-xl font-bold">
          {t("currentPlayerLabel", { who: currentPlayerName })}
        </div>
        {/* Roulette Buttons */}
        {isCurrentPlayerIsOurSession && (
          <Button
            color="green"
            title={t("rouletteButton")}
            onClick={onStartRoulette}
          />
        )}
        <Button color="red" title={t("exitButton")} onClick={onExit} />
      </div>
    </div>
  );
}
