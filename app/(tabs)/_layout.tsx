import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import icons from "@/constants/icons";

const TabIcon = ({
  focused,
  icon,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          bottom: 0,
          minHeight: 99,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.Home} />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.Like} />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.Bag} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.Notification} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
