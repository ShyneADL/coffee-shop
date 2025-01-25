import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Search from "@/components/Search";

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView className="relative h-full">
        {/* Top part */}
        <View className="w-full">
          <View className="absolute w-full h-[280px] top-0 bg-gradient-to-br from-[#111111] to-[#313131]"></View>
          <View className="px-6 mt-10 flex gap-[7px]">
            {/* Black background */}
            <View className="absolute w-full h-[280px] top-0 bg-gradient-to-[240.86deg] from-[#111111] to-black" />
            {/* Location View */}
            <View>
              <Text className="font-Sora text-[0.75rem] leading-[120%] tracking-[1%] text-[#A2A2A2]">
                Location
              </Text>
              <View className="flex flex-row gap-1 items-center">
                <Text className="font-Sora-semibold text-sm text-white leading-[150%] tracking-[0] ">
                  Manhattan, New York
                </Text>
                <Image source={icons.Down} />
              </View>
            </View>
            {/* Search View */}
            <Search />
          </View>
        </View>
        {/*Mid - Bottom part */}
        <View className="flex flex-1 px-6 mt-6">
          {/* But one */}
          <ImageBackground
            source={images.Banner}
            className="flex gap-2 py-[13px] px-6 w-full h-[140px] rounded-[12px] overflow-hidden"
          >
            <View className="py-1 px-[6px] rounded-[8px] bg-[#ED5151] ">
              <Text className="font-Sora-semibold text-white text-sm trackng-0">
                Promo
              </Text>
            </View>
            <View className="w-[203px]">
              <Text
                className="relative inline-block font-Sora-semibold text-[2rem] text-white py-[0.1em] 
             before:absolute before:w-full before:h-full 
             before:bg-black before:top-[9px] before:left-0 before:-z-1"
              >
                Buy one get
              </Text>
              <Text
                className="relative inline-block font-Sora-semibold text-[2rem] text-white py-[0.1em] 
             before:absolute before:w-full before:h-full 
             before:bg-black before:top-[9px] before:left-0 before:-z-1"
              >
                one FREE
              </Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
