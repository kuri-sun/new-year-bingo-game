import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsersByRoomId } from "../clients/usersService";
import BingoCard from "../components/pages/BingoCard";
import { getRoom } from "../clients/roomsService";
import { Room } from "../models/Room";
import Roulette from "../components/pages/Roulette";

// Game page
export default function Game() {
  const { roomId } = useParams();

  const [players, setPlayers] = useState<User[]>([]);
  const [updateCounter, setUpdateCounter] = useState(0);

  useEffect(() => {
    async function getPlayers() {
      const { data } = await getUsersByRoomId(roomId!);
      setPlayers(data);
    }
    if (roomId) {
      getPlayers();
    }
  }, [roomId]);

  if (players.length === 0) return <div>No...</div>;
  return (
    <div className="w-full h-[calc(100%-48px)] flex flex-col items-center justify-between bg-[url('/')] bg-cover">
      <div className="w-full h-[calc(100%-264px)] flex flex-row">
        <Roulette
          updateCounter={updateCounter}
          setUpdateCounter={setUpdateCounter}
          roomId={roomId}
          players={players}
        />
      </div>
      <div className="w-full flex flex-row bottom-0 bg-white">
        <div className="flex flex-col p-[16px] w-full overflow-y-auto border">
          <div className="flex flex-row gap-[16px]">
            {players.map((player) => {
              return (
                <BingoCard updateCounter={updateCounter} holder={player} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
