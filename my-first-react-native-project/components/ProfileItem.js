import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileItem = ({ route }) => {
  const itemId = route.params?.itemId;

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${itemId}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const mappedImages = () => {
    if (!item.images) return;
    return item.images.map((img, index) => {
      return (
        <View key={index} style={styles.imageContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: img,
            }}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.thumbnailStyle}
        source={{
          uri: item.thumbnail,
        }}
      />
      <Text>{item.title}</Text>
      <Text>{item.brand}</Text>
      <Text>{item.price}</Text>
      <Text>{item.description}</Text>
      <Text>{"⭐".repeat(Math.round(item.rating))}</Text>
      <ScrollView horizontal={true}>
        <View style={styles.containerForImageContainers}>{mappedImages()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnailStyle: {
    width: 150,
    height: 150,
  },
  tinyLogo: {
    width: 125,
    height: 125,
    // marginBottom: 6,
    // marginTop: 6,
  },
  imageContainer: {
    borderWidth: 1,
  },
  containerForImageContainers: {
    flexDirection: "row",
    height: 150,
  },
  textTitle: {},
  textPrice: {},
  textStyle: {},
});

export default ProfileItem;
