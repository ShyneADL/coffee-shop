import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import images from "@/constants/images";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={images.Coffee6}
          contentFit="cover"
          style={styles.image}
        />
      </View>
      <LinearGradient
        colors={["transparent", "#050505"]}
        locations={[0, 0.2367]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text style={styles.subtitle}>
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push("/(tabs)");
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingBottom: 12,
    margin: 0,
    backgroundColor: "#000",
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    height: "63%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    // flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 24,
    zIndex: 20,
    paddingHorizontal: 24,
  },
  gradientContainer: {
    // flex: 1,
    // width: "100%",
    // flexDirection: "column",
    // justifyContent: "flex-end",
    marginTop: "120%",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
    zIndex: 2,
    height: "44%",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontFamily: "Sora-Semibold",
    textAlign: "center",
    lineHeight: 48,
    width: "100%",
  },
  subtitle: {
    color: "#A2A2A2",
    textAlign: "center",
    fontFamily: "Sora",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  button: {
    flex: 1,
    width: 327,
    backgroundColor: "#C67C4E",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 32,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Sora-Semibold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: 0,
  },
});
