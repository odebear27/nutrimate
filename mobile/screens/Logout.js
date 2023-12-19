import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import LogoutDialog from "../components/LogoutDialog";

function Logout() {

  const [isShowError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isComponentDisabled, setComponentDisabled] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isInProgress, setInprogress] = useState(false);

  const handlerDialogVisible = () => {    
    setComponentDisabled(true);
    setInprogress(true);
    setDialogVisible(true);
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/login.jpeg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.main}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            {isShowError && (
              <View style={styles.errorView}>
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {errorMessage}
                </Text>
              </View>
            )}
            <View style={styles.center}>
              <Text style={styles.textMessage}>You are about to logout!</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={{ backgroundColor: "#43521A" }}
                labelStyle={
                  isComponentDisabled
                    ? {
                        fontSize: 16,
                        color: "gray",
                        fontWeight: "500",
                      }
                    : {
                        fontSize: 16,
                        color: "#fff",
                        fontWeight: "900",
                      }
                }
                mode="contained"
                onPress={handlerDialogVisible}
                disabled={isComponentDisabled}
              >
                Logout
              </Button>
            </View>
            {isInProgress && <ActivityIndicator animating={true} />}
            <LogoutDialog
              visibility={isDialogVisible}
              handlerDialogVisible={setDialogVisible}
              handlerInProgress={setInprogress}
              handlerComponentDisabled={setComponentDisabled}
              handlerErrorMessage={setErrorMessage}
              handlerShowError={setShowError}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",    
    alignItems: "center",  
    marginTop: 0,
    paddingTop: 0,
  },
  backgroundImage: {
    width: "100%",       
    height: "100%",
    alignItems: "center",
    justifyContent: 'center',
  },
  logo: {
    marginTop: 0,
    paddingTop: 0,
    width: 360,       
    height: 140,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: "40%",
  },
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20%",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  errorView: {
    padding: 0,
    width: "95%",
    height: 60,
    marginBottom: 5,
    alignItems: "stretch",
  },
  errorText: {
    padding: 0,
    height: 60,        
    backgroundColor: "#fff",
    opacity: 0.7,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  // errorView: {
  //   width: "85%",
  //   height: 50,
  //   marginBottom: 30,
  //   alignItems: "stretch",
  // },
  // errorText: {
  //   height: 50,
  //   textAlign: "center",
  // },
  inputView: {
    width: "85%",
    height: 50,
    marginBottom: 20,
    alignItems: "stretch",
  },
  textMessage: {
    // height: 50,
    fontSize: 20,
    color: "#43521A",
    fontWeight: "900",
    textAlign: "center"
  },
  buttonView: {
    width: "95%",
    height: 50,
    marginTop: 20,
    marginBottom: 5,
    alignItems: "stretch",
  },
  assistView: {
    width: "85%",
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    // alignItems: "stretch",
  },
});

export default Logout;