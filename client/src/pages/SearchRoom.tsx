import Box from "../components/global/Box";
import { useNavigate } from "react-router-dom";
import Button from "../components/global/Button";
import Dropdown, { OptionItem } from "../components/global/Dropdown";
import { useEffect, useState } from "react";
import TextField from "../components/global/TextField";
import { ValidateObject } from "../utils/Utility";
import { getAllRooms } from "../clients/roomsService";
import { Room } from "../models/Room";
import { addUser } from "../clients/usersService";
import { LS_USER_KEY } from "../utils/Constants";

// SearchRoom page
export default function SearchRoom() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<OptionItem[]>([]);
  const [selecedRoom, setSelectedRoom] = useState<OptionItem | null>();

  const [username, setUsername] = useState("");
  const [validateUsername, setValidateUsername] =
    useState<ValidateObject | null>(null);

  useEffect(() => {
    const getRooms = async () => {
      const { data } = await getAllRooms();
      const newRooms = data.map((room: Room) => {
        return { label: room.name, value: room._id };
      });
      setRooms(newRooms);
    };
    getRooms();
  }, []);

  async function onEnterRoom() {
    if (username.length < 3) {
      setValidateUsername({
        isInvalid: true,
        validateMessage: "You name is invalid.",
      });
    }
    if (selecedRoom && !validateUsername?.isInvalid) {
      const { data } = await addUser(username, selecedRoom.value);
      // store user data in LS.
      localStorage.setItem(LS_USER_KEY, JSON.stringify([data]));
      navigate("/game/" + selecedRoom.value);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100%-48px)] items-center justify-center bg-[url('/osetsi.jpg')] bg-cover">
      <Box
        title="Let's choose your room!"
        children={
          <div className="flex flex-col gap-[24px]">
            <TextField
              label="Your name: "
              onChange={(e) => {
                if (e.target.value && e.target.value.length > 2) {
                  setUsername(e.target.value);
                  setValidateUsername(null);
                } else {
                  setValidateUsername({
                    isInvalid: true,
                    validateMessage: "Your name is invalid.",
                  });
                }
              }}
              invalid={validateUsername?.isInvalid}
              invalidMessage={validateUsername?.validateMessage}
            />
            <Dropdown
              label="Room list:"
              optionItems={rooms}
              onChange={(e) => {
                if (e.target.value) {
                  const selected = rooms.find(
                    (r) => r.value === e.target.value
                  );
                  setSelectedRoom(selected);
                }
              }}
              invalid={!!!selecedRoom}
              invalidMessage="You need to choose a room."
            />
            <Button
              color="green"
              title={
                "Enter " + (selecedRoom ? selecedRoom + "'s" : "a") + " Room"
              }
              onClick={onEnterRoom}
              disabled={!!!selecedRoom}
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
