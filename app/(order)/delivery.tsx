import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { router, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import images from "@/constants/images";
import icons from "@/constants/icons";

const Delivery = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Image
        source={images.Map}
        cachePolicy="memory-disk"
        style={styles.imageBackground}
      />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Top Part */}
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image
              source={icons.Left}
              style={styles.icon}
              contentFit="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.gpsButton}>
            <Image
              source={images.GPS}
              contentFit="contain"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Link style={{ position: "absolute", bottom: 200 }} href="/onboarding">
          <View
            style={{
              backgroundColor: "transparent",
              zIndex: 200,
              width: "100%",
              height: 200,
            }}
          />
        </Link>

        {/* Bottom Part */}
        <Bottom />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Delivery;

const Bottom = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["25%", "54%"];

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create a continuous pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    // Cleanup animation on unmount
    return () => pulseAnimation.stop();
  }, [pulseAnim]);

  // renders
  return (
    <GestureHandlerRootView style={styles.bottomSheetContainer}>
      <BottomSheet
        index={0}
        snapPoints={snapPoints} // Snap points for the sheet
        ref={bottomSheetRef}
        style={styles.bottomSheet}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          {/* Texts */}
          <View style={styles.textContainer}>
            <Text style={styles.timeText}>10 minutes left</Text>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryText}>Delivery to </Text>
              <Text style={styles.deliveryName}>Paul M. Valley</Text>
            </View>
          </View>

          {/* Progress bars */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, styles.progressBarFilled]} />
            <View style={[styles.progressBar, styles.progressBarFilled]} />
            <View style={[styles.progressBar, styles.progressBarPulsing]}>
              <Animated.View
                style={[styles.progressBarFilled, { opacity: pulseAnim }]}
              />
            </View>
            <View style={[styles.progressBar, styles.progressBarEmpty]} />
          </View>

          {/* Bottom */}
          <View style={styles.deliveryInfoContainer}>
            <View style={styles.bikeIconContainer}>
              <Image source={images.Bike} style={styles.bikeIcon} />
            </View>
            <View style={styles.deliveryTextWrapper}>
              <Text style={styles.deliveryInfoTitle}>Delivered your order</Text>
              <Text style={styles.deliveryInfoDescription}>
                We will deliver your goods to you in the shortest possible time.
              </Text>
            </View>
          </View>

          <View style={styles.courierContainer}>
            <View style={styles.courierInfo}>
              <Image source={images.Man} style={styles.courierImage} />
              <View style={styles.courierTextWrapper}>
                <Text style={styles.courierName}>Brooklyn Simmons</Text>
                <Text style={styles.courierRole}>Personal Courier</Text>
              </View>
            </View>
            <View style={styles.phoneIconContainer}>
              <Image
                source={icons.Phone}
                style={styles.phoneIcon}
                contentFit="contain"
              />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    inset: 0,
  },
  safeArea: {
    flex: 1,
  },
  topContainer: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 48,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 12,
  },
  gpsButton: {
    padding: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  bottomSheetContainer: {
    flex: 1,
    minHeight: 322,
  },
  bottomSheet: {
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: "#E3E3E3",
    width: 45,
    height: 5,
    borderRadius: 16,
    marginTop: 16,
  },
  bottomSheetContent: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
    lineHeight: 24,
  },
  deliveryTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryText: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
    lineHeight: 18,
  },
  deliveryName: {
    fontSize: 12,
    fontFamily: "Sora-Semibold",
    color: "black",
    lineHeight: 18,
  },
  progressBarContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 25,
    paddingHorizontal: 6,
  },
  progressBar: {
    height: 4,
    minWidth: 50,
    borderRadius: 20,
    flex: 1,
  },
  progressBarFilled: {
    backgroundColor: "#36C07E",
  },
  progressBarPulsing: {
    backgroundColor: "#E3E3E3",
    position: "relative",
  },
  progressBarEmpty: {
    backgroundColor: "#E3E3E3",
  },
  deliveryInfoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    paddingLeft: 12,
    paddingVertical: 10.5,
    marginTop: 24,
  },
  bikeIconContainer: {
    backgroundColor: "transparent",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    padding: 6,
  },
  bikeIcon: {
    width: 44,
    height: 44,
  },
  deliveryTextWrapper: {
    width: 243,
  },
  deliveryInfoTitle: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
    lineHeight: 21,
    textAlign: "left",
  },
  deliveryInfoDescription: {
    fontSize: 12,
    fontFamily: "Sora-Light",
    color: "#A2A2A2",
    lineHeight: 18,
    textAlign: "left",
    marginTop: 4,
  },
  courierContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  courierInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  courierImage: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  courierTextWrapper: {
    width: 135,
  },
  courierName: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
    lineHeight: 21,
  },
  courierRole: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
    lineHeight: 14.4,
    marginTop: 4,
  },
  phoneIconContainer: {
    borderRadius: 12,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    padding: 10,
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
});
