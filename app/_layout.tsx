import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import "./global.css";
type RouteType = "(tabs)" | "onboarding" | null;

export default function RootLayout() {
  const [initialRoute, setInitialRoute] = useState<RouteType>(null);
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
        initialRouteName="onboarding"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "ios_from_right",
        }}
      >
        {/* Onboarding with a Fade-In Transition */}
        <Stack.Screen name="onboarding" />

        {/* Default Tabs & Other Screens */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(order)" />
        <Stack.Screen name="details/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
