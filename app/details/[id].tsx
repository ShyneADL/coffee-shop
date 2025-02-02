import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { coffees } from "@/constants/coffee";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const coffee = coffees.find((c) => c.id === Number(id));

  const [activeSize, setActiveSize] = useState("M");

  // Calculate price based on size
  const calculatePrice = () => {
    const basePrice = Number(coffee?.price || 0);

    if (activeSize === "S") {
      return basePrice - 1.0;
    } else if (activeSize === "L") {
      return basePrice + 2.0;
    } else {
      return basePrice;
    }
  };

  const currentPrice = calculatePrice();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {/* Top part */}
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image
              source={icons.Left}
              resizeMode="contain"
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.detailsText}>Details</Text>
          <TouchableOpacity style={styles.likeButton}>
            <Image
              source={icons.Like}
              resizeMode="contain"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Coffee Image */}
        <Image
          source={coffee?.image}
          resizeMode="cover"
          style={styles.coffeeImage}
        />

        {/* Coffee Details */}
        <View style={styles.coffeeDetailsContainer}>
          <View>
            <Text style={styles.coffeeName}>
              {coffee?.name || "Coffee Title"}
            </Text>
            <Text style={styles.coffeeCategory}>
              {coffee?.category || "Coffee Category"}
            </Text>
            <View style={styles.ratingContainer}>
              <Image
                source={images.Star}
                resizeMode="contain"
                style={styles.starIcon}
              />
              <View style={styles.ratingTextContainer}>
                <Text style={styles.ratingText}>{coffee?.rating || "0"}</Text>
                <Text style={styles.ratingCount}>(230)</Text>
              </View>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.iconWrapper}>
              <Image source={images.Bike} style={styles.icon} />
            </View>
            <View style={styles.iconWrapper}>
              <Image source={images.Bean} style={styles.icon} />
            </View>
            <View style={styles.iconWrapper}>
              <Image source={images.Milk} style={styles.icon} />
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>

        {/* Coffee Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {coffee?.description || "No description available."}
          </Text>
        </View>

        {/* Coffee Size */}
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Size</Text>
          <View style={styles.sizeButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                activeSize === "S" && styles.activeSizeButton,
              ]}
              onPress={() => setActiveSize("S")}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  activeSize === "S" && styles.activeSizeButtonText,
                ]}
              >
                S
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                activeSize === "M" && styles.activeSizeButton,
              ]}
              onPress={() => setActiveSize("M")}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  activeSize === "M" && styles.activeSizeButtonText,
                ]}
              >
                M
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sizeButton,
                activeSize === "L" && styles.activeSizeButton,
              ]}
              onPress={() => setActiveSize("L")}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  activeSize === "L" && styles.activeSizeButtonText,
                ]}
              >
                L
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Coffee Price */}
      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>$ {currentPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => {
            router.push({
              pathname: "/(order)/order",
              params: {
                id: id,
                price: currentPrice.toFixed(2),
                size: activeSize,
              },
            });
          }}
        >
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
  },
  detailsText: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  likeButton: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  coffeeImage: {
    width: "100%",
    height: 202,
    aspectRatio: 8 / 5,
    marginTop: 32,
    borderRadius: 16,
  },
  coffeeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  coffeeName: {
    fontSize: 20,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  coffeeCategory: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  ratingCount: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
    marginLeft: 4,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconWrapper: {
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 10,
  },
  dividerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#E3E3E3",
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Sora-Light",
    color: "#A2A2A2",
    marginTop: 8,
  },
  sizeContainer: {
    marginTop: 24,
  },
  sizeTitle: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  sizeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
  },
  sizeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E3E3",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  activeSizeButton: {
    backgroundColor: "#EDEDED",
    borderColor: "#C67C4E",
  },
  sizeButtonText: {
    fontSize: 14,
    fontFamily: "Sora",
    color: "black",
  },
  activeSizeButtonText: {
    color: "#C67C4E",
  },
  priceContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 46,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "Sora",
    color: "#909090",
  },
  priceValue: {
    fontSize: 20,
    fontFamily: "Sora-Semibold",
    color: "#C67C4E",
    marginTop: 4,
  },
  buyNowButton: {
    flex: 1,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#C67C4E",
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "white",
  },
});

export default Detail;
