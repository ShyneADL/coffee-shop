import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface CoffeeCardProps {
  image: number;
  title: string;
  category: string;
  price: number;
  rating: number;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  image,
  title,
  category,
  price,
  rating,
}) => {
  return (
    <ScrollView>
      <View
        style={{ width: 156 }}
        className="flex gap-2 bg-white px-2 pt-2 pb-3 overflow-hidden rounded-[16px]"
      >
        {/* Image */}
        <View style={{ width: "100%" }} className="relative rounded-[12px]">
          <Image
            source={image}
            style={{ width: "100%", height: 128 }}
            className="rounded-[12px] z-[1]"
            resizeMode="cover"
          />
          <View className="absolute top-2 right-[14px] flex flex-row items-center gap-[2px] z-[20]">
            <Image
              source={images.Star}
              resizeMode="contain"
              style={{ width: 10, height: 10 }}
              className="w-[10px] h-[10px]"
            />
            <Text className="font-Sora-semibold text-[0.5rem] leading-[150%] text-white">
              {rating}
            </Text>
          </View>
        </View>
        <View className="flex gap-2">
          <View className="flex gap-1">
            <Text
              style={{ width: 103 }}
              className="font-Sora-semibold text-[1rem] text-[#242424] leading-[150%] tracking-0 "
            >
              {title}
            </Text>
            <Text
              style={{ width: 103 }}
              className="font-Sora text-[0.75rem] text-[#A2A2A2] leading-[120%] tracking-0"
            >
              {category}
            </Text>
          </View>
          <View
            style={{ width: "100%" }}
            className="flex flex-row justify-between items-center"
          >
            <Text className="font-Sora-semibold text-[1.125rem] leading-[150%] tracking-0 w-fit">
              $ {price}
            </Text>
            <View className="rounded-[8px] p-2 bg-primary flex items-center justify-center">
              <Image
                source={icons.Add}
                resizeMode="contain"
                className="w-[32px] h-[32px]"
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CoffeeCard;
