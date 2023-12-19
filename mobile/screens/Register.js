import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import React, { useContext, useState } from "react";
import MessagePortal from "../components/MessagePortal";
import { AuthContext } from "../contexts/AuthenticateContext";
import Authenticate from "../promises/Authenticate";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';

// const initProfile = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     contactNo: "",
//     userID: "",
//     password: "",
// }

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
// const emailRegex = /\S+@\S+\.\S+/;

export default function Register({navigation}) {
  // const authContext = useContext(AuthContext);
  // const [profile, setProfile] = useState(initProfile);
  // const [isDialogVisible, setDialogVisible] = useState(false);  
  const [isInProgress, setInProgress] = useState(false);
  const [isComponentDisabled, setComponentDisabled] = useState(false);
  const [isRegisterError, setRegisterError] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");    
  const [isSecureTextInput, setSecureTextInput] = useState(true);    
  // const [profile, setProfile] = useState(initProfile);
  const theme = useTheme();  

  // const handlerSubmit = () => {
  //   setDialogVisible(true);
  // };

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: 'onBlur'});  

  console.log('errors', errors);

  const handlerRegister = async (data) => {

    setComponentDisabled(true);
    setInProgress(true);

    let response = null;

    const registration = JSON.stringify(data);
    
    const header = {
      headers: {
      'Content-Type': 'application/json'
      }
    };

    try {
      response = await axios.post("https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/public/create", registration, header );
      
      setComponentDisabled(false);
      setInProgress(false);
      setRegisterError(false);
      // setProfile(initProfile);

      navigation.navigate('Initial');

      console.log("Register - POST response", response);

    } catch (error) {
      let errorResponse = error.response;
      const errorResponseData = errorResponse.data;

      if (errorResponseData.userIDExist || errorResponseData.emailExist) {
        const errorMsg = errorResponseData.userIDExist
          ? errorResponseData.emailExist
            ? "UserID and Email has already been registered"
            : "UserID has already been registered"
          : "Email has already been registered";
          setRegErrorMsg(errorMsg);
      } else {
        setRegErrorMsg("Something went wrong. Please try again");
      }      

      setComponentDisabled(false);
      setInProgress(false);
      setRegisterError(true);
      // setProfile(initProfile);

      console.log("Register error", errorResponse);
      console.log("Register error", errorResponse.data);
    }
  };

  // const handlerFirstNameChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     firstName: value,
  //   });
  // };

  // const handlerLastNameChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     lastName: value,
  //   });
  // };

  // const handlerEmailChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     email: value,
  //   });
  // };

  // const handlerContactNumberChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     contactNo: value,
  //   });
  // };

  // const handlerUserIDChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     userID: value,
  //   });
  // };

  // const handlerPasswordChange = (value) => {
  //   setProfile({
  //     ...profile,
  //     password: value,
  //   });
  // }; 

  const handlerSecureTextInput = () => {
    setSecureTextInput(!isSecureTextInput);
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/login.jpeg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.35 }}
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
              {isInProgress && <ActivityIndicator animating={true} color={"white"} />}
              {isRegisterError && (
                <View style={styles.errorView}>
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {regErrorMsg}
                  </Text>
                </View>
              )}
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel]}
                  variant="bodyLarge"
                >
                  First Name
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your first name"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="firstName"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.firstName && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.firstName.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel]}
                  variant="bodyLarge"
                >
                  Last Name
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your last name"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="lastName"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.lastName && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.lastName.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel, ]}
                  variant="bodyLarge"
                >
                  Email
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your email address"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: emailRegex,
                      message: "Valid email is requried",
                    },
                  }}
                />
                {errors.email && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.email.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel, ]}
                  variant="bodyLarge"
                >
                  Contact Number
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your mobile contact number"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="contactNo"
                  // rules={{ required: {value: true, message: "This field is required"} }}
                />
                {errors.contactNo && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.contactNo.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel, ]}
                  variant="bodyLarge"
                >
                  User ID
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your unique user ID"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="userID"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.userID && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.userID.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={[styles.textLabel, ]}
                  variant="bodyLarge"
                >
                  Password
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="your password"
                      placeholderTextColor={"#43521A"}
                      secureTextEntry={isSecureTextInput}
                      right={
                        <TextInput.Icon
                          icon={isSecureTextInput ? "eye-off" : "eye"}
                          onPress={handlerSecureTextInput}
                        />
                      }
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="password"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                />
                {errors.password && (
                  <Text style={{ color: theme.colors.error, fontStyle: "italic", fontWeight: "800" }}>
                    {errors.password.message}
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
                  onPress={handleSubmit(handlerRegister)}
                  disabled={isComponentDisabled}
                >
                  Register
                </Button>
              </View>
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
    marginBottom: 20,
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
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
  //   width: "95%",
  //   height: 50,
  //   marginBottom: 30,
  //   alignItems: "stretch",
  // },
  // errorText: {
  //   height: 50,
  //   textAlign: "center",
  // },
  inputView: {
    width: "95%",
    marginBottom: 20,
    alignItems: "stretch",
  },
  textLabel: {
    height: 30,
    color: "#43521A",
    fontWeight: "900",
    textAlign: "left",    
    marginBottom: 2,
  },
  textInput: {       
    justifyContent:"center",
    textAlignVertical: "center",
    textAlign: "left",
  },
  buttonView: {
    width: "95%",
    height: 50,
    marginTop: 20,
    marginBottom: 100,
    alignItems: "stretch",
  },
});
