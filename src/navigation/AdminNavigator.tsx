import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

// Screens supplémentaires (modals, pages détail)
import ProfileScreen from "../screens/shared/ProfileScreen";
import NotificationsScreen from "../screens/shared/NotificationsScreen";
import ChatbotScreen from "../screens/shared/ChatbotScreen";
import MembersManagementScreen from "../screens/admin/MembersManagementScreen";

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal", // Pour les modals
      }}
    >
      {/* Tab Navigator principal */}
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator}
        options={{
          presentation: "card", // Navigation normale
        }}
      />
      
      {/* Écrans modaux ou de détail */}
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Mon Profil",
        }}
      />
      
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Notifications",
        }}
      />
      
      <Stack.Screen 
        name="Chatbot" 
        component={ChatbotScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Assistant",
        }}
      />
      
      <Stack.Screen 
        name="MembersManagement" 
        component={MembersManagementScreen}
        options={{
          presentation: "card",
          headerShown: true,
          title: "Gestion des Membres",
        }}
      />
    </Stack.Navigator>
  );
}