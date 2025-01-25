import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView className="relative h-full">
        <View className="absolute w-full h-[280px] top-0 bg-gradient-to-br from-[#111111] to-[#313131]"></View>
        <View className="px-6 mt-10"></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
