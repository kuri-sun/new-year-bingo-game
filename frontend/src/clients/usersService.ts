import axios from "axios";
import { REST_API_URL } from "../utils/Constants";

export async function getUsersByRoomId(roomId: string) {
  return axios.get(REST_API_URL + "/users/room/" + roomId);
}

export async function addUser(name: string, roomId: string) {
  return axios.post(REST_API_URL + "/users/", { name, roomId });
}

export async function deleteUser(id: string) {
  return axios.post(REST_API_URL + "/users/" + id);
}
