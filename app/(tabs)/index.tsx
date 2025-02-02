import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { router, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { coffees } from "@/constants/coffee";
import Search from "@/components/Search";
import CoffeeCard from "@/components/CoffeeCard";

const Index = () => {
  const categories = [
    "All Coffee",
    "Macchiato",
    "Latte",
    "Americano",
    "Mocha",
    "Espresso",
    "Cold Brew",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Coffee");
  const filteredCoffees = coffees.filter(
    (coffee) =>
      selectedCategory === "All Coffee" || coffee.category === selectedCategory
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#111111" barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        {/* Top part */}
        <View style={styles.topContainer}>
          <View style={styles.gradientBackground} />
          <View style={styles.contentContainer}>
            {/* Location View */}
            <View>
              <Text style={styles.locationText}>Location</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationName}>Manhattan, New York</Text>
                <Image
                  source={icons.Down}
                  resizeMode="contain"
                  style={styles.downIcon}
                />
              </View>
            </View>
            {/* Search View */}
            <Search />
          </View>
        </View>
        {/* Mid - Bottom part */}
        <View style={styles.midBottomContainer}>
          {/* Buy one */}
          <ImageBackground
            source={images.Banner}
            resizeMode="cover"
            style={styles.banner}
          >
            <View style={styles.promoContainer}>
              <Text style={styles.promoText}>Promo</Text>
            </View>
            <View style={styles.bannerTextContainer}>
              <View style={styles.bannerTextWrapper}>
                <Text style={styles.bannerText}>Buy one get</Text>
                <View style={styles.bannerTextBackground1} />
              </View>
              <View style={styles.bannerTextWrapper}>
                <Text style={styles.bannerText}>one FREE</Text>
                <View style={styles.bannerTextBackground2} />
              </View>
            </View>
          </ImageBackground>
          {/* Coffee list */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coffeeListContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Coffee cards */}
          <View style={styles.coffeeCardsContainer}>
            {filteredCoffees.map((coffee) => (
              <Link key={coffee.id} href={`/details/${coffee.id}`} asChild>
                <Pressable>
                  <CoffeeCard
                    image={coffee.image}
                    title={coffee.name}
                    category={coffee.category}
                    price={coffee.price}
                    rating={coffee.rating}
                  />
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#F9F9F9",
    paddingBottom: 1,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  topContainer: {
    width: "100%",
  },
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: 280,
    top: 0,
    backgroundColor: "#111111",
  },
  contentContainer: {
    paddingHorizontal: 24,
    marginTop: 40,
    gap: 7,
  },
  locationText: {
    fontFamily: "Sora",
    fontSize: 12,
    color: "#A2A2A2",
  },
  locationContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 8,
  },
  locationName: {
    fontFamily: "Sora-Semibold",
    fontSize: 14,
    color: "white",
  },
  downIcon: {
    width: 14,
    height: 14,
  },
  midBottomContainer: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  banner: {
    width: "100%",
    height: 140,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRadius: 12,
    paddingVertical: 13,
  },
  promoContainer: {
    width: 60,
    height: 26,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
    backgroundColor: "#ED5151",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 24,
  },
  promoText: {
    fontFamily: "Sora-Semibold",
    fontSize: 14,
    color: "white",
  },
  bannerTextContainer: {
    width: 203,
    marginLeft: 24,
  },
  bannerTextWrapper: {
    position: "relative",
  },
  bannerText: {
    fontFamily: "Sora-Semibold",
    fontSize: 32,
    color: "white",
    paddingVertical: 4,
    zIndex: 2,
  },
  bannerTextBackground1: {
    width: 200,
    height: 27,
    backgroundColor: "black",
    position: "absolute",
    top: 19,
    left: -1,
    zIndex: 1,
  },
  bannerTextBackground2: {
    width: 149,
    height: 27,
    backgroundColor: "black",
    position: "absolute",
    top: 19,
    left: -1,
    zIndex: 1,
  },
  coffeeListContent: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginTop: 16,
  },
  categoryButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
    marginRight: 16,
  },
  selectedCategoryButton: {
    backgroundColor: "#C67C4E",
  },
  categoryText: {
    fontFamily: "Sora",
    fontSize: 14,
    color: "black",
  },
  selectedCategoryText: {
    color: "white",
    fontFamily: "Sora-Semibold",
  },
  coffeeCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
    rowGap: 24,
    paddingTop: 16,
    paddingBottom: 65,
    width: "100%",
  },
});

export default Index;
