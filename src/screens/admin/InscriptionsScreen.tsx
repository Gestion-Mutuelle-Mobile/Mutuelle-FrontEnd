import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants/config";

export default function InscriptionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-add" size={48} color={COLORS.primary} />
        <Text style={styles.title}>Gestion des Inscriptions</Text>
        <Text style={styles.subtitle}>Ajouter des membres et gérer les paiements d'inscription</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚧 Page en développement</Text>
          <Text style={styles.cardText}>
            Cette page permettra de :
            {"\n"}• Ajouter de nouveaux membres
            {"\n"}• Gérer les paiements d'inscription
            {"\n"}• Voir les statuts d'inscription
            {"\n"}• Rechercher des membres
          </Text>
        </View>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle" size={24} color="white" />
          <Text style={styles.actionButtonText}>Ajouter un membre</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Ionicons name="card" size={24} color={COLORS.primary} />
          <Text style={styles.secondaryButtonText}>Paiement inscription</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: "center",
    padding: SPACING.xl,
    backgroundColor: COLORS.surface,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  content: {
    padding: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  cardText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  actionButtonText: {
    color: "white",
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
    gap: SPACING.sm,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
});