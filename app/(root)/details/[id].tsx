import { View, Text } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;
