import { useState } from "react";
import Box from "../components/global/Box";
import Button from "../components/global/Button";
import { useNavigate } from "react-router-dom";
import TextField from "../components/global/TextField";
import { ValidateObject, isValidateRoomName } from "../utils/Utility";
import { addRoom } from "../clients/roomsService";
import { LS_USER_KEY } from "../utils/Constants";

// AddRoom page
export default function AddRoom() {
  const navigate = useNavigate();

  const [validateRoomName, setValidateRoomName] =
    useState<ValidateObject | null>(null);
  const [roomName, setRoomName] = useState("");

  const [validatePlayers, setValidatePlayers] = useState<ValidateObject | null>(
    null
  );
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  async function onAddRoom() {
    if (isValidateRoomName(roomName)) {
      const { data } = await addRoom(roomName, players);
      // Store all users data in LS.
      localStorage.setItem(LS_USER_KEY, JSON.stringify(data.users));
      navigate("/game/" + data.room._id);
    } else {
      setValidateRoomName({
        isInvalid: true,
        validateMessage:
          "Room name is invalid format(You can not include any special chars or spaces).",
      });
    }
  }

  function onAddPlayer() {
    if (playerName.length > 2) {
      setPlayers([...players, playerName]);
      setPlayerName("");
    } else {
      setValidatePlayers({
        isInvalid: true,
        validateMessage: "Username can not be less than 2 chars.",
      });
    }
  }

  return (
    <div className="flex flex-col h-[calc(100%-48px)] items-center justify-center bg-[url('/onen1.jpg')] bg-cover">
      <Box
        title="Let's create your room!"
        children={
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[8px]">
              <div className="font-semibold">Add member:</div>
              <div className="flex flex-row items-center gap-[8px]">
                <input
                  value={playerName}
                  className="p-[8px] border border-gray-500 rounded"
                  onChange={(e) => {
                    setPlayerName(e.target.value);
                  }}
                />
                <div
                  className="flex flex-col w-[30px] h-[30px] items-center justify-center bg-gray-500 rounded-full font-bold text-white text-[20px] cursor-pointer"
                  onClick={onAddPlayer}
                >
                  +
                </div>
              </div>
              {/* Invalid */}
              <div className="font-semibold text-red-500">
                {validatePlayers?.validateMessage}
              </div>
              {/* Tips */}
              <div className="flex flex-row flex-wrap gap-[4px]">
                {players.map((person) => {
                  return (
                    <div className="flex flex-row items-center px-[8px] py-[4px] gap-[8px] rounded bg-green-500 text-white text-l">
                      <div className="">{person}</div>
                      <div className="font-bold cursor-pointer">x</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <TextField
              label="Room name: "
              onChange={(e) => {
                setRoomName(e.target.value);
                setValidateRoomName(null);
              }}
              invalid={validateRoomName?.isInvalid}
              invalidMessage={validateRoomName?.validateMessage}
            />
            <Button
              color="orange"
              title={
                "Create " + (roomName ? roomName + "'s" : "this") + " Room"
              }
              onClick={onAddRoom}
            />
            <Button
              color="gray"
              title="Go back"
              onClick={() => navigate("/")}
            />
          </div>
        }
      />
    </div>
  );
}
