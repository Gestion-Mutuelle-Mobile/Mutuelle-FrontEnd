import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from "../../constants/config";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ChatbotScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assistant IA</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
      <View style={styles.chatArea}>
        <View style={styles.welcomeMessage}>
          <View style={styles.botAvatar}>
            <Ionicons name="chatbubbles" size={24} color="white" />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Bonjour ! Je suis votre assistant virtuel pour la mutuelle ENSPY. 
              Comment puis-je vous aider aujourd'hui ?
            </Text>
          </View>
        </View>

        <View style={styles.placeholder}>
          <Ionicons name="construct-outline" size={48} color={COLORS.textLight} />
          <Text style={styles.placeholderText}>Chatbot en développement</Text>
          <Text style={styles.placeholderSubtext}>
            Cette fonctionnalité sera bientôt disponible pour vous assister
          </Text>
        </View>
      </View>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputPlaceholder}>Tapez votre message...</Text>
          <TouchableOpacity style={styles.sendButton} disabled>
            <Ionicons name="send" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
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
  chatArea: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  welcomeMessage: {
    flexDirection: "row",
    marginBottom: SPACING.xl,
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: 20,
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
  inputArea: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  inputPlaceholder: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textLight,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});