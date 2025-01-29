import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import icons from "@/constants/icons";
import BagIcon from "@/components/BagIcon";
import HomeIcon from "@/components/HomeIcon";
import LikeIcon from "@/components/LikeIcon";
import NotificationIcon from "@/components/NotificationIcon";

const TabIcon = ({ focused, icon }: { focused: boolean; icon: string }) => {
  const color = focused ? "#C67C4E" : "#A2A2A2";

  const renderIcon = () => {
    switch (icon) {
      case "Like":
        return <LikeIcon color={color} />;
      case "Bag":
        return <BagIcon color={color} />;
      case "Home":
        return <HomeIcon color={color} />;
      case "Notification":
        return <NotificationIcon color={color} />;
      default:
        return null;
    }
  };

  return (
    <View
      style={{ height: 35 }}
      className="relative flex-1 flex flex-col items-center pb-[6px]"
    >
      {renderIcon()}
      {focused && (
        <View
          style={{ width: 10, height: 5 }}
          className="absolute -bottom-[6px] left-[50%] translate-x-[-50%] bg-primary rounded-[18px]"
        ></View>
      )}
    </View>
  );
};
// <View
//   style={{ height: 35 }}
//   className="relative flex-1 flex flex-col items-center pb-[6px]"
// >
//   <Image
//     source={icon}
//     tintColor={focused ? "#C67C4E" : "#A2A2A2"}
//     resizeMode="contain"
//     className="size-6"
//   />
//   {focused && (
//     <View
//       style={{ width: 10, height: 5 }}
//       className="absolute -bottom-[6px] left-[50%] translate-x-[-50%] bg-primary rounded-[18px]"
//     ></View>
//   )}
// </View>
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
          paddingBottom: 6,
          paddingTop: 24,
          bottom: 0,
          minHeight: 65,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="Like" />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="Bag" />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="Notification" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
