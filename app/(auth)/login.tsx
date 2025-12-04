import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '@/styles/auth.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import AnimatedLogo from "./TitleTextAnime";
import { useAuth } from "@clerk/clerk-expo";
import Index from './../index';

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleGoogleSignIn = async () => {
    try {


      if (isSignedIn) {
        console.log("✅ User already signed in. Redirecting to Home...");
        router.replace("/(tabs)"); // Move directly to home
        return; // Stop execution
      }

      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });

      if (setActive && createdSessionId) {
        await setActive({ session: createdSessionId }); // ✅ Await session activation
        console.log("✅ Google Sign-In Successful. Navigating to /tabs...");
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("❌ OAuth error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
      
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <AnimatedLogo />
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
      
        <Image 
          source={require("../../assets/images/Online_wishes-bro.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
        
      </View>

      {/* Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.8}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </View>
  );
}
