import axios from "axios";
import { API_URL } from "../utils/Constants";

export async function getAllRooms() {
  return axios.get(API_URL + "/rooms/");
}

export async function getRoom(id: string) {
  return axios.get(API_URL + "/rooms/" + id);
}

export async function addRoom(name: string, players: string[]) {
  return axios.post(API_URL + "/rooms/", { name, players });
}

export async function deleteRoom(id: string) {
  return axios.delete(API_URL + "/rooms/" + id);
}
