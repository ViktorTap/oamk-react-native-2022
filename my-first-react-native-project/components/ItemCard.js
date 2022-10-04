import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ItemCard({ data }) {
  const products = data.products;
  const navigation = useNavigation();

  const mappedProducts = () => {
    if (!products) return;
    return products.map((item) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileItem", { itemId: item.id })
          }
          key={item.id}
          style={styles.touchableOpacityContainer}
        >
          <Text>{item.brand}</Text>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: item.thumbnail,
            }}
          />
          <Text>{item.title}</Text>
          <Text>💰{item.price}</Text>
        </TouchableOpacity>
      );
    });
  };

  return <View style={styles.container}>{mappedProducts()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "pink",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableOpacityContainer: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: 150,
    height: 200,
    margin: 5,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    marginBottom: 6,
    marginTop: 6,
  },
});
