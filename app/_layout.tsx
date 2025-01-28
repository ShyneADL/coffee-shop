// app/_layout.js
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Sora-Thin": require("../assets/fonts/Sora-Thin.ttf"),
    "Sora-Light": require("../assets/fonts/Sora-Light.ttf"),
    "Sora-ExtraLight": require("../assets/fonts/Sora-ExtraLight.ttf"),
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-Medium": require("../assets/fonts/Sora-Medium.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("../assets/fonts/Sora-ExtraBold.ttf"),
  });

  const router = useRouter();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem(
          "hasSeenOnboarding"
        );

        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          if (!hasSeenOnboarding) {
            router.replace("/onboarding");
          } else {
            router.replace("/(root)/(tabs)");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkFirstLaunch();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    />
  );
}
