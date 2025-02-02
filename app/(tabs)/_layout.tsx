import { Tabs } from "expo-router";
import { View } from "react-native";

import BagIcon from "@/components/BagIcon";
import HomeIcon from "@/components/HomeIcon";
import LikeIcon from "@/components/LikeIcon";

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
        return null;
    }
  };

  return (
    <View
      style={{
        height: 35,
        position: "relative",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 6,
      }}
    >
      {renderIcon()}
      {focused && (
        <View
          style={{
            width: 10,
            height: 5,
            bottom: -6,
            alignSelf: "center",
            // left: "50%",
            // transform: [{ translateX: -5 }],
            position: "absolute",
            backgroundColor: "#C67C4E",
            borderRadius: 18,
          }}
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
          paddingBottom: 24,
          paddingTop: 24,
          bottom: 0,
          minHeight: 75,
          borderTopColor: "transparent",
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
    </Tabs>
  );
};

export default TabsLayout;
