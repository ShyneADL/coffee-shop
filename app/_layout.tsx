import { useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
    "Sora-ExtraBold": require("../assets/fonts/Sora-ExtraBold.ttf"),
    "Sora-Light": require("../assets/fonts/Sora-Light.ttf"),
    "Sora-Medium": require("../assets/fonts/Sora-Medium.ttf"),
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: true }} />;
}
