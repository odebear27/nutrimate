import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import React, { useContext, useState } from "react";
import MessagePortal from "../components/MessagePortal";
import { AuthContext } from "../contexts/AuthenticateContext";
import Authenticate from "../promises/Authenticate";
import axios from "axios";
import { ProfileContext } from "../contexts/ProfileContext";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm, Controller } from 'react-hook-form';

const resetData = {
    username: "",
}

export default function Reset({navigation}) {
  const [isInProgress, setInProgress] = useState(false);
  const [isComponentDisabled, setComponentDisabled] = useState(false);  
  const [isDialogVisible, setDialogVisible] = useState(false);  
  const [isResetError, setResetError] = useState(false);
  const [resetErrorMsg, setResetErrorMsg] = useState("");
  const [username, setUsername] = useState(resetData);
  const theme = useTheme();

  const { register, setValue, handleSubmit, control, reset, formState: { errors }, } = useForm({ mode: "onBlur" });

  const handlerSentEmail = async (data) => {

    console.log(data);

    setResetErrorMsg("");
    setResetError(false);
    setInProgress(true);
    setComponentDisabled(true);
    
    try {
        response = await axios.post(`https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/public/forgetpassword?username=${data.username}`);

        setDialogVisible(true);
        setInProgress(false);
        setComponentDisabled(false);

    } catch (error) {

        console.log(error.response.data.message);
        let errorMessage = error.response.data.message;

        setResetErrorMsg(errorMessage);
        setResetError(true);
        setInProgress(false);
        setComponentDisabled(false);
        
    }   
  };

  const setNavigation = () => {
    navigation.navigate("Login");
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
              {isInProgress && <ActivityIndicator animating={true} />}
              {isResetError && (
                <View style={styles.errorView}>
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {resetErrorMsg}
                  </Text>
                </View>
              )}
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel, { color: "#43521A" }]}
                  variant="bodyLarge"
                >
                  Reset Password
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="Your userID or email address"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="username"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.username && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.username.message}
                  </Text>
                )}
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
                  onPress={handleSubmit(handlerSentEmail)}
                  disabled={isComponentDisabled}
                >
                  submit
                </Button>
              </View>
              <MessagePortal
                visibility={isDialogVisible}
                setNavigation={setNavigation}
                handlerDialogVisible={setDialogVisible}
                data={username}
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
    marginBottom: "30%",
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
  //   width: "90%",
  //   height: 50,
  //   marginBottom: 10,
  //   alignItems: "stretch",
  // },
  // errorText: {
  //   height: 50,
  //   textAlign: "center",
  // },
  inputView: {
    width: "95%",
    marginBottom: 10,
    alignItems: "stretch",
  },
  textLabel: {
    height: 30,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "left",
    marginBottom: 2,
  },
  textInput: {
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "left",
  },
  buttonView: {
    width: "95%",
    height: 50,
    marginTop: 10,
    alignItems: "stretch",
  },
});
