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
  const snapPoints = ["21%", "50%"];

  const pulseAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Create a continuous pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

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
        style={{ flex: 1 }}
        handleIndicatorStyle={{
          backgroundColor: "#E3E3E3",
          width: 45,
          height: 5,
          borderRadius: 16,
          marginTop: 16,
        }}
      >
        <BottomSheetView
          style={{ width: "100%" }}
          className="flex items-center mt-[15px] px-[24px]"
        >
          {/* Texts */}
          <View className="flex items-center">
            <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
              10 minutes left
            </Text>
            <Text className="font-Sora text-xs leading-[150%] text-lightGrey tracking-0 text-center mt-[2px]">
              Delivery to{" "}
              <Text className="font-Sora-semibold text-xs leading-[150%] text-black tracking-0 text-center">
                Paul M. Valley
              </Text>
            </Text>
          </View>

          {/* Progress bars */}
          <View
            style={{ width: "100%" }}
            className="flex flex-row items-center gap-[10px] mt-[25px] px-[6px]"
          >
            <View
              style={{ height: 4, minWidth: 50 }}
              className="flex flex-1 bg-[#36C07E] rounded-[20px]"
            />
            <View
              style={{ height: 4, minWidth: 50 }}
              className="flex flex-1 bg-[#36C07E] rounded-[20px]"
            />
            <Animated.View
              style={{ height: 4, minWidth: 50, opacity: pulseAnim }}
              className="flex flex-1 bg-[#36C07E] rounded-[20px]"
            />
            <View
              style={{ height: 4, minWidth: 50 }}
              className="flex flex-1 bg-[#E3E3E3] rounded-[20px]"
            />
          </View>

          {/* Bottom */}
          <View
            style={{ width: "100%" }}
            className="flex flex-row items-center justify-between bg-transparent rounded-[12px] border border-[#E3E3E3] pl-3 py-[10.5px] mt-4"
          >
            <View className="bg-transparent rounded-[12px] border border-[#E3E3E3] p-[6px]">
              <Image source={images.Bike} style={{ width: 44, height: 44 }} />
            </View>
            <View style={{ width: 243 }}>
              <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0 text-left">
                Delivered your order
              </Text>
              <Text
                style={{ width: 243 }}
                className="font-Sora-light text-xs leading-[150%] text-lightGrey tracking-0 text-left mt-[4px]"
              >
                We will deliver your goods to you in the shortest possible time.
              </Text>
            </View>
          </View>

          <View
            style={{ width: "100%" }}
            className="flex flex-row items-center justify-between mt-[14px]"
          >
            <View className="flex flex-row items-center gap-4">
              <Image
                source={images.Man}
                style={{ width: 56, height: 56, borderRadius: 14 }}
              />
              <View style={{ width: 135 }}>
                <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
                  Brooklyn Simmons
                </Text>
                <Text className="font-Sora text-xs leading-[120%] text-lightGrey tracking-0 mt-[4px]">
                  Personal Courier
                </Text>
              </View>
            </View>
            <View className="rounded-[12px] bg-transparent border border-[#E3E3E3] p-[10px]">
              <Image
                source={icons.Phone}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
