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
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import icons from "@/constants/icons";

interface CountProps {
  count: number;
  setCount: (count: number) => void;
}

const Order = () => {
  const [method, setMethod] = useState("Deliver");
  const translateX = useRef(new Animated.Value(0)).current;
  const deliverTextOpacity = useRef(new Animated.Value(1)).current;
  const pickupTextOpacity = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(1);

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
    <SafeAreaView className="flex flex-1 bg-[#F9F9F9]">
      <ScrollView className="flex flex-1 px-6 py-8 pb-[100px]">
        {/* Top part */}
        <View className="flex flex-row justify-between items-center">
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
        <View className="flex p-1 bg-[#EDEDED] rounded-[12px] mt-8">
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

        {method === "Deliver" ? (
          <Deliver count={count} setCount={setCount} />
        ) : (
          <PickUp count={count} setCount={setCount} />
        )}
      </ScrollView>

      {/* Coffee Price */}
      <View
        style={{ minHeight: 119, width: "100%" }}
        className="fixed bottom-0 z-20 flex rounded-t-[16px] items-center justify-between bg-white py-4 px-6"
      >
        <View
          style={{ width: "100%" }}
          className="flex flex-row items-center justify-between"
        >
          <View className="flex flex-row gap-4 items-center">
            <Image source={icons.Wallet} style={{ width: 20, height: 20 }} />
            <View>
              <Text className="text-sm font-Sora-semibold text-black leading-[120%]">
                Cash/Wallet
              </Text>
              <Text className="text-xs font-Sora-semibold text-primary leading-[150%]">
                $5.53
              </Text>
            </View>
          </View>
          <Image
            source={icons.Down}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </View>
        <TouchableOpacity
          style={{ width: "100%" }}
          className="mt-6 flex flex-1 items-center justify-center py-4 rounded-[16px] bg-primary"
          onPress={() => {
            router.push("/(order)/delivery");
          }}
        >
          <Text
            style={{ width: 49 }}
            className="text-white text-base font-Sora-semibold leading-[150%] tracking-0"
          >
            Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Deliver: React.FC<CountProps> = ({ count, setCount }) => {
  const params = useLocalSearchParams();
  const calculatedPrice = (Number(params.price) * count).toFixed(2);

  return (
    <View className="flex flex-1 pb-[100px]">
      {/* Top part */}
      <View className="mt-6">
        <Text className="text-base font-Sora-semibold leading-[150%] tracking-0 text-black">
          Deliver Address
        </Text>
        <Text className="text-sm font-Sora-semibold leading-[150%] tracking-0 text-black mt-4">
          Paul M. Valley
        </Text>
        <Text className="text-xs font-Sora leading-[150%] tracking-0 text-lightGrey mt-1">
          1235 Amsterdam Ave, Apt 4B, New York, NY 10027
        </Text>

        {/* Edit Address */}
        <View className="flex flex-row items-center justify-start gap-2 mt-4">
          <View className="flex flex-row items-center gap-1 py-[6px] px-3 bg-white border border-lightGrey rounded-[16px]">
            <Image
              source={icons.Edit}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
            <Text>Edit Address</Text>
          </View>
          <View className="flex flex-row items-center gap-1 py-[6px] px-3 bg-white border border-lightGrey rounded-[16px]">
            <Image
              source={icons.Note}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
            <Text>Add Note</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="flex flex-1 items-center justify-center mt-4">
          <View style={{ width: "90%", height: 1 }} className="bg-[#E3E3E3]" />
        </View>
      </View>
      {/* Middle Part */}
      <View className="flex flex-row items-center justify-between mt-4">
        <View className="flex flex-row items-center gap-4">
          <Image
            source={params.image}
            style={{ width: 54, height: 54, borderRadius: 8 }}
            resizeMode="cover"
          />
          <View>
            <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
              {params.name}
            </Text>
            <Text className="text-xs font-Sora text-lightGrey leading-[120%] tracking-0">
              {params.category}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-[18px]">
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            <Image
              source={count === 1 ? images.MinusFaded : images.Minus}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
            {count}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Image source={images.Plus} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Brown Line */}
      <View className="flex flex-1 mt-4" />

      {/* Payment Section */}
      <View>
        <View className="mt-4 px-4 py-[18px] flex flex-row items-center justify-between bg-white rounded-[16px] border border-[#EDEDED]">
          <View className="flex flex-row gap-4 items-center">
            <Image
              source={icons.Discount}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
            <Text className="text-black text-sm font-Sora-semibold leading-[150%] tracking-0">
              1 Discount is Applied
            </Text>
          </View>
          <Image
            source={icons.Right}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </View>
        {/* Payment Summary */}
        <View className="mt-6">
          <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
            Payment Summary
          </Text>

          <View className="flex flex-row items-center justify-between mt-4">
            <Text className="text-sm font-Sora text-black leading-[150%] tracking-0">
              Price
            </Text>
            <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
              {calculatedPrice}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between mt-2">
            <Text className="text-sm font-Sora text-black leading-[150%] tracking-0">
              Delivery Fee
            </Text>
            <View className="flex flex-row items-center gap-2">
              <Text className="text-sm font-Sora-semibold text-black leading-[150%] line-through tracking-0">
                $ 2.0
              </Text>
              <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
                $1.0
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const PickUp: React.FC<CountProps> = ({ count, setCount }) => {
  const params = useLocalSearchParams();
  const calculatedPrice = (Number(params.price) * count).toFixed(2);
  return (
    <View className="flex flex-1 pb-[100px]">
      {/* Top part */}
      <View className="mt-6">
        <Text className="text-base font-Sora-semibold leading-[150%] tracking-0 text-black">
          Pickup Address
        </Text>
        <Text className="text-sm font-Sora-semibold leading-[150%] tracking-0 text-black mt-4">
          Paul M. Valley
        </Text>
        <Text className="text-xs font-Sora leading-[150%] tracking-0 text-lightGrey mt-1">
          456 W 37th St, Apt 9C, New York, NY 10018
        </Text>

        {/* Edit Address */}
        <View className="flex flex-row items-center justify-start gap-2 mt-4">
          <View className="flex flex-row items-center gap-1 py-[6px] px-3 bg-white border border-lightGrey rounded-[16px]">
            <Image
              source={icons.Edit}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
            <Text>Edit Address</Text>
          </View>
          <View className="flex flex-row items-center gap-1 py-[6px] px-3 bg-white border border-lightGrey rounded-[16px]">
            <Image
              source={icons.Note}
              resizeMode="contain"
              style={{ width: 14, height: 14 }}
            />
            <Text>Add Note</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="flex flex-1 items-center justify-center mt-4">
          <View style={{ width: "90%", height: 1 }} className="bg-[#E3E3E3]" />
        </View>
      </View>
      {/* Middle Part */}
      <View className="flex flex-row items-center justify-between mt-4">
        <View className="flex flex-row items-center gap-4">
          <Image
            source={params.image}
            style={{ width: 54, height: 54, borderRadius: 8 }}
            resizeMode="cover"
          />
          <View>
            <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
              {params.name}
            </Text>
            <Text className="text-xs font-Sora text-lightGrey leading-[120%] tracking-0">
              {params.category}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center gap-[18px]">
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            <Image
              source={count === 1 ? images.MinusFaded : images.Minus}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
            {count}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Image source={images.Plus} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Brown Line */}
      <View className="flex flex-1 mt-4" />

      {/* Payment Section */}
      <View>
        <View className="mt-4 px-4 py-[18px] flex flex-row items-center justify-between bg-white rounded-[16px] border border-[#EDEDED]">
          <View className="flex flex-row gap-4 items-center">
            <Image
              source={icons.Discount}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
            <Text className="text-black text-sm font-Sora-semibold leading-[150%] tracking-0">
              Add a Voucher
            </Text>
          </View>
          <Image
            source={icons.Right}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
          />
        </View>
        {/* Payment Summary */}
        <View className="mt-6">
          <Text className="text-base font-Sora-semibold text-black leading-[150%] tracking-0">
            Payment Summary
          </Text>

          <View className="flex flex-row items-center justify-between mt-4">
            <Text className="text-sm font-Sora text-black leading-[150%] tracking-0">
              Price
            </Text>
            <Text className="text-sm font-Sora-semibold text-black leading-[150%] tracking-0">
              {calculatedPrice}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Order;
