import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

function Avatar() {
  return (
    <View style={styles.center}>
        <Image
          source={require("../assets/defaultprofile.png")}
          style={styles.image}
        />
      <Text style= {{fontSize: 20}}>John Doe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});

export default Avatar;