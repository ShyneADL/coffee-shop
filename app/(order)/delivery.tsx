import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

import images from "@/constants/images";
import icons from "@/constants/icons";

const delivery = () => {
  return (
    <ImageBackground
      source={images.Map}
      style={{ width: "100%", height: "100%" }}
      className="flex flex-1"
    >
      <ScrollView className="flex flex-1 relative">
        {/* Top Part */}
        <View
          className="px-6 flex flex-row justify-between items-center py-12
      "
        >
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
      </ScrollView>
    </ImageBackground>
  );
};

export default delivery;
