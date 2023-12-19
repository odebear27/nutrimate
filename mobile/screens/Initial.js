import * as React from "react";
// import { View, Button, Text, StyleSheet, ImageBackground } from "react-native";
import { StyleSheet, View, Image, ImageBackground, ScrollView, KeyboardAvoidingView } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";

function Initial({navigation}) {
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/login.jpeg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.center}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.buttonContainer}>
            {/* <Text>This is the Initial Screen for Sign In and Register</Text> */}
            <View style={styles.buttonView}>
              <Button
                style={{backgroundColor: "#fff"}}
                labelStyle={{fontSize: 15, color: "#43521A", fontWeight: "900"}}
                mode="contained"
                title="Go to Login"
                onPress={() => navigation.navigate("Login")}
              >Login</Button>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={{backgroundColor: "#fff"}}
                labelStyle={{fontSize: 15, color: "#43521A", fontWeight: "900"}}
                mode="contained"
                title="Go to Login"
                onPress={() => navigation.navigate("Register")}
              >Register</Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",    
    marginTop: 0,
    paddingTop: 0,
  },
  center: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    // justifyContent: "center",
    alignItems: "center",
    // textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 10,
    width: "90%",
    marginTop: "10%",
  },
  buttonView: {
    width: "46%",
    alignItems: "stretch",
  },
  backgroundImage: {
    width: "100%",       
    height: "100%",
    alignItems: "center",
    justifyContent: 'center',
  },
  logo: {
    marginTop: "60%",
    paddingTop: 0,
    width: 360,       
    height: 140,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    alignItems: "center",
    // justifyContent: 'center',
  }
});

export default Initial;