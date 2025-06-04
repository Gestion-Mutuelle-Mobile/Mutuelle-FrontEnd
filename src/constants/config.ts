// Paramètres globaux de l'application (front uniquement)

export const COLORS = {
  // Couleurs principales
  primary: "#2563EB",         // Bleu principal
  primaryDark: "#1D4ED8",     // Bleu foncé (pour gradients et hover)
  primaryLight: "#60A5FA",    // Bleu clair (pour backgrounds subtils)
  
  // Fond et surfaces
  background: "#FFFFFF",      // Fond blanc principal
  surface: "#F8FAFC",        // Surface légèrement grise (cards, inputs)
  surfaceSecondary: "#F1F5F9", // Surface secondaire
  
  // Couleurs secondaires
  accent: "#1E40AF",         // Bleu foncé pour accents
  
  // Nuances de gris
  greyLight: "#F1F5F9",      // Gris très clair
  greyMedium: "#CBD5E1",     // Gris moyen
  grey: "#b4bcc7",           // Gris standard
  greyDark: "#64748B",       // Gris foncé
  
  // Textes
  text: "#22223B",           // Texte principal (foncé)
  textSecondary: "#64748B",  // Texte secondaire (gris moyen)
  textLight: "#94A3B8",      // Texte clair (placeholders, labels subtils)
  textInverse: "#FFFFFF",    // Texte blanc (sur fonds colorés)
  
  // États et feedback
  error: "#DC2626",          // Rouge pour erreurs
  success: "#059669",        // Vert pour succès
  warning: "#D97706",        // Orange pour avertissements
  info: "#2563EB",           // Bleu pour informations
  
  // Bordures
  border: "#E2E8F0",         // Bordure standard
  borderLight: "#F1F5F9",    // Bordure très claire
  borderDark: "#CBD5E1",     // Bordure plus marquée
  
  // Statuts spécifiques mutuelle
  statusGreen: "#10B981",    // Vert pour "en règle"
  statusRed: "#EF4444",      // Rouge pour "non en règle"
  statusOrange: "#F59E0B",   // Orange pour "suspendu" ou "en retard"
  
  // Overlays et ombres
  overlay: "rgba(0, 0, 0, 0.5)",           // Overlay modal
  overlayLight: "rgba(0, 0, 0, 0.2)",      // Overlay léger
  shadow: "rgba(0, 0, 0, 0.1)",            // Ombre standard
  shadowDark: "rgba(0, 0, 0, 0.25)",       // Ombre marquée
  
  // Couleurs avec transparence (pour backgrounds subtils)
  primaryWithOpacity: (opacity: number) => `rgba(37, 99, 235, ${opacity})`,
  successWithOpacity: (opacity: number) => `rgba(5, 150, 105, ${opacity})`,
  errorWithOpacity: (opacity: number) => `rgba(220, 38, 38, ${opacity})`,
  warningWithOpacity: (opacity: number) => `rgba(217, 119, 6, ${opacity})`,
};

// Gradients prédéfinis
export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryDark],
  header: [COLORS.primary, COLORS.accent],
  card: [COLORS.background, COLORS.surface],
  success: [COLORS.success, "#047857"],
  error: [COLORS.error, "#B91C1C"],
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

// Dimensions et espacements
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
};

export const FONT_WEIGHTS = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  heavy: '800' as const,
};