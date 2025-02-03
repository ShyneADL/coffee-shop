import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

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
            setInitialRoute("onboarding"); // Show onboarding if it's the first launch
          } else {
            setInitialRoute("(tabs)"); // Show main app if onboarding has been seen
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

  // Function to mark onboarding as completed
  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setInitialRoute("onboarding"); // Navigate to the main app
    router.replace("/(tabs)"); // Use router to navigate to the main app
    await AsyncStorage.removeItem("hasSeenOnboarding");
  };

  if (!fontsLoaded || !initialRoute) {
    return null; // Show nothing while loading
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        initialRouteName={initialRoute} // Set the initial route dynamically
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
