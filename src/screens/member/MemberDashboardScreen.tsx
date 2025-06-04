import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/config";
import { useMemberDetail } from "../../hooks/useMember";
import { useAuthContext } from "../../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function MemberDashboardScreen() {
  const { user } = useAuthContext();
  const { data: member, isLoading, error, refetch } = useMemberDetail(user?.id||"");

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  if (error || !member) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erreur lors du chargement des informations.</Text>
        <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
          <Ionicons name="refresh" size={22} color={COLORS.primary} />
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 36 }}>
      <Text style={styles.title}>Mon Tableau de Bord</Text>
      <View style={styles.cardGroup}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Épargne</Text>
          <Text style={styles.cardValue}>{member.donnees_financieres.epargne.epargne_totale} FCFA</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Intérêts</Text>
          <Text style={styles.cardValue}>{member.donnees_financieres.epargne.montant_interets_separe} FCFA</Text>
        </View>
      </View>
      <View style={styles.cardGroup}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Statut inscription</Text>
          <Text style={styles.cardValue}>
            {member.donnees_financieres.inscription.inscription_complete ? "Réglée" : "Non réglée"}
          </Text>
          <Text style={styles.cardSub}>
            {member.donnees_financieres.inscription.montant_paye_inscription} / {member.donnees_financieres.inscription.montant_total_inscription} FCFA
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Solidarité</Text>
          <Text style={styles.cardValue}>
            {member.donnees_financieres.solidarite.solidarite_a_jour ? "À jour" : "En retard"}
          </Text>
          <Text style={styles.cardSub}>
            {member.donnees_financieres.solidarite.montant_paye_session_courante} / {member.donnees_financieres.solidarite.montant_solidarite_session_courante} FCFA
          </Text>
        </View>
      </View>
      <View style={styles.cardGroup}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Emprunt en cours</Text>
          <Text style={styles.cardValue}>
            {member.donnees_financieres.emprunt.a_emprunt_en_cours
              ? member.donnees_financieres.emprunt.montant_restant_a_rembourser + " FCFA"
              : "Aucun"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Renflouement dû</Text>
          <Text style={styles.cardValue}>
            {member.donnees_financieres.renflouement.solde_renflouement_du} FCFA
          </Text>
        </View>
      </View>
      <View style={styles.profileNotifRow}>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-circle-outline" size={32} color={COLORS.primary} />
          <Text style={styles.profileBtnText}>Mon profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 24,
    letterSpacing: 0.6,
  },
  cardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  card: {
    flex: 1,
    backgroundColor: "#f5f8ff",
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#bfcfff",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardLabel: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 6,
    opacity: 0.8,
  },
  cardValue: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 2,
  },
  cardSub: {
    color: COLORS.grey,
    fontSize: 13,
    marginTop: 2,
  },
  profileNotifRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center",
  },
  profileBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaf2ff",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  profileBtnText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  notifBtn: {
    backgroundColor: "#eaf2ff",
    borderRadius: 50,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    marginBottom: 8,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f8ff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 8,
  },
  retryText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontWeight: "bold",
  },
});