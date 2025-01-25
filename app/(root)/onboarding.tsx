import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

const Onboarding = () => {
  return (
    <ScrollView className="relative h-full">
      <Image
        source={require("../../assets/images/coffee-6.png")}
        className="absolute inset-0 object-cover aspect-[3/4] w-full min-h-[536px] z-[1]"
      />
      <View className="flex justify-end align-center px-6 mb-5 h-full z-10">
        <Text className="text-white text-[2rem] font-Sora-semibold text-center leading-[150%] tracking-[0.5%] w-full ">
          Fall in Love with Coffee in Blissful Delight!
        </Text>
        <Text className="text-white text-center font-Sora text-[0.875rem] leading-[150%] tracking-[1%]">
          Welcome to our cozy coffee corner, where every cup is a delightful for
          you.
        </Text>
        <TouchableOpacity
          className="bg-primary rounded-[16px] py-5 px-4 mt-8"
          onPress={() => {}}
        >
          <Text className="text-white font-Sora-semibold text-[1rem] leading-[150%] tracking-0">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Onboarding;
