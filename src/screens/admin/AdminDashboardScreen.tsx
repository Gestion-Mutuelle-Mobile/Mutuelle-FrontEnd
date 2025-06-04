import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/config";
import { useAuthContext } from "../../context/AuthContext";
// import { useUser } from "../../hooks/useUser";
// import { useDashboard } from "../../hooks/useDashboard";
import { useNavigation } from "@react-navigation/native";
import { useUsers } from "../../hooks/useUser";
import { useAdminDashboard } from "../../hooks/useDashboard";

export default function AdminDashboardScreen() {
  const navigation = useNavigation();
  const { user } = useAuthContext();
  const { data: userData, isLoading: loadingUser } = useUsers();
  const { data: stats, isLoading: loadingStats } = useAdminDashboard();

  if (loadingUser || loadingStats) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
        <Ionicons name="reload-circle" size={48} color={COLORS.primary} />
      </View>
    );
  }

  const u = userData || user || {};
  const initials = (u.first_name || u.nom_complet || u.username || "A")
    .split(" ")
    .map((s: string) => s[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          {u.photo_profil_url ? (
            <Image source={{ uri: u.photo_profil_url }} style={styles.avatarImg} />
          ) : (
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarTxt}>{initials}</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcome}>Bienvenue,</Text>
          <Text style={styles.name}>{u.nom_complet || u.first_name + " " + u.last_name || u.username}</Text>
          <Text style={styles.info}>{u.email}</Text>
          <Text style={styles.info}>{u.telephone}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" color={COLORS.primary} size={34} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatCard label="Membres" value={stats?.total_membres ?? "--"} icon="people" color="#4361EE" />
        <StatCard label="Fonds social" value={stats?.total_fonds_social + " F" ?? "--"} icon="cash" color="#38A3A5" />
        <StatCard label="Epargnes" value={stats?.total_epargne + " F" ?? "--"} icon="wallet" color="#B5179E" />
      </View>

      {/* Boutons de raccourci */}
      <View style={styles.tilesGrid}>
        <Tile icon="person-add" label="Inscriptions" color="#38A3A5" onPress={() => navigation.navigate("InscriptionsScreen")} />
        <Tile icon="wallet-outline" label="Épargne" color="#4361EE" onPress={() => navigation.navigate("SavingsScreen")} />
        <Tile icon="hands-helping" iconLib="MaterialIcons" label="Assistances" color="#B5179E" onPress={() => navigation.navigate("AssistanceScreen")} />
        <Tile icon="people-circle-outline" label="Solidarité" color="#00B4D8" onPress={() => navigation.navigate("SolidarityScreen")} />
        <Tile icon="cash-outline" label="Emprunts" color="#3A86FF" onPress={() => navigation.navigate("LoansScreen")} />
        <Tile icon="repeat-outline" label="Remboursements" color="#F77F00" onPress={() => navigation.navigate("RepaymentsScreen")} />
        <Tile icon="refresh-circle-outline" label="Renflouements" color="#4361EE" onPress={() => navigation.navigate("RenflouementScreen")} />
        <Tile icon="bar-chart-outline" label="Bilan" color="#20C997" onPress={() => navigation.navigate("FinancialReportsScreen")} />
      </View>

      {/* Bouton flottant Chatbot */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("ChatbotScreen")}>
        <Ionicons name="chatbubbles-outline" size={28} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "bold", marginTop: 4, fontSize: 13 }}>CHATBOT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <View style={[styles.statCard, { backgroundColor: color + "18" }]}>
      <Ionicons name={icon} size={28} color={color} style={{ marginBottom: 6 }} />
      <Text style={{ fontWeight: "bold", color: color, fontSize: 13, marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 16, color: "#222", fontWeight: "bold" }}>{value}</Text>
    </View>
  );
}

function Tile({ icon, label, color, onPress, iconLib = "Ionicons" }: any) {
  const IconComp = iconLib === "MaterialIcons" ? MaterialIcons : Ionicons;
  return (
    <TouchableOpacity style={[styles.tile, { backgroundColor: color + "20" }]} onPress={onPress} activeOpacity={0.85}>
      <IconComp name={icon} size={34} color={color} style={{ marginBottom: 9 }} />
      <Text style={styles.tileLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0ff",
    marginBottom: 2,
    elevation: 2,
  },
  avatarWrap: {
    marginRight: 17,
  },
  avatarCircle: {
    width: 61,
    height: 61,
    borderRadius: 30,
    backgroundColor: "#e0e6fc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  avatarTxt: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 26,
  },
  avatarImg: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 6,
  },
  welcome: {
    fontSize: 15,
    color: "#222",
    opacity: 0.7,
    marginBottom: 0,
  },
  name: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 4,
    marginTop: 3,
  },
  info: {
    color: COLORS.text,
    fontSize: 14,
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 18,
    marginBottom: 4,
    paddingHorizontal: 8,
    gap: 7,
  },
  statCard: {
    backgroundColor: "#f5f8ff",
    borderRadius: 13,
    padding: 13,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
    minWidth: 88,
    elevation: 1,
  },
  tilesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 14,
    gap: 9,
  },
  tile: {
    width: "43%",
    aspectRatio: 1,
    borderRadius: 19,
    margin: 9,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#bfcfff",
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  tileLabel: {
    fontSize: 15.5,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 62,
    height: 62,
    elevation: 7,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    zIndex: 100,
  },
});