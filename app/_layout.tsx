import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Constants from 'expo-constants';
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import InitialLayout from "@/components/initialLayout";
import { useCallback, useEffect } from "react";
import {useFonts} from "expo-font"
import { SplashScreen } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium" : require("../assets/fonts/JetBrainsMono-Medium.ttf")
  })

  const onLayoutRootView = useCallback(async ()=> {
    if(fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);


  // update the native navigation bar on android
  useEffect(()=>{
    if(Platform.OS === "android"){
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.getButtonStyleAsync();
      NavigationBar.setVisibilityAsync("hidden")
    }
  },[])

  console.log("✅ it is in Layout");
  return (
    <ClerkAndConvexProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} onLayout={onLayoutRootView}>
            {/* 🚀 FIX: Correctly Render Stack Instead of Custom Component */}
           {/* <Stack screenOptions={{headerShown:false}}/> */}
            <InitialLayout/>
          </SafeAreaView>
        </SafeAreaProvider>
    </ClerkAndConvexProvider>
      
  );

}
