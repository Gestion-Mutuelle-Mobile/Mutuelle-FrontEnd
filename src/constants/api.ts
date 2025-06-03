// Point d'entrée centralisé pour toutes les URLs d'API

export const API_BASE_URL = "http://localhost:8000/api";

export const API_ENDPOINTS = {
  // Auth
  login: "/token/",
  refresh: "/token/refresh/",
  verify: "/token/verify/",
  me: "/auth/utilisateurs/me/",
  updateProfile: "/auth/utilisateurs/update_profile/",
  changePassword: "/auth/change-password/",

  // Utilisateurs
  users: "/auth/utilisateurs/",

  // Membres
  members: "/core/membres/",
  memberDetails: (id: string) => `/core/membres/${id}/`,
  memberFullData: (id: string) => `/core/membres/${id}/donnees_completes/`,

  // Config
  configCurrent: "/core/configurations/current/",

  // Exercices
  exercises: "/core/exercices/",
  exerciseCurrent: "/core/exercices/current/",

  // Sessions
  sessions: "/core/sessions/",
  sessionCurrent: "/core/sessions/current/",

  // Solidarité & Fonds social
  solidarityPayments: "/transactions/paiements-solidarite/",
  socialFundCurrent: "/core/fonds-social/current/",
  socialFundHistory: "/core/fonds-social/",

  // Épargne
  savings: "/transactions/epargne-transactions/",

  // Emprunts & remboursements
  loans: "/transactions/emprunts/",
  loanStats: "/transactions/emprunts/statistiques/",
  repayments: "/transactions/remboursements/",

  // Renflouements
  renflouements: "/transactions/renflouements/",
  renflouementStats: "/transactions/renflouements/statistiques/",
  renflouementPayments: "/transactions/paiements-renflouement/",

  // Assistances
  assistances: "/transactions/assistances/",
  assistanceTypes: "/core/types-assistance/",

  // Admin
  adminDashboard: "/administration/dashboard/dashboard_complet/",
  adminMemberManagement: "/administration/gestion-membres/",
  adminReports: "/administration/rapports/rapport_financier_complet/",

  // Création membre complet (admin)
  adminCreateMember: "/administration/gestion-membres/creer_membre_complet/",
};