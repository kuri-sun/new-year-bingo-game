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

export type BingoCardState = "win" | "reach" | "normal";
export function getBingoCardState(board: number[][]): BingoCardState {
  let state: BingoCardState = "normal";
  let filledFirstCol = [];
  let filledSecondCol = [];
  let filledThridCol = [];
  let filledForthCol = [];
  let filledFifthCol = [];
  let filledDiagnal1 = [];
  let filledDiagnal2 = [];
  for (let i = 0; i < board.length; i++) {
    const arr = board[i];

    let filledRow = [];

    for (let j = 0; j < arr.length; j++) {
      const cell = arr[j];
      // check the horizontal match
      if (cell === -1) filledRow.push(cell);
      // check the vertical match
      if (j === 0 && cell === -1) {
        filledFirstCol.push(cell);
      }
      if (j === 1 && cell === -1) {
        filledSecondCol.push(cell);
      }
      if (j === 2 && cell === -1) {
        filledThridCol.push(cell);
      }
      if (j === 3 && cell === -1) {
        filledForthCol.push(cell);
      }
      if (j === 4 && cell === -1) {
        filledFifthCol.push(cell);
      }
      // check the diagnal match
      if (i === j && cell === -1) {
        filledDiagnal1.push(cell);
      }
      if (j === arr.length - i - 1 && cell === -1) {
        filledDiagnal2.push(cell);
      }
    }
    // check the horizontal match
    state = checkReachOrWin(filledRow, state);
  }
  // check the vertical match
  state = checkReachOrWin(filledFirstCol, state);
  state = checkReachOrWin(filledSecondCol, state);
  state = checkReachOrWin(filledThridCol, state);
  state = checkReachOrWin(filledForthCol, state);
  state = checkReachOrWin(filledFifthCol, state);
  // check the diagnal match
  state = checkReachOrWin(filledDiagnal1, state);
  state = checkReachOrWin(filledDiagnal2, state);

  return state;
}

function checkReachOrWin(
  filledCells: number[],
  currentState: BingoCardState
): BingoCardState {
  if (filledCells.length === 4 && currentState === "normal") return "reach";
  if (filledCells.length === 5 && currentState !== "win") return "win";
  return currentState;
}

export function getBingoCardBgColor(state: BingoCardState): string {
  switch (state) {
    case "win":
      return "bg-gray-400";
    case "reach":
      return "bg-orange-400";
    case "normal":
      return "bg-green-400";
  }
}
