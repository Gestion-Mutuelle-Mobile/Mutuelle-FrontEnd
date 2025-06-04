import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../../constants/config";

export default function RenflouementScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Text style={styles.title}>Gestion des renflouements</Text>
      {/* Ici, tu brancheras la liste des renflouements, actions sur les membres, modals, etc. */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Liste des renflouements en cours</Text>
        <Text style={styles.cardValue}>--</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    margin: 24,
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: "#f5f8ff",
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 18,
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
});