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
    <ScrollView className="relative p-0 m-0 w-full">
      <Image
        source={images.Coffee6}
        resizeMode="cover"
        style={{ width: "100%", height: 520 }}
        className="relative top-0 left-0 w-full min-h-[520px] z-[1]"
      />

      <View className="flex justify-end align-center h-full z-10">
        <View className="bg-gradient-to-b from-transparent to-[#050505] to-[23.67%] py-6 px-6">
          <Text className="text-white text-[2rem] font-Sora-semibold text-center leading-[150%] tracking-[0.5%] w-full ">
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text className="text-white text-center font-Sora text-[0.875rem] leading-[150%] tracking-[1%]">
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you.
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-[16px] py-5 px-4 mt-8"
            onPress={() => {
              router.push("/(root)/(tabs)");
            }}
          >
            <Text className="text-white font-Sora-semibold text-[1rem] leading-[150%] tracking-0">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Onboarding;
