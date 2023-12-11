import { ButtonBGColor } from "../components/global/Button";
import { LS_USER_KEY } from "./Constants";

export type ValidateObject = {
  isInvalid: boolean;
  validateMessage: string;
};

// background color
export function getBGColor(color: ButtonBGColor) {
  switch (color) {
    case "orange":
      return "bg-orange-500";
    case "green":
      return "bg-green-500";
    case "gray":
      return "bg-gray-500";
    case "red":
      return "bg-red-500";
    default:
      return "bg-orange-500";
  }
}

// validate room name
export function isValidateRoomName(name: string): boolean {
  if (name === "" || name.match("[^a-zA-Z0-9]")) {
    return false;
  }
  return true;
}

export function getCurrentPlayer(
  players: User[],
  currentUserId: string | undefined
) {
  if (!currentUserId) return null;
  return players.find((player) => player._id === currentUserId);
}

export function isSessionUsersIncludeCurrentUser(
  currentUserId: string | undefined
) {
  const sessionUsersJSONString = localStorage.getItem(LS_USER_KEY);
  if (!sessionUsersJSONString) return false;
  const sessionUsers = JSON.parse(sessionUsersJSONString) as User[];
  return sessionUsers.some((user) => user._id === currentUserId);
}
