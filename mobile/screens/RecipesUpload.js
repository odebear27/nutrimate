import React, {useContext, useState, useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from "../contexts/AuthenticateContext";
import { ProfileContext } from "../contexts/ProfileContext";
import axios from "axios";
import { Camera, CameraType } from 'expo-camera';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from '../firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

function RecipesUpload({navigation}) {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  const [recipeName, setRecipeName] = useState("");
  const [readyInMinutes, setReadyInMinutes] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isInProgress, setInProgress] = useState(false);  
  const [isComponentDisabled, setComponentDisabled] = useState(false);
  const [isUploadError, setUploadError] = useState(false);
  const [uploadErrorMsg, setUploadErrorMsg] = useState("");
  const theme = useTheme();      

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);

  const [imagePickerImage, setImagePickerImage] = useState(null);

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: 'onBlur'});
  
  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    }
    requestCameraPermission();
  }, []);

  const pickImage = async () => {
    console.log("Choose Image button pressed");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      maxWidth: 10,
      maxHeight: 10,
      quality: 0,
    });

    console.log("result", result);

    if (!result.canceled) {
      setImagePickerImage(result.assets[0].uri);
    }

  }

  const takePicture = async () => {
    try {
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
    if (camera) {
      const data = await camera.takePictureAsync({
        quality: 0,
        maxWidth: 10,
        maxHeight: 10,
        // base64: true,
        // exif: true,
      });
      console.log("camera image uri:", data.uri);
      setImagePickerImage(data.uri);
      // console.log("image value", image);
    }
  } catch (error) {
    console.log("Error taking picture: ", error);
  }
};

  const retakePicture = async () => {
    setImagePickerImage(null);
  }

  // const username = authContext.credentials.username;
  const username = profileContext.profile.username;
  // const filename = imagePickerImage.substring(imagePickerImage.lastIndexOf('/') + 1);

  const uploadImageUrl = async (username, recipeName, filename, imageUri) => {
    
    console.log(profileContext.profile.username);
    try{
      console.log("log credentials", authContext.credentials);
      console.log("Current user is ", username);
      
      const { uri } = await FileSystem.getInfoAsync(imagePickerImage);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      // const filename = imagePickerImage.substring(imagePickerImage.lastIndexOf('/') + 1);
      // const ref = firebase.storage().ref().child(filename);

      const storage = getStorage(app);
      const storageRef = ref(storage, `mobile_images/${username}/${recipeName}_${filename}`);

      // await storageRef.put(blob);
      

      console.log("getting ready to upload image to firebase cloud storage");

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded imagePickerImage to firebase cloud storage!');
      });
      setImagePickerImage(null);

    } catch (error) {
      console.log("Error uploading image to firebase cloud storage: ", error);
    }
  };

  const handleUpload = async (data) => {
    const recipeName = data.title;
    const filename = imagePickerImage.substring(imagePickerImage.lastIndexOf('/') + 1);
    uploadImageUrl(username, recipeName, filename, imagePickerImage);

    // After uploading, you can save the URL to Firestore
    const imageURL = `gs://nutrimate-2023.appspot.com/mobile_images/${username}/${recipeName}_${filename}`;
    
    data.imageURL = imageURL; 
    console.log("data: ", data);

    setComponentDisabled(true);
    setInProgress(true);

    let response = null;

    const upload = JSON.stringify(data);
    
    // console.log(data);
    
    const header = {
      headers: {        
        'Content-Type': 'application/json',
        Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
      },
    };

    try {
      response = await axios.post("https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/recipe", upload, header );
      
      setComponentDisabled(false);
      setInProgress(false);
      setUploadError(false);
      // setProfile(initProfile);

      navigation.navigate('Recipes');

      console.log("Register - POST response", response);

      // Reset the form after successful upload
      reset({
        title: "",
        readyInMinutes: "",
        summary: "",
        cuisines: "",
      });
      
      setImagePickerImage(null);

      // Manually clear errors (if any)
      clearErrors();

    } catch (error) {
      let errorResponse = error.response;
      const errorResponseData = errorResponse.data;

      setUploadErrorMsg("Something went wrong. Please try again");

      setComponentDisabled(false);
      setInProgress(false);
      setUploadError(true);
      // setProfile(initProfile);

      console.log("Upload error", error);
      console.log("Register error", errorResponse.data);
    }

  };

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
              {isInProgress && (
                <ActivityIndicator animating={true} color={"white"} />
              )}
              {isUploadError && (
                <View style={styles.errorView}>
                  <Text
                    style={[styles.errorText, { color: theme.colors.error }]}
                  >
                    {uploadErrorMsg}
                  </Text>
                </View>
              )}
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="Recipe name"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="title"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.title && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontStyle: "italic",
                      fontWeight: "800",
                    }}
                  >
                    {errors.title.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="preparation time in minutes"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="readyInMinutes"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.readyInMinutes && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontStyle: "italic",
                      fontWeight: "800",
                    }}
                  >
                    {errors.readyInMinutes.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="Recipe description"
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="summary"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.summary && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontStyle: "italic",
                      fontWeight: "800",
                    }}
                  >
                    {errors.summary.message}
                  </Text>
                )}
              </View>
              <View style={styles.inputView}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.textInput}
                      mode="outlined"
                      defaultValue=""
                      value={value}
                      placeholder="the type of cuisine e.g. Japanese, Italian etc."
                      placeholderTextColor={"#43521A"}
                      onChangeText={(value) => onChange(value)}
                      onBlur={onBlur}
                      disabled={isComponentDisabled}
                    />
                  )}
                  name="cuisines"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                />
                {errors.cuisines && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontStyle: "italic",
                      fontWeight: "800",
                    }}
                  >
                    {errors.cuisines.message}
                  </Text>
                )}
              </View>
              <View style={styles.cameraContainer}>
              {image && image.length > 0? 
              <Image source={{uri: image}} style={{width: 200, height: 200}}/> 
              : <Camera 
                  ref={ref => setCamera(ref)}
                  style={styles.fixedRatio} 
                  type={type}
                  ratio={'1:1'} 
                />}
       
    </View>
    {/* <View style={styles.buttonView}>
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
            onPress={handleSubmit(
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            )}
            disabled={isComponentDisabled}
            >Flip Image
     </Button>
    </View> */}
    { imagePickerImage && imagePickerImage.length > 0 ? <View style={styles.buttonView}>
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
      onPress={retakePicture} 
    >Retake Picture</Button>
     </View> : <View style={styles.buttonView}>
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
      onPress={handleSubmit(takePicture)} 
    >Take Picture</Button>
     </View>}
     
     
     
     {imagePickerImage && <Image source={{uri: imagePickerImage}} style={{width: 200, height: 200}}/>}
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
                    onPress={
                      handleSubmit(pickImage)
                    }
                    disabled={isComponentDisabled}
                    name="imageURL"
                  >
                  Choose Image
                </Button>
                  
              
                
              </View>
              
              <View style={styles.buttonView}>
                <Button
                  style={{ backgroundColor: "#43521A" }}
                  labelStyle={
                    isComponentDisabled
                      ? {
                          fontSize: 18,
                          color: "gray",
                          fontWeight: "500",
                        }
                      : {
                          fontSize: 18,
                          color: "#fff",
                          fontWeight: "900",
                        }
                  }
                  mode="contained"
                  onPress={handleSubmit(handleUpload)}
                  disabled={isComponentDisabled}
                >
                  Upload Recipe
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
    marginTop: 30,
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
    marginBottom: 20,
    alignItems: "stretch",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
},
fixedRatio:{
    flex: 1,
    aspectRatio: 1
}
});

export default RecipesUpload;
