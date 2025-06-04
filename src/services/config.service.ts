import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import { MutuelleConfig } from "../types/config.types";

export const fetchConfigCurrent = async (accessToken: string): Promise<MutuelleConfig> => {
  const { data } = await axios.get<MutuelleConfig>(API_BASE_URL + API_ENDPOINTS.configCurrent, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return data;
};

// ✅ CORRECTION : Ordre logique des paramètres
export const updateMutuelleConfig = async (
  configUpdates: Partial<MutuelleConfig>, 
  accessToken: string,
  idconf: string  // ✅ Type string au lieu de any
): Promise<MutuelleConfig> => {
  const { data } = await axios.patch<MutuelleConfig>(
    `${API_BASE_URL}${API_ENDPOINTS.configurations}${idconf}/`, // ✅ Template string plus propre
    configUpdates,
    {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return data;
};

// 🆕 FONCTION : Créer un nouvel exercice (nouvelle session)
export const createNewExercise = async (
  exerciseData: {
    date_debut: string;
    montant_agape: number;
    duree_mois?: number;
  },
  accessToken: string
): Promise<any> => {
  const { data } = await axios.post(
    API_BASE_URL + API_ENDPOINTS.exercises,
    exerciseData,
    {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return data;
};