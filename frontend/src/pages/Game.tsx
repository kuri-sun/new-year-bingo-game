import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { getUsersByRoomId } from "../clients/usersService";
import BingoCard from "../components/pages/BingoCard";

import Roulette from "../components/pages/Roulette";

// Game page
export default function Game() {
  const { roomId } = useParams();

  const [players, setPlayers] = useState<User[]>([]);
  const [bingoUpdateCounter, bingoForceUpdate] = useReducer((x) => x + 1, 0); // re-render
  const [playersUpdateCounter, playersForceUpdate] = useReducer(
    (x) => x + 1,
    0
  ); // re-render

  function notifyUIUpdateForPlayers() {
    playersForceUpdate();
  }
  function notifyUIUpdateForBingo() {
    bingoForceUpdate();
  }

  useEffect(() => {
    async function getPlayers() {
      const { data } = await getUsersByRoomId(roomId!);
      setPlayers(data);
    }
    if (roomId) {
      getPlayers();
    }
  }, [roomId, playersUpdateCounter]);

  if (players.length === 0) return <div>No...</div>;
  return (
    <div className="w-full h-[calc(100%-48px)] flex flex-col items-center justify-between bg-[url('/')] bg-cover">
      <div className="w-full h-[calc(100%-264px)] flex flex-row">
        <Roulette
          updateCounter={bingoUpdateCounter}
          notifyUIUpdateForBingo={notifyUIUpdateForBingo}
          notifyUIUpdateForPlayers={notifyUIUpdateForPlayers}
          roomId={roomId}
          players={players}
        />
      </div>
      <div className="w-full flex flex-row bottom-0 bg-white">
        <div className="flex flex-col p-[16px] w-full overflow-y-auto border">
          <div className="flex flex-row gap-[16px]">
            {players.map((player) => {
              return (
                <BingoCard
                  key={player._id}
                  updateCounter={bingoUpdateCounter}
                  holder={player}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
