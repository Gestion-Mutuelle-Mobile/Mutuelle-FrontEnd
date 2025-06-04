import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZES } from "../../constants/config";
import { Ionicons } from "@expo/vector-icons";

export default function MemberHistoryScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Historique des transactions</Text>
      
      <View style={styles.emptyState}>
        <Ionicons name="time-outline" size={64} color={COLORS.textLight} />
        <Text style={styles.emptyTitle}>Aucun historique</Text>
        <Text style={styles.emptySubtitle}>
          Vos transactions apparaîtront ici une fois effectuées
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xl,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: SPACING.xxl * 2,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
});