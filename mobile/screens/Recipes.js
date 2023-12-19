import * as React from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity, ImageBackground } from "react-native";

const backgroundImages = {
  Japanese: require("../assets/Japanese_Sushi.jpeg"),
  Italian: require("../assets/Italian.jpeg"),
  American: require("../assets/American.jpeg"),
  Indian: require("../assets/Indian.jpeg"),
}

function Recipes({navigation}) {
  const cuisines =['Japanese', "Italian", "American", "Indian"];
  const handleCuisinePress = (cuisine) => {
    navigation.navigate('RecipeList', {cuisine});
  };

  return (
    <View style={styles.center}>
      {cuisines.map((cuisine) => {
        return (
          <TouchableOpacity
            key={cuisine}
            title={cuisine}
            onPress={() => handleCuisinePress(cuisine)} style={styles.buttonContainer}>
            <ImageBackground source={backgroundImages[cuisine]} style={styles.buttonBackground}>
              <Text style={styles.buttonText}>{cuisine}</Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
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
  buttonContainer: {
    width: '100%',
    flex:1,
  },
  buttonBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
});

export default Recipes;