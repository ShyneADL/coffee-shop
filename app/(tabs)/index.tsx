import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { coffees } from "@/constants/coffee";
import Search from "@/components/Search";
import CoffeeCard from "@/components/CoffeeCard";

const Index = () => {
  const categories = [
    "All Categories",
    "Macchiato",
    "Latte",
    "Americano",
    "Mocha",
    "Espresso",
    "Cold Brew",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const filteredCoffees = coffees.filter(
    (coffee) =>
      selectedCategory === "All Categories" ||
      coffee.category === selectedCategory
  );

  return (
    <SafeAreaView>
      <ScrollView className="relative h-full bg-[#F9F9F9]">
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
              <View className="flex flex-row gap-1 items-center mt-2">
                <Text className="font-Sora-semibold text-sm text-white leading-[150%] tracking-[0] ">
                  Manhattan, New York
                </Text>
                <Image source={icons.Down} style={{ width: 14, height: 14 }} />
              </View>
            </View>
            {/* Search View */}
            <Search />
          </View>
        </View>
        {/*Mid - Bottom part */}
        <View className="flex px-6 mt-6">
          {/* Buy one */}
          <ImageBackground
            source={images.Banner}
            resizeMode="contain"
            className="flex gap-2 py-[13px] px-6 w-full h-[140px] rounded-[12px] overflow-hidden"
          >
            <View
              style={{ width: 60, height: 26 }}
              className="py-1 px-[6px] rounded-[8px] bg-[#ED5151]"
            >
              <Text className="font-Sora-semibold text-white text-sm trackng-0">
                Promo
              </Text>
            </View>
            <View className="w-[203px]">
              <Text
                style={{
                  fontFamily: "Sora-Semibold",
                  fontSize: 32,
                  color: "white",
                  paddingVertical: 4,
                }}
              >
                Buy one get
              </Text>
              <Text
                style={{
                  fontFamily: "Sora-Semibold",
                  fontSize: 32,
                  color: "white",
                  paddingVertical: 4,
                }}
              >
                one FREE
              </Text>
            </View>
          </ImageBackground>
          {/* Coffee list */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex flex-row gap-4 items-center bg-transparent"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`${
                  selectedCategory === category ? "bg-primary" : "bg-black-100"
                } px-2 py-1 rounded-[6px]`}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  className={`${
                    selectedCategory === category
                      ? "text-white font-Sora-semibold"
                      : "text-black font-Sora"
                  } leading-[150%] text-sm `}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Coffee cards */}
          <View className="flex flex-row flex-wrap gap-x-[15px] gap-y-[24px] w-full">
            {/* {filteredCoffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                image={coffee.image}
                title={coffee.name}
                category={coffee.category}
                price={coffee.price}
                rating={coffee.rating}
              />
            ))} */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
