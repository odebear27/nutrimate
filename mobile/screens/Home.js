import * as React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

const backgroundImages = {
  Recipes: require("../assets/American.jpeg"),
  Courses: require("../assets/Course.jpeg"),
  RecipesUpload: require("../assets/Japanese_Sushi.jpeg"),
};

function Home({ navigation }) {
  const selections = ["Recipes", "Courses", "RecipesUpload"];
  return (
    <View style={styles.center}>
      {selections.map((selection) => {
        console.log(selection)
        const title = selection === "RecipesUpload" ? `Recipes\nUpload` : selection
        return (
          <TouchableOpacity
            key={selection}
            title={title}
            style={styles.buttonContainer}
            onPress={() => navigation.navigate(selection)}
          >
            <ImageBackground
              source={backgroundImages[selection]}
              style={styles.buttonBackground}
            >
              <Text style={styles.buttonText}>{title}</Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flex: 1,
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

export default Home;

// <View style={styles.center}>
//   <Text>This is the home screen</Text>
//   <Button
//     title="Go to Recipes"
//     onPress={() => navigation.navigate("Recipes")}
//   />
//   <Button
//     title="Go to Courses"
//     onPress={() => navigation.navigate("Courses")}
//   />
//   <Button
//     title="Go to Recipe Upload"
//     onPress={() => navigation.navigate("RecipesUpload")}
//   />
// </View>
