import { useAuth } from "@clerk/clerk-expo";
import { useSegments, useRouter, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [redirected, setRedirected] = useState(false); // ✅ Prevent infinite loops

  useEffect(() => {
    if (!isLoaded || redirected) return;

    const inAuthScreen = segments[0] === "(auth)";
    console.log("✅ it is in Initial Layout in components");
    if (!isSignedIn && !inAuthScreen) {
      setRedirected(true); // ✅ Mark as redirected to prevent re-runs
      console.log("✅ it moves to /(auth)/login");
      router.replace("/(auth)/login");
    } else if (isSignedIn && inAuthScreen) {
      console.log("✅ it moves to /(tabs)");
      setRedirected(true);
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn, segments]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000", // Set background to black
    },
  });

  if (!isLoaded) return null;

  return <Stack screenOptions={{ headerShown: false ,  contentStyle: styles.container } }  />;
}
