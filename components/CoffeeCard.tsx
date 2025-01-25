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
    <View className="flex gap-2">
      <View className="relative flex-1">
        <Image
          source={image}
          className="w-[130px] h-[130px] aspect-square rounded-[12px] z-[1]"
          resizeMode="cover"
        />
        <View className="flex flex-row items-center gap-[2px]">
          <Image
            source={images.Star}
            resizeMode="contain"
            className="w-[10px] h-[10px]"
          />
          <Text className="font-Sora-semibold text-[0.5rem] leading-[150%] text-white"></Text>
        </View>
      </View>
    </View>
  );
};

export default CoffeeCard;
