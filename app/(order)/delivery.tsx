import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useCallback } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import images from "@/constants/images";
import icons from "@/constants/icons";

const Delivery = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={images.Map}
        style={{ width: "100%", height: "100%" }}
        className="flex flex-1"
      >
        <SafeAreaView className="flex flex-1">
          {/* Top Part */}
          <View className="px-6 flex flex-row justify-between items-center py-12">
            <TouchableOpacity
              className="p-[10px] bg-[#EDEDED] rounded-[12px]"
              onPress={() => router.back()}
            >
              <Image
                source={icons.Left}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity className="p-[10px] bg-[#EDEDED] rounded-[12px]">
              <Image
                source={images.GPS}
                resizeMode="contain"
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
          </View>

          {/* Bottom Part */}
          <Bottom />
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default Delivery;

const Bottom = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["20%", "48%"];

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        height: 322,
      }}
    >
      <BottomSheet
        index={0}
        snapPoints={snapPoints} // Snap points for the sheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{
          backgroundColor: "#E3E3E3",
          width: 45,
          height: 5,
          borderRadius: 16,
          paddingHorizontal: 24,
        }}
      >
        <BottomSheetView className="flex items-center mt-[15px]">
          <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
            10 minutes left
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
