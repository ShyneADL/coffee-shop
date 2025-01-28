import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailProps {
  title: string;
  image: number;
  category: string;
  rating: number;
  description: string;
  price: number;
}

const Detail: React.FC<DetailProps> = ({
  title,
  category,
  rating,
  description,
  price,
  image,
}) => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return (
    <SafeAreaView className="h-full bg-[#F9F9F9]">
      <ScrollView className="px-6 py-6">
        {/* Top part */}
        <View className="flex flex-1 justify-between items-center">
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
        <Image source={image} resizeMode="cover" className="w-full h-[202px]" />
        <View className="flex flex-row items-center justify-between">
          <View>
            <Text className="text-[1.25rem] text-black font-Sora-semibold leading-[150%] w-fit">
              {title}
            </Text>
            <Text className="text-[0.75rem] text-lightGrey font-Sora leading-[120%]">
              {category}
            </Text>
            <View className="flex flex-row gap-2">
              <Image
                source={images.Star}
                resizeMode="contain"
                className="w-5 h-5"
              />
              <Text className="font-Sora-semibold text-[1rem] text-black">
                {rating}
                <Text className="font-Sora text-[0.75rem] text-lightGrey"></Text>
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center gap-3"></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;
