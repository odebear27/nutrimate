import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, ImageBackground, } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import MessagePortal from "../components/MessagePortal";
import { AuthContext } from "../contexts/AuthenticateContext";
import Authenticate from "../promises/Authenticate";
import axios from "axios";
import { ProfileContext } from "../contexts/ProfileContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLocalAuthentication from "../components/LocalAuthentication";
import { SecureStoreContext } from "../contexts/SecureStoreContext";
import ActivteAuthDialog from "../components/ActivateAuthDialog";

export default function Login({navigation}) {
  const authContext = useContext(AuthContext);
  const secureStoreContext = useContext(SecureStoreContext);
  const profileContext = useContext(ProfileContext);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isSecureTextInput, setSecureTextInput] = useState(true);
  // const [profile, setProfile] = useState(initProfile);
  const theme = useTheme();  

  const handlerSubmit = () => {
    setDialogVisible(true);
  }; 

  const getUserProfile = ({accessToken, tokenType, role}) => {

    
  };

  const secureAccessToken = ({accessToken}) => {
    return secureStoreContext.saveCredentials("accessToken", accessToken);
    // return new Promise((resolve, reject) => {
    //   secureStoreContext
    //     .saveCredentials("accessToken", accessToken)
    //     .then((outcome) => {
    //       resolve(outcome);
    //     },
    //     (outcome) => {
    //       reject(outcome);
    //     }
    //     );
    // });
  };

  const handlerAuthentication = async () => {
    authContext.setComponentDisabled(true);
    authContext.setInProgress(true);
    let response = null;
    const credentials = JSON.stringify({ username: authContext.credentials.username, password: authContext.credentials.passcode });

    const header = {
      headers: {
      'Content-Type': 'application/json'
      }
    };

    try {
      response = await axios.post("https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/authentication", credentials, header );

      let profilePromise = await profileContext.handlerInitProfile(response.data);

      // const userRole = response.data.roles[0] === 'ROLE_user' ? 
      //                             'customers' : 'admin'

      // let fetchPromise = await getUserProfile({accessToken: response.data.accessToken, tokenType: response.data.tokenType, role: userRole});
      let securePromise = await secureAccessToken({accessToken: response.data.accessToken,});           

      console.log("Login - GET response", response.data);
      console.log("Login - Post JWT Token", response.data.accessToken);
      // console.log("Login - Fetch Profile Status", profilePromise);
      console.log("Login - Secure Token Status: ", securePromise);

      authContext.setAccessToken(response.data.accessToken);
      authContext.handlerRoleChange(response.data.roles);
      authContext.setTokenType(response.data.tokenType);
      authContext.setShowAuthError(false);
      authContext.setAuthErrorMessage("");

      if (
        secureStoreContext.isBiometricSupported &&
        secureStoreContext.isbiometricEnrolled &&
        !secureStoreContext.isbiometricInitiated
      ) {
        console.log("set Dialog visible");
        setDialogVisible(true);

        // authContext.setComponentDisabled(false);
        // authContext.setInProgress(false);        
        // authContext.setLoginStatus(true);
        // navigation.navigate('Profile', {role: userRole});
      }
      else{
        authContext.setComponentDisabled(false);
        authContext.setInProgress(false);        
        authContext.setLoginStatus(true);
      }     

    } catch (error) {
      let errorResponse = error.response;
      let errorMessage = errorResponse.data.message;

      //Need something to catch other errors other than two below
      // 1) Bad Credentials
      // 2) Accoutn locked
      const authErrorMessage =
        errorMessage === "Bad Credentials - Wrong username or password!" ||
        errorMessage === "Your account is blocked as you have exceeded the number of tries." 
          ? errorMessage
          : "Something went wrong";

      authContext.setAccessToken(null);
      authContext.handlerRoleChange("");
      authContext.setTokenType(null);
      authContext.setShowAuthError(true);
      authContext.setAuthErrorMessage(authErrorMessage);
      authContext.setLoginStatus(false);
      authContext.setLogoutStatus(false);      
      authContext.resetCredentials();

      authContext.setComponentDisabled(false);
      authContext.setInProgress(false);

      console.log("GET Login error", errorResponse);
    }
  };

  const handlerForgetPassword = () => {
    navigation.navigate("Reset");
  } 

  const handlerSecureTextInput = () => {
    setSecureTextInput(!isSecureTextInput);
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/login.jpeg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.5 }}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView>
            <View style={styles.main}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              {authContext.isShowAuthError && (
                <View style={styles.errorView}>
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {authContext.authErrorMessage}
                  </Text>
                </View>
              )}
              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  defaultValue=""
                  value={authContext.credentials.username}
                  placeholder="your user ID or email"
                  placeholderTextColor={"gray"}
                  onChangeText={(value) =>
                    authContext.handlerUserNameChange(value)
                  }
                  disabled={authContext.isComponentDisabled}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInput}
                  mode="outlined"
                  defaultValue=""
                  value={authContext.credentials.passcode}
                  placeholder="your password"
                  placeholderTextColor={"gray"}
                  secureTextEntry={isSecureTextInput}
                  right={
                    <TextInput.Icon
                      icon={isSecureTextInput ? "eye-off" : "eye"}
                      onPress={handlerSecureTextInput}
                    />
                  }
                  onChangeText={(value) =>
                    authContext.handlerPasscodeChange(value)
                  }
                  disabled={authContext.isComponentDisabled}
                />
              </View>
              <View style={styles.buttonView}>
                <Button
                  style={{ backgroundColor: "#43521A" }}
                  labelStyle={
                    authContext.isComponentDisabled
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
                  onPress={handlerAuthentication}
                  disabled={authContext.isComponentDisabled}
                >
                  Login
                </Button>
              </View>
              {secureStoreContext.isbiometricInitiated && (
                <CustomLocalAuthentication />
              )}
              <View style={styles.assistView}>
                <Button
                  labelStyle={
                    authContext.isComponentDisabled
                      ? {
                          fontSize: 16,
                          color: "gray",
                          fontWeight: "500",
                        }
                      : {
                          fontSize: 16,
                          color: "#43521A",
                          fontWeight: "900",
                        }
                  }
                  mode="text"
                  onPress={handlerForgetPassword}
                  disabled={authContext.isComponentDisabled}
                >
                  Forget Password?
                </Button>
              </View>
              {authContext.isInProgress && (
                <ActivityIndicator animating={true} color={"white"} />
              )}
              <ActivteAuthDialog
                visibility={isDialogVisible}
                handlerDialogVisible={setDialogVisible}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

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
    marginBottom: 100,
  },
  container: {
    flex: 1,    
    marginTop: 0,
    paddingTop: 0,
    width: "90%",
  },
  main: {
    flex: 1,
    marginTop: 0,
    paddingTop: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: "20%",
  },
  image: {
    width: "100%",
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
  inputView: {
    width: "95%",
    height: 50,
    marginBottom: 5,
    alignItems: "stretch",
  },
  textInput: {
    // height: 50,
    textAlign: "center"
  },
  buttonView: {
    width: "95%",
    height: 50,
    marginTop: 50,
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
