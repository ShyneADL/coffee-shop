import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Order = () => {
  const [method, setMethod] = useState("Deliver");
  const translateX = useRef(new Animated.Value(0)).current;
  const deliverTextOpacity = useRef(new Animated.Value(1)).current;
  const pickupTextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: method === "Deliver" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(deliverTextOpacity, {
        toValue: method === "Deliver" ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pickupTextOpacity, {
        toValue: method === "Deliver" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [method]);
  return (
    <SafeAreaView className="h-full bg-[#F9F9F9]">
      <ScrollView className="px-6 py-8">
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
            Order
          </Text>
          <TouchableOpacity className="p-[10px]">
            <Image
              source={icons.Like}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        {/* Slider */}
        <View className="flex flex-1 p-1 bg-[#EDEDED] rounded-[12px]">
          <View className="relative flex flex-1 flex-row items-center justify-between rounded-[12px] gap-1">
            <Pressable
              className="flex-1 px-12 py-2 rounded-[8px] bg-transparent"
              onPress={() => setMethod("Deliver")}
            >
              <Animated.Text
                style={{
                  color: deliverTextOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#313131", "#FFFFFF"],
                  }),
                  width: 70,
                  fontSize: 16,
                  fontFamily:
                    method === "Deliver" ? "Sora-SemiBold" : "Sora-Regular",
                  lineHeight: 19.6,
                  textAlign: "center",
                }}
              >
                Deliver
              </Animated.Text>
            </Pressable>
            <Pressable
              className="flex-1 px-12 py-2 rounded-[8px] bg-transparent"
              onPress={() => setMethod("Pickup")}
            >
              <Animated.Text
                style={{
                  color: pickupTextOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#313131", "#FFFFFF"],
                  }),
                  width: 70,
                  fontSize: 16,
                  fontFamily:
                    method === "Pickup" ? "Sora-SemiBold" : "Sora-Regular",
                  lineHeight: 19.6,
                  textAlign: "center",
                }}
              >
                Pick Up
              </Animated.Text>
            </Pressable>

            {/* Animated Slider */}
            <Animated.View
              style={{
                position: "absolute",
                height: "100%",
                width: "50%", // Match the width of the buttons
                backgroundColor: "#C67C4E", // Primary color
                borderRadius: 8,
                zIndex: -1,
                transform: [
                  {
                    translateX: translateX.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"], // Use numeric values for translation
                    }),
                  },
                ],
              }}
            />
          </View>
        </View>

        {/* Conditional Rendering */}
        {method === "Deliver" ? <Deliver /> : <PickUp />}
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
        <TouchableOpacity className="flex flex-1 px-4 py-5 rounded-[16px] bg-primary">
          <Text className="text-white text-base font-Sora-semibold leading-[150%] tracking-0">
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Deliver = () => {
  return (
    <View>
      <Text>Deliver</Text>
    </View>
  );
};

const PickUp = () => {
  return (
    <View>
      <Text>Pickup</Text>
    </View>
  );
};

export default Order;
