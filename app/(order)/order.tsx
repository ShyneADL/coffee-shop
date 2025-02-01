import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";
import icons from "@/constants/icons";
import { coffees } from "@/constants/coffee";

interface CountProps {
  count: number;
  setCount: (count: number) => void;
}

const Order = () => {
  const [method, setMethod] = useState("Deliver");
  const translateX = useRef(new Animated.Value(0)).current;
  const deliverTextOpacity = useRef(new Animated.Value(1)).current;
  const pickupTextOpacity = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: method === "Deliver" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(deliverTextOpacity, {
        toValue: method === "Deliver" ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(pickupTextOpacity, {
        toValue: method === "Deliver" ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [method]);

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
          <Text style={styles.title}>Order</Text>
          <TouchableOpacity style={styles.likeButton}>
            <Image
              source={icons.Like}
              resizeMode="contain"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Slider */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderInnerContainer}>
            <Pressable
              style={styles.sliderButton}
              onPress={() => setMethod("Deliver")}
            >
              <Animated.Text
                style={[
                  styles.sliderButtonText,
                  {
                    color: deliverTextOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["#313131", "#FFFFFF"],
                    }),
                    fontFamily:
                      method === "Deliver" ? "Sora-SemiBold" : "Sora-Regular",
                  },
                ]}
              >
                Deliver
              </Animated.Text>
            </Pressable>
            <Pressable
              style={styles.sliderButton}
              onPress={() => setMethod("Pickup")}
            >
              <Animated.Text
                style={[
                  styles.sliderButtonText,
                  {
                    color: pickupTextOpacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["#313131", "#FFFFFF"],
                    }),
                    fontFamily:
                      method === "Pickup" ? "Sora-SemiBold" : "Sora-Regular",
                  },
                ]}
              >
                Pick Up
              </Animated.Text>
            </Pressable>

            {/* Animated Slider */}
            <Animated.View
              style={[
                styles.sliderBackground,
                {
                  transform: [
                    {
                      translateX: translateX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100], // Use numeric values for translation
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </View>

        {method === "Deliver" ? (
          <Deliver count={count} setCount={setCount} />
        ) : (
          <PickUp count={count} setCount={setCount} />
        )}
      </ScrollView>

      {/* Coffee Price */}
      <View style={styles.priceContainer}>
        <View style={styles.paymentMethodContainer}>
          <View style={styles.paymentMethod}>
            <Image source={icons.Wallet} style={styles.walletIcon} />
            <View>
              <Text style={styles.paymentMethodText}>Cash/Wallet</Text>
              <Text style={styles.paymentMethodAmount}>$5.53</Text>
            </View>
          </View>
          <Image
            source={icons.Down}
            resizeMode="contain"
            style={styles.downIcon}
          />
        </View>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => {
            router.push("/(order)/delivery");
          }}
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Deliver: React.FC<CountProps> = ({ count, setCount }) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { price } = useLocalSearchParams<{ price: string }>();

  // Find the coffee by id
  const coffee = coffees.find((c) => c.id === Number(id));
  const calculatedPrice = (Number(price) * count).toFixed(2);

  return (
    <View style={styles.deliverContainer}>
      {/* Top part */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Deliver Address</Text>
        <Text style={styles.addressName}>Paul M. Valley</Text>
        <Text style={styles.addressDetails}>
          1235 Amsterdam Ave, Apt 4B, New York, NY 10027
        </Text>

        {/* Edit Address */}
        <View style={styles.editAddressContainer}>
          <View style={styles.editButton}>
            <Image
              source={icons.Edit}
              resizeMode="contain"
              style={styles.editIcon}
            />
            <Text>Edit Address</Text>
          </View>
          <View style={styles.editButton}>
            <Image
              source={icons.Note}
              resizeMode="contain"
              style={styles.editIcon}
            />
            <Text>Add Note</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />
      </View>
      {/* Middle Part */}
      <View style={styles.coffeeDetailsContainer}>
        <View style={styles.coffeeInfo}>
          <Image
            source={coffee?.image}
            style={styles.coffeeImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.coffeeName}>{coffee?.name}</Text>
            <Text style={styles.coffeeCategory}>{coffee?.category}</Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            <Image
              source={count === 1 ? images.MinusFaded : images.Minus}
              style={styles.quantityIcon}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Image source={images.Plus} style={styles.quantityIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Brown Line */}
      <View style={styles.brownLine} />

      {/* Payment Section */}
      <View>
        <View style={styles.discountContainer}>
          <View style={styles.discountInfo}>
            <Image
              source={icons.Discount}
              resizeMode="contain"
              style={styles.discountIcon}
            />
            <Text style={styles.discountText}>1 Discount is Applied</Text>
          </View>
          <Image
            source={icons.Right}
            resizeMode="contain"
            style={styles.rightIcon}
          />
        </View>
        {/* Payment Summary */}
        <View style={styles.paymentSummaryContainer}>
          <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>

          <View style={styles.paymentSummaryItem}>
            <Text style={styles.paymentSummaryLabel}>Price</Text>
            <Text style={styles.paymentSummaryValue}>{calculatedPrice}</Text>
          </View>
          <View style={styles.paymentSummaryItem}>
            <Text style={styles.paymentSummaryLabel}>Delivery Fee</Text>
            <View style={styles.deliveryFeeContainer}>
              <Text style={styles.deliveryFeeStriked}>$ 2.0</Text>
              <Text style={styles.deliveryFee}>$1.0</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const PickUp: React.FC<CountProps> = ({ count, setCount }) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { price } = useLocalSearchParams<{ price: string }>();

  // Find the coffee by id
  const coffee = coffees.find((c) => c.id === Number(id));
  const calculatedPrice = (Number(price) * count).toFixed(2);

  return (
    <View style={styles.pickupContainer}>
      {/* Top part */}
      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Pickup Address</Text>
        <Text style={styles.addressName}>Paul M. Valley</Text>
        <Text style={styles.addressDetails}>
          456 W 37th St, Apt 9C, New York, NY 10018
        </Text>

        {/* Edit Address */}
        <View style={styles.editAddressContainer}>
          <View style={styles.editButton}>
            <Image
              source={icons.Edit}
              resizeMode="contain"
              style={styles.editIcon}
            />
            <Text>Edit Address</Text>
          </View>
          <View style={styles.editButton}>
            <Image
              source={icons.Note}
              resizeMode="contain"
              style={styles.editIcon}
            />
            <Text>Add Note</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />
      </View>
      {/* Middle Part */}
      <View style={styles.coffeeDetailsContainer}>
        <View style={styles.coffeeInfo}>
          <Image
            source={coffee?.image}
            style={styles.coffeeImage}
            resizeMode="cover"
          />
          <View>
            <Text style={styles.coffeeName}>{coffee?.name}</Text>
            <Text style={styles.coffeeCategory}>{coffee?.category}</Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              if (count > 1) {
                setCount(count - 1);
              }
            }}
          >
            <Image
              source={count === 1 ? images.MinusFaded : images.Minus}
              style={styles.quantityIcon}
            />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{count}</Text>
          <TouchableOpacity
            onPress={() => {
              setCount(count + 1);
            }}
          >
            <Image source={images.Plus} style={styles.quantityIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Brown Line */}
      <View style={styles.brownLine} />

      {/* Payment Section */}
      <View>
        <View style={styles.discountContainer}>
          <View style={styles.discountInfo}>
            <Image
              source={icons.Discount}
              resizeMode="contain"
              style={styles.discountIcon}
            />
            <Text style={styles.discountText}>Add a Voucher</Text>
          </View>
          <Image
            source={icons.Right}
            resizeMode="contain"
            style={styles.rightIcon}
          />
        </View>
        {/* Payment Summary */}
        <View style={styles.paymentSummaryContainer}>
          <Text style={styles.paymentSummaryTitle}>Payment Summary</Text>

          <View style={styles.paymentSummaryItem}>
            <Text style={styles.paymentSummaryLabel}>Price</Text>
            <Text style={styles.paymentSummaryValue}>{calculatedPrice}</Text>
          </View>
        </View>
      </View>
    </View>
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
  title: {
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
  sliderContainer: {
    backgroundColor: "#EDEDED",
    borderRadius: 12,
    marginTop: 32,
    padding: 4,
  },
  sliderInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    position: "relative",
  },
  sliderButton: {
    flex: 1,
    paddingHorizontal: 48,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  sliderButtonText: {
    fontSize: 16,
    lineHeight: 19.6,
    textAlign: "center",
  },
  sliderBackground: {
    position: "absolute",
    height: "100%",
    width: "50%",
    backgroundColor: "#C67C4E",
    borderRadius: 8,
    zIndex: -1,
  },
  priceContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 119,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  walletIcon: {
    width: 20,
    height: 20,
  },
  paymentMethodText: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  paymentMethodAmount: {
    fontSize: 12,
    fontFamily: "Sora-Semibold",
    color: "#ED5151",
  },
  downIcon: {
    width: 20,
    height: 20,
  },
  orderButton: {
    width: "100%",
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: "#ED5151",
    alignItems: "center",
    justifyContent: "center",
  },
  orderButtonText: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "white",
  },
  deliverContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  addressContainer: {
    marginTop: 24,
  },
  addressTitle: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  addressName: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
    marginTop: 16,
  },
  addressDetails: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
    marginTop: 4,
  },
  editAddressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 16,
  },
  editIcon: {
    width: 14,
    height: 14,
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#E3E3E3",
    marginTop: 16,
  },
  coffeeDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  coffeeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  coffeeImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
  },
  coffeeName: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  coffeeCategory: {
    fontSize: 12,
    fontFamily: "Sora",
    color: "#A2A2A2",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  quantityIcon: {
    width: 24,
    height: 24,
  },
  quantityText: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  brownLine: {
    flex: 1,
    marginTop: 16,
  },
  discountContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  discountInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  discountIcon: {
    width: 20,
    height: 20,
  },
  discountText: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
  paymentSummaryContainer: {
    marginTop: 24,
  },
  paymentSummaryTitle: {
    fontSize: 16,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  paymentSummaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  paymentSummaryLabel: {
    fontSize: 14,
    fontFamily: "Sora",
    color: "black",
  },
  paymentSummaryValue: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  deliveryFeeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deliveryFeeStriked: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
    textDecorationLine: "line-through",
  },
  deliveryFee: {
    fontSize: 14,
    fontFamily: "Sora-Semibold",
    color: "black",
  },
  pickupContainer: {
    flex: 1,
    paddingBottom: 100,
  },
});

export default Order;
