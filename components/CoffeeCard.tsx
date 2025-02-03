import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface CoffeeCardProps {
  image: ImageSourcePropType;
  title: string;
  category: string;
  price: number;
  rating: number;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  image,
  title,
  category,
  price,
  rating,
}) => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} contentFit="cover" />
        <View style={styles.ratingContainer}>
          <Image
            source={images.Star}
            contentFit="contain"
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>$ {price}</Text>
          <View style={styles.addButton}>
            <Image
              source={icons.Add}
              contentFit="contain"
              style={styles.addIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 156,
    gap: 8,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    position: "relative",
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: 128,
    borderRadius: 12,
    zIndex: 1,
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    zIndex: 20,
  },
  starIcon: {
    width: 10,
    height: 10,
  },
  ratingText: {
    fontFamily: "Sora-Semibold",
    fontSize: 10,
    color: "white",
  },
  detailsContainer: {
    gap: 8,
  },
  textContainer: {
    gap: 4,
  },
  titleText: {
    width: 103,
    fontFamily: "Sora-Semibold",
    fontSize: 16,
    color: "#242424",
    lineHeight: 24,
  },
  categoryText: {
    width: 103,
    fontFamily: "Sora",
    fontSize: 12,
    color: "#A2A2A2",
    lineHeight: 14.4,
  },
  priceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontFamily: "Sora-Semibold",
    fontSize: 18,
    lineHeight: 27,
  },
  addButton: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#C67C4E",
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    width: 16,
    height: 16,
  },
});

export default CoffeeCard;
