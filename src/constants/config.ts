// Paramètres globaux de l'application (front uniquement)

export const COLORS = {
    primary: "#2563EB",       // Bleu principal
    background: "#FFFFFF",    // Fond blanc
    accent: "#1E40AF",        // Bleu foncé pour accents
    greyLight: "#F1F5F9",
    greyMedium: "#CBD5E1",
    text: "#22223B",
    error: "#DC2626",
    success: "#059669",
    info: "#2563EB",
  };
  
  export const PIN_LENGTH = 4;
  export const DEFAULT_SESSION_AGAPE = 45000;
  export const SESSION_LIMIT_PER_MONTH = 1;
  
  export const DATE_FORMATS = {
    api: "YYYY-MM-DD",
    display: "DD/MM/YYYY",
  };
  
  export const PAGINATION = {
    pageSize: 20,
  };
  
  export const ASYNC_STORAGE_KEYS = {
    accessToken: "mutuelle_access_token",
    refreshToken: "mutuelle_refresh_token",
    currentUser: "mutuelle_current_user",
    pin: "mutuelle_pin",
    config: "mutuelle_config",
  };