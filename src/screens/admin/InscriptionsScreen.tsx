import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useMembers, useMemberFinance } from "../../hooks/useMember";
import { useCreateFullMember, useAddInscriptionPayment } from "../../hooks/useMember";
import { useCurrentSession } from "../../hooks/useSession";

export default function InscriptionsScreen() {
  // Recherche
  const [search, setSearch] = useState("");
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Formulaire ajout membre
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    telephone: "",
    montant_inscription_initial: "",
  });

  // Paiement inscription
  const [paymentMontant, setPaymentMontant] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");

  // API hooks
  const { data: membersRaw, isLoading, refetch } = useMembers();
  const { data: session } = useCurrentSession();
  const createMember = useCreateFullMember();
  const addPayment = useAddInscriptionPayment();

  // Détail membre
  const detailMemberId = selectedMember ? selectedMember.id : null;
  const { data: memberFinance, isLoading: loadingDetail } = useMemberFinance(detailMemberId || "");

  // Liste membres toujours un tableau
  const members: any[] = (Array.isArray(membersRaw)) ? membersRaw : [];

  // Filtrage
  const filteredMembers = members.filter((m: any) => {
    
    const str = `${m.utilisateur.first_name} ${m.utilisateur.last_name} ${m.utilisateur.email} ${m.utilisateur.telephone}`.toLowerCase();
    return str.includes(search.toLowerCase());
  });

  // Rendu d’un membre
  function renderMemberItem({ item }: any) {
    
    // Si inscription complète, on grise tout
    const isComplete = item.donnees_financieres?.inscription?.inscription_complete;
    return (
      <View style={{
        flexDirection: "row", alignItems: "center",
        opacity: isComplete ? 0.3 : 1,
        backgroundColor: "#fff",
        marginBottom: 8, borderRadius: 8, borderWidth: 1, borderColor: "#ececec", padding: 8,
      }}>
        <View style={{
          width: 38, height: 38, borderRadius: 19,
          backgroundColor: "#2563EB22", alignItems: "center", justifyContent: "center", marginRight: 12,
        }}>
          <Text>{item.utilisateur.first_name?.[0] ?? ""}{item.utilisateur.last_name?.[0] ?? ""}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.utilisateur.nom_complet}</Text>
          <Text>{item.utilisateur.email}</Text>
          <Text style={{ fontSize: 12, color: "#555" }}>
            Statut: {item.statut} • {item.donnees_financieres?.inscription?.pourcentage_inscription ?? 0}%
          </Text>
        </View>
        <TouchableOpacity onPress={() => { setSelectedMember(item); setShowDetailModal(true); }}>
          <Text style={{ fontSize: 13, marginRight: 12, color: "#2563EB" }}>Détails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setSelectedMember(item); setShowPaymentModal(true); }}
          disabled={isComplete}
        >
          <Text style={{
            fontSize: 13,
            color: isComplete ? "#aaa" : "#059669",
            fontWeight: "bold"
          }}>
            Paiement
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Gestion ajout membre
  function handleAddMember() {
    if (!form.username || !form.email || !form.first_name || !form.last_name || !form.telephone) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    createMember.mutate({
      ...form,
      password: "000000",
      montant_inscription_initial: form.montant_inscription_initial ? Number(form.montant_inscription_initial) : 0,
    }, {
      onSuccess: () => {
        setShowAddModal(false);
        setForm({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          telephone: "",
          montant_inscription_initial: "",
        });
        refetch();
        Alert.alert("Succès", "Membre ajouté !");
      },
      onError: (err: any) => {
        Alert.alert("Erreur", err?.response?.data?.error || "Impossible d'ajouter le membre.");
      }
    });
  }

  // Paiement d’inscription
  function handleAddPayment() {
    if (!paymentMontant || isNaN(Number(paymentMontant)) || Number(paymentMontant) <= 0) {
      Alert.alert("Erreur", "Montant invalide.");
      return;
    }
    if (!selectedMember) return;
    addPayment.mutate({
      membre_id: selectedMember.id,
      montant: Number(paymentMontant),
      notes: paymentNotes,
    }, {
// 🦊 CRITIQUE: Tellement de 'any' (6 !) que ton TypeScript ressemble à du JavaScript déguisé.
      onSuccess: () => {
        setShowPaymentModal(false);
        setPaymentMontant("");
        setPaymentNotes("");
        refetch();
        Alert.alert("Succès", "Paiement ajouté !");
      },
      onError: (err: any) => {
        Alert.alert("Erreur", err?.response?.data?.error || "Impossible d’ajouter le paiement.");
      }
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5", padding: 10 }}>
      {/* Recherche */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Rechercher un membre..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 12,
            backgroundColor: "#fff",
            height: 40,
          }}
        />
        <Button title="Ajouter" onPress={() => setShowAddModal(true)} />
      </View>

      {/* Liste membres */}
      {isLoading ? (
        <ActivityIndicator color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filteredMembers}
          renderItem={renderMemberItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 40 }}>{`Aucun membre trouvé. : ${membersRaw}`}</Text>}
        />
      )}

      {/* Modal ajout membre */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.14)"
        }}>
          <View style={{
            width: "92%", backgroundColor: "#fff", borderRadius: 10, padding: 18,
          }}>
            <ScrollView>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 11 }}>Ajouter un membre</Text>
              <TextInput placeholder="Nom d'utilisateur" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9 }}
                value={form.username} onChangeText={v => setForm(f => ({ ...f, username: v }))} autoCapitalize="none" />
              <TextInput placeholder="Prénom" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9 }}
                value={form.first_name} onChangeText={v => setForm(f => ({ ...f, first_name: v }))} />
              <TextInput placeholder="Nom" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9 }}
                value={form.last_name} onChangeText={v => setForm(f => ({ ...f, last_name: v }))} />
              <TextInput placeholder="Email" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9 }}
                value={form.email} onChangeText={v => setForm(f => ({ ...f, email: v }))} keyboardType="email-address" autoCapitalize="none" />
              <TextInput placeholder="Téléphone" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9 }}
                value={form.telephone} onChangeText={v => setForm(f => ({ ...f, telephone: v }))} keyboardType="phone-pad" />
              <TextInput placeholder="Montant inscription initial (FCFA)" style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 12, padding: 9 }}
                value={form.montant_inscription_initial} onChangeText={v => setForm(f => ({ ...f, montant_inscription_initial: v }))} keyboardType="numeric" />
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Button title="Annuler" onPress={() => setShowAddModal(false)} />
                <View style={{ width: 14 }} />
                <Button title={createMember.isPending ? "..." : "Valider"} onPress={handleAddMember} disabled={createMember.isPending} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal paiement inscription */}
      <Modal visible={showPaymentModal} animationType="fade" transparent>
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.14)"
        }}>
          <View style={{
            width: "92%", backgroundColor: "#fff", borderRadius: 10, padding: 18,
          }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 11 }}>
              Ajouter un paiement d'inscription
            </Text>
            <Text>
              Membre: <Text style={{ fontWeight: "bold" }}>{selectedMember?.utilisateur?.nom_complet}</Text>
            </Text>
            <TextInput
              placeholder="Montant (FCFA)"
              style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 6, padding: 9, marginTop: 8 }}
              value={paymentMontant}
              onChangeText={setPaymentMontant}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Notes (optionnel)"
              style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 12, padding: 9 }}
              value={paymentNotes}
              onChangeText={setPaymentNotes}
            />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button title="Annuler" onPress={() => { setShowPaymentModal(false); setSelectedMember(null); }} />
              <View style={{ width: 14 }} />
              <Button
                title={addPayment.isPending ? "..." : "Valider"}
                onPress={handleAddPayment}
                disabled={addPayment.isPending}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal détail membre */}
      <Modal visible={showDetailModal} animationType="fade" transparent>
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.14)"
        }}>
          <View style={{
            width: "92%", backgroundColor: "#fff", borderRadius: 10, padding: 18,
          }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
              Détails du membre
            </Text>
            {loadingDetail ? (
              <ActivityIndicator color="#2563EB" />
            ) : memberFinance ? (
              <ScrollView>
                <Text>Nom : {memberFinance.membre_info?.nom_complet}</Text>
                <Text>Email : {memberFinance.membre_info?.email}</Text>
                <Text>Téléphone : {memberFinance.membre_info?.telephone}</Text>
                <Text>Status inscription : {memberFinance.inscription?.inscription_complete ? "Complète" : "Incomplète"}</Text>
                <Text>Montant payé inscription : {memberFinance.inscription?.montant_paye_inscription} FCFA</Text>
                <Text>Montant restant inscription : {memberFinance.inscription?.montant_restant_inscription} FCFA</Text>
                <Text>Statut général : {memberFinance.membre_info?.statut}</Text>
                <Text>Solidarité session actuelle : {memberFinance.solidarite?.montant_paye_session_courante} / {memberFinance.solidarite?.montant_solidarite_session_courante} FCFA</Text>
                <Text>Épargne totale : {memberFinance.epargne?.epargne_totale} FCFA</Text>
                <Text>Intérêts cumulés : {memberFinance.epargne?.interets_recus} FCFA</Text>
                <Text>Emprunt en cours : {memberFinance.emprunt?.a_emprunt_en_cours ? "Oui" : "Non"}</Text>
                <Text>Montant à rembourser : {memberFinance.emprunt?.montant_restant_a_rembourser} FCFA</Text>
                <Text>Renflouement dû : {memberFinance.renflouement?.solde_renflouement_du} FCFA</Text>
                {/* Ajoute ici d'autres infos si tu veux */}
              </ScrollView>
            ) : (
              <Text>Impossible de charger les données du membre.</Text>
            )}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 18 }}>
              <Button title="Fermer" onPress={() => setShowDetailModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}