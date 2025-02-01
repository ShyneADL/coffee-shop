import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "./global.css";
type RouteType = "(tabs)" | "onboarding" | null;

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<RouteType>(null);
  const [fontsLoaded] = useFonts({
    "Sora-Light": require("../assets/fonts/Sora-Light.ttf"),
    "Sora-Regular": require("../assets/fonts/Sora-Regular.ttf"),
    "Sora-SemiBold": require("../assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Bold": require("../assets/fonts/Sora-Bold.ttf"),
  });

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
            setInitialRoute("onboarding");
          } else {
            setInitialRoute("(tabs)");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (!initialRoute) {
      checkFirstLaunch();
    }
  }, [fontsLoaded, initialRoute]);

  if (!fontsLoaded || !initialRoute) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="onboarding" />

        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(order)" />
        <Stack.Screen name="details/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
