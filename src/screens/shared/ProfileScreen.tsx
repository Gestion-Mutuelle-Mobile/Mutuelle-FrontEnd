import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SPACING, FONT_SIZES } from "../../constants/config";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthContext();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Profil</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </Text>
        </View>
        
        <Text style={styles.name}>{user?.nom_complet}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>
          {user?.is_administrateur ? "Administrateur" : "Membre"}
        </Text>

        <View style={styles.placeholder}>
          <Ionicons name="construct-outline" size={48} color={COLORS.textLight} />
          <Text style={styles.placeholderText}>Écran en construction</Text>
          <Text style={styles.placeholderSubtext}>
            Les fonctionnalités d'édition de profil seront bientôt disponibles
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
  },
  avatarText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: "white",
  },
  name: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  role: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: "500",
    marginBottom: SPACING.xxl,
  },
  placeholder: {
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
  placeholderText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  placeholderSubtext: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 22,
  },
});