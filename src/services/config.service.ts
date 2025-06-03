import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import { MutuelleConfig } from "../types/config.types";

export const fetchConfigCurrent = async (accessToken: string): Promise<MutuelleConfig> => {
  const { data } = await axios.get<MutuelleConfig>(API_BASE_URL + API_ENDPOINTS.configCurrent, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
};