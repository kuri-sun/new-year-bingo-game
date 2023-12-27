import axios from "axios";
import { REST_API_URL } from "../utils/Constants";

export async function getBingoCardByUserId(userId: string) {
  return axios.get(REST_API_URL + "/bingoCards/user/" + userId);
}

export async function updateBigoCard(id: string, newBoard: string) {
  return axios.put(REST_API_URL + "/bingoCards/" + id, { newBoard });
}

export async function refreshBigoCard(id: string) {
  return axios.put(REST_API_URL + "/bingoCards/" + id, {});
}

export async function deleteBigoCard(id: string) {
  return axios.delete(REST_API_URL + "/bingoCards/" + id);
}
