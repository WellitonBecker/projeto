import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

interface RatingBarProps {
  defaultRating: number;
  setDefaultRating: any;
}

export default function RatingBar({
  defaultRating,
  setDefaultRating,
}: RatingBarProps) {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const RatingBar = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? require("./../assets/star_filled.png")
                    : require("./../assets/star_corner.png")
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <RatingBar />
        <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    color: "#000",
    marginTop: 15,
  },
  ratingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
