import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constants/images";

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
    <View className="flex gap-2 bg-white px-2 pt-2 pb-3">
      {/* Image */}
      <View className="relative flex-1 rounded-[12px]">
        <Image
          source={image}
          className="w-[130px] h-[130px] aspect-square rounded-[12px] z-[1]"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-[14px] flex flex-row items-center gap-[2px]">
          <Image
            source={images.Star}
            resizeMode="contain"
            className="w-[10px] h-[10px]"
          />
          <Text className="font-Sora-semibold text-[0.5rem] leading-[150%] text-white">
            {rating}
          </Text>
        </View>
      </View>
      <View className="flex flex-1 gap-2">
        <View className="flex gap-1">
          <Text className="font-Sora-semibold text-[1rem] text-[#242424] leading-[150%] tracking-0 ">
            {title}
          </Text>
          <Text className="font-Sora text-[0.75rem] text-[#A2A2A2] leading-[120%] tracking-0">
            {category}
          </Text>
        </View>
        <View className="flex flex-1 flex-row justify-between items-center">
          <Text className="font-Sora-semibold text-[1.125rem] leading-[150%] tracking-0 w-fit">
            $ {price}
          </Text>
          <Image
            source={images.Plus}
            resizeMode="contain"
            className="w-[32px] h-[32px]"
          />
        </View>
      </View>
    </View>
  );
};

export default CoffeeCard;
