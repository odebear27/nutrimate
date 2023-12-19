import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from "react-native";



const backgroundImages = {
  CurryUdon: require("../assets/CurryUdon.jpeg"),
  Soba: require("../assets/Soba.jpeg"),
  Takoyaki: require("../assets/Takoyaki.jpeg"),
}

function JapaneseCourse({navigation}) {


  const dishes =[ "Soba", "Takoyaki","CurryUdon",];


  return (
      <View style={styles.center}>
      {dishes.map((dish) => {
        return (
          <TouchableOpacity
            style={styles.buttonSize}
            key={dish}
            title={dish}
            onPress={()=>{ navigation.navigate("CourseDetails",{dish});}}>
            <ImageBackground source={backgroundImages[dish]} style={styles.buttonBackground}>
              <Text style={styles.buttonText}>{dish}</Text>
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
  buttonSize:{
    height:250,
    width:410,
  },
  
});

export default JapaneseCourse;