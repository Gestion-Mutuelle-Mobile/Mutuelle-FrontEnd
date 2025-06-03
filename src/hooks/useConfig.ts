import { useQuery } from "@tanstack/react-query";
import { fetchConfigCurrent } from "../services/config.service";
import { MutuelleConfig } from "../types/config.types";
import { getStoredAccessToken } from "../services/auth.service";

export function useMutuelleConfig() {
  return useQuery<MutuelleConfig>({
    queryKey: ["mutuelle-config"],
    queryFn: async () => {
      const token = await getStoredAccessToken();
      if (!token) throw new Error("Token manquant");
      return fetchConfigCurrent(token);
    },
    staleTime: 15 * 60 * 1000, // 15 min
  });
}