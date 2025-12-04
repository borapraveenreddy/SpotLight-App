import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '@/constants/theme';
import { View, ActivityIndicator } from "react-native";

export default function TabLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log("✅ Tabs Mounted");
    
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 500); // Simulate app loading delay

    return () => {
      console.log("❌ Tabs Unmounted");
      clearTimeout(timeout);
    };
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="bookmarks"
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="bookmarks" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="create"
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="add-circle" size={size} color={COLORS.primary} />,
        }}
      />
      <Tabs.Screen 
        name="notifications"
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="heart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen 
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name="person-circle" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
