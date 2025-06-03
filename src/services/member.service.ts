import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import { Member } from "../types/member.types";

export const fetchMembers = async (accessToken: string, params?: Record<string, any>): Promise<Member[]> => {
  const { data } = await axios.get<Member[]>(API_BASE_URL + API_ENDPOINTS.members, {
    params,
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
};

export const fetchMemberById = async (id: string, accessToken: string): Promise<Member> => {
  const { data } = await axios.get<Member>(API_BASE_URL + API_ENDPOINTS.memberDetails(id), {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
};

export const fetchMemberFullData = async (id: string, accessToken: string) => {
  const { data } = await axios.get(API_BASE_URL + API_ENDPOINTS.memberFullData(id), {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
};