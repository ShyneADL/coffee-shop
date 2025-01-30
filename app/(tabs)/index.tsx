import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { coffees } from "@/constants/coffee";
import Search from "@/components/Search";
import CoffeeCard from "@/components/CoffeeCard";

type AppRoutes = "/" | "/details/[id]";

const Index = () => {
  const categories = [
    "All Coffee",
    "Macchiato",
    "Latte",
    "Americano",
    "Mocha",
    "Espresso",
    "Cold Brew",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Coffee");
  const filteredCoffees = coffees.filter(
    (coffee) =>
      selectedCategory === "All Coffee" || coffee.category === selectedCategory
  );

  return (
    <SafeAreaView className="bg-[#F9F9F9] flex flex-1">
      <ScrollView className="relative h-full flex flex-1 bg-[#F9F9F9] pb-[128px]">
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
            resizeMode="cover"
            style={{
              width: "100%", // Full width of the parent container
              height: 140, // Fixed height
              justifyContent: "flex-start", // Align content to the top
              alignItems: "flex-start", // Align content to the left
              overflow: "hidden", // Hide overflow
              borderRadius: 12, // Rounded corners
              paddingVertical: 13, // Vertical padding
              paddingHorizontal: 24, // Horizontal padding
            }}
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
              <View style={{ position: "relative" }}>
                <Text
                  style={{
                    fontFamily: "Sora-Semibold",
                    fontSize: 32,
                    color: "white",
                    paddingVertical: 4,
                    zIndex: 2,
                  }}
                >
                  Buy one get
                </Text>
                <View
                  style={{ width: 200, height: 27, zIndex: 1 }}
                  className="absolute top-[19px] left-[-1px]  bg-black"
                ></View>
              </View>
              <View style={{ position: "relative" }}>
                <Text
                  style={{
                    fontFamily: "Sora-Semibold",
                    fontSize: 32,
                    color: "white",
                    paddingVertical: 4,
                    zIndex: 2,
                  }}
                >
                  one FREE
                </Text>
                <View
                  style={{ width: 149, height: 23, zIndex: 1 }}
                  className="absolute top-[19px] left-[-1px]  bg-black"
                ></View>
              </View>
            </View>
          </ImageBackground>
          {/* Coffee list */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ gap: "1rem" }}
            className="flex flex-row gap-4 items-center mt-4"
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`${
                  selectedCategory === category ? "bg-primary" : "bg-alt-grey"
                } px-2 py-1 rounded-[6px] mr-4`}
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
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 15, // Horizontal gap
              rowGap: 24, // Vertical gap
              paddingTop: 16, // mt-4 equivalent (4 * 4 = 16)
              width: "100%",
            }}
            showsVerticalScrollIndicator={false}
          >
            {filteredCoffees.map((coffee) => (
              <TouchableOpacity
                key={coffee.id}
                onPress={() => {
                  router.push({
                    pathname: `/details/${coffee.id}` as AppRoutes,
                    params: {
                      id: coffee.id,
                      name: coffee.name,
                      image: coffee.image,
                      category: coffee.category,
                      rating: coffee.rating,
                      description: coffee.description,
                      price: coffee.price,
                    },
                  });
                }}
              >
                <CoffeeCard
                  image={coffee.image}
                  title={coffee.name}
                  category={coffee.category}
                  price={coffee.price}
                  rating={coffee.rating}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
