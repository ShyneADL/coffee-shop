import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { coffees } from "@/constants/coffee";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const coffee = coffees.find((c) => c.id === Number(id));

  const [activeSize, setActiveSize] = useState("M");

  // Calculate price based on size
  const calculatePrice = () => {
    const basePrice = Number(coffee?.price || 0);

    if (activeSize === "S") {
      return basePrice - 1.0;
    } else if (activeSize === "L") {
      return basePrice + 2.0;
    } else {
      return basePrice;
    }
  };

  const currentPrice = calculatePrice();

  return (
    <SafeAreaView className="relative flex flex-1 bg-[#F9F9F9]">
      <ScrollView className="flex flex-1 px-6 py-8 pb-[100px]">
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
            Details
          </Text>
          <TouchableOpacity className="p-[10px]">
            <Image
              source={icons.Like}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        {/* Coffee Image */}
        <Image
          source={coffee?.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 202,
            aspectRatio: "8:5",
          }}
          className="mt-8 rounded-[16px]"
        />

        {/* Coffee Details */}
        <View className="flex flex-row items-center justify-between mt-4">
          <View>
            <Text className="text-[1.25rem] text-black font-Sora-semibold leading-[150%] w-fit">
              {coffee?.name || "Coffee Title"}
            </Text>
            <Text className="text-[0.75rem] text-lightGrey font-Sora leading-[120%] mt-1">
              {coffee?.category || "Coffee Category"}
            </Text>
            <View className="flex flex-row gap-1 mt-4">
              <Image
                source={images.Star}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                className="size-5"
              />
              <Text className="font-Sora-semibold text-[1rem] text-black">
                {coffee?.rating || "0"}
                <Text className="font-Sora text-[0.75rem] text-lightGrey ml-[4px]">
                  (230)
                </Text>
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-3">
            <View className="bg-alt-grey rounded-[12px] p-[10px]">
              <Image source={images.Bike} style={{ width: 24, height: 24 }} />
            </View>
            <View className="bg-alt-grey rounded-[12px] p-[10px]">
              <Image source={images.Bean} style={{ width: 24, height: 24 }} />
            </View>
            <View className="bg-alt-grey rounded-[12px] p-[10px]">
              <Image source={images.Milk} style={{ width: 24, height: 24 }} />
            </View>
          </View>
        </View>

        {/* Divider */}
        <View className="flex flex-1 items-center justify-center mt-4">
          <View style={{ width: "90%", height: 1 }} className="bg-[#E3E3E3]" />
        </View>

        {/* Coffee Description */}
        <View className="mt-4">
          <Text className="font-Sora-semibold text-[1rem] text-black leading-[150%] trracking-[0%]">
            Description
          </Text>
          <Text className="text-lightGrey font-Sora-light text-[0.875rem] leading-[150%] mt-2">
            {coffee?.description || "No description available."}
          </Text>
        </View>

        {/* Coffee Size */}
        <View className="mt-6">
          <Text className="font-Sora-semibold text-[1rem] text-black leading-[150%] trracking-[0%]">
            Size
          </Text>
          <View className="flex flex-row items-center justify-between overflow-hidden gap-4 mt-4">
            <TouchableOpacity
              className={`py-[10px] rounded-[12px] flex flex-1 items-center justify-center border ${
                activeSize === "S"
                  ? "bg-primary-100 border-primary"
                  : "bg-white border-[#E3E3E3]"
              }`}
              onPress={() => setActiveSize("S")}
            >
              <Text
                className={`font-Sora text-sm leading-[150%] ${
                  activeSize === "S" ? "text-primary" : "text-black"
                }`}
              >
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-[10px] rounded-[12px] flex flex-1 items-center justify-center border ${
                activeSize === "M"
                  ? "bg-primary-100 border-primary"
                  : "bg-white border-[#E3E3E3]"
              }`}
              onPress={() => setActiveSize("M")}
            >
              <Text
                className={`font-Sora text-sm leading-[150%] ${
                  activeSize === "M" ? "text-primary" : "text-black"
                }`}
              >
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`py-[10px] rounded-[12px] flex flex-1 items-center justify-center border ${
                activeSize === "L"
                  ? "bg-primary-100 border-primary"
                  : "bg-white border-[#E3E3E3]"
              }`}
              onPress={() => setActiveSize("L")}
            >
              <Text
                className={`font-Sora text-sm leading-[150%] ${
                  activeSize === "L" ? "text-primary" : "text-black"
                }`}
              >
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Coffee Price */}
      <View
        style={{ minHeight: 84, width: "100%" }}
        className="fixed bottom-0 z-20 flex rounded-t-[16px] gap-[34px] flex-row items-center justify-between bg-white pt-4 px-6 pb-[46px]"
      >
        <View className="mt-6">
          <Text className="font-Sora text-[#909090] text-sm leading-[120%] tracking-[0]">
            Price
          </Text>
          <Text className="text-primary font-Sora-semibold text-[1.25rem] leading-[150%] mt-1">
            $ {currentPrice.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          className="mt-6 flex flex-1 items-center justify-center py-4 rounded-[16px] bg-primary"
          onPress={() => {
            router.push({
              pathname: "/(order)/order",
              params: {
                id: id,
                price: currentPrice.toFixed(2),
                size: activeSize,
              },
            });
          }}
        >
          <Text
            style={{ width: 73 }}
            className="text-white text-base font-Sora-semibold leading-[150%] tracking-0"
          >
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
