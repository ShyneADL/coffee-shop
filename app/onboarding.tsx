import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import images from "@/constants/images";

const Onboarding = () => {
  return (
    <View className="relative h-[100vh] pb-3 m-0 bg-[#000] w-full">
      <View
        style={{
          width: "100%",
          height: "63%",
          justifyContent: "center", // Centers vertically
          alignItems: "center", // Centers horizontally
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Image
          source={images.Coffee6}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View className="flex flex-col h-[100vh] justify-end items-center  pb-6 z-20">
        <View className="bg-gradient-to-b from-transparent to-[#050505] to-[23.67%] py-6 px-6 z-[2] h-[44%]">
          <Text className="text-white text-[2rem] font-Sora-semibold text-center leading-[150%] tracking-[0.5%] w-full ">
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text className="text-lightGrey text-center font-Sora text-[0.875rem] leading-[150%] mt-2 tracking-[1%]">
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you.
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-[16px] py-4 px-5 mt-8"
            onPress={() => {
              router.push("/(tabs)");
            }}
          >
            <Text className="text-white font-Sora-semibold text-[1rem] text-center leading-[150%] tracking-0">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
