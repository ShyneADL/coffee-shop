import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Order = () => {
  return (
    <SafeAreaView className="h-full bg-[#F9F9F9]">
      <ScrollView className="px-6 py-6">
        {/* Top part */}
        <View className="flex flex-row flex-1 justify-between items-center">
          <TouchableOpacity className="p-[10px]" onPress={() => router.back()}>
            <Image
              source={icons.Left}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <Text className="text-black font-Sora-semibold text-[1rem] leading-[120%] tracking-[0%]">
            Orders
          </Text>
          <TouchableOpacity className="p-[10px]">
            <Image
              source={icons.Like}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Coffee Price */}
      <View
        style={{ height: 84 }}
        className="flex flex-1 flex-row items-center justify-between bg-white pt-4 px-6 pb-[46px]"
      >
        <View>
          <Text className="font-Sora text-[#909090] text-sm leading-[120%] tracking-[0]">
            Price
          </Text>
          <Text className="text-primary font-Sora-semibold text-[1.25rem] leading-[150%] mt-1"></Text>
        </View>
        <TouchableOpacity className="px-4 py-5 rounded-[16px] bg-primary">
          <Text className="text-white text-base font-Sora-semibold leading-[150%] tracking-0">
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Order;
