import React, {useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView,Image, } from "react-native";
import { useTheme, Switch, Button, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import CourseRegisterDialog from '../components/CourseRegisterDialog';
import { AuthContext } from '../contexts/AuthenticateContext';
import axios from 'axios';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const backgroundImages = {
  even: require("../assets/course/Course_even.png"),
  odd: require("../assets/course/Course_odd.png"),
}

function CourseRegister({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const theme = useTheme();
  const { courseParam, index } = route.params;
  const [isAlternate, setAlternate] = useState(false);
  const [isInProgress, setInProgress] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isRegistered, setRegisterStatus] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [isShowError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    setCourseDetails(courseParam);
    handleCourseRegistration();
  }, []);

  const handleCourseRegistration = async () => {
    setInProgress(true);
    index % 2 === 0 ? setAlternate(false) : setAlternate(true);

    const month = new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : `${new Date().getMonth()+1}`
    const todayDate = new Date().getDate() < 10 ? `0${new Date().getDate()}` : `${new Date().getDate()}`

    const nowDate = `${new Date().getFullYear()}-${month}-${todayDate}`;

    const registerDate = JSON.stringify({courseDate: nowDate});
    console.log("----register  Date----", registerDate);

    const header = {
      headers: {
        Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    await axios
      .post(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/course/${courseParam.courseId}`,
        registerDate,
        header
      )
      .then((response) => {
        console.log(response.status);
        setShowError(false);
        setErrorMessage("");
        setRegisterStatus(true);
        setPromptMessage(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setRegisterStatus(false);
        setPromptMessage("");
        setShowError(true);
        setErrorMessage("Something went wrong. Please try to register again.");
        // if(error.response.status == "404"){
        //   setPromptMessage("No reviews for this recipe")
        // }
      });
    setInProgress(false);
  };

  const handlerRegister = () => {
    navigation.navigate("CourseRegister", { courseDetails: courseDetails });
  };

  return (
    <View style={styles.mainContainer}>
      {isInProgress ? (
        <ActivityIndicator animating={true} color={"#43521A"} size={100} />
      ) : (
      <ScrollView>
        <View style={styles.bannerView}>
          {!isAlternate ? (
            <ImageBackground
              style={styles.bannerStyle}
              source={backgroundImages["even"]}
            >
              <Text style={styles.bannerText}>{courseDetails.courseName}</Text>
            </ImageBackground>
          ) : (
            <ImageBackground
              style={styles.bannerStyle}
              source={backgroundImages["odd"]}
            >
              <Text style={styles.bannerText}>{courseDetails.courseName}</Text>
            </ImageBackground>
          )}
        </View>

        {isRegistered && (
          <View style={styles.promptView}>
            <Text style={[styles.promptText, { color: "#fff" }]}>
              {promptMessage}
            </Text>
          </View>
        )}

         {isShowError && (
          <View style={styles.errorView}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {errorMessage}
            </Text>
          </View>
        )}
        
        {/*
        <View style={styles.container}>
          <Text style={styles.heading}>Course Month</Text>
          <Text style={styles.text}>{courseDetails.courseMonth}</Text>
          <Text style={styles.heading}>Course Difficulty</Text>
          <Text style={styles.text}>{courseDetails.courseDifficulty}</Text>
          <Text style={styles.heading}>Course Description</Text>
          <Text style={styles.text}>{courseDetails.courseDesc}</Text>
        </View>

        <View style={styles.buttonView}>
          <Button
            style={styles.buttonStyle}
            contentStyle={{ height: 60, padding: 0, fontSize: 30, maring: 0 }}
            labelStyle={
              isRegisterDisabled
                ? {
                    fontSize: 30,
                    lineHeight: 30,
                    color: "gray",
                    fontWeight: "500",
                  }
                : {
                    fontSize: 30,
                    lineHeight: 30,
                    color: "#fff",
                    fontWeight: "900",
                  }
            }
            mode="contained"
            onPress={handlerRegister}
            disabled={isRegisterDisabled}
          >
            Register
          </Button>
        </View> */}
      </ScrollView>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    // padding: 20,
    backgroundColor: "#32363C",
    alignItems: "stretch",
    // marginTop: 0,
    // paddingTop: 0,
    // padding: 0,
    // margin: 0,
  },
  bannerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerView: {
    padding: 0,
    margin: 0,
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
  },
  bannerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "white",
  },
  errorView: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    // height: 60,
    alignItems: "stretch",
  },
  errorText: {
    padding: 0,
    // height: 60,
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  promptView: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    // height: 60,
    alignItems: "stretch",
  },
  promptText: {
    padding: 0,
    // height: 60,
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    // color: "#344B3A",
    color: "#43521A",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    color: "#fff",
    borderColor: "gray",
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 22,
    color: "#fff",
    // fontWeight: "400",
  },
  buttonView: {
    // width: "100%",
    paddingHorizontal: 20,
    // height: 60,
    marginTop: 40,
    marginBottom: 100,
    alignItems: "stretch",
  },
  buttonStyle: {
    backgroundColor: "#43521A",
    height: 70,
    justifyContent: 'center',
    alignItems: "center",
  }
  // container: {
  //   flex: 1,
  // },
  // imageContainer: {
  //   padding: 0,
  //   margin: 0,
  //   height: 200,
  //   width: "100%",
  // },
  // header1: {
  //   fontSize: 40,
  //   fontWeight: "bold",
  //   // marginVertical: 10,
  //   marginBottom: 40,
  //   textAlign: "left",
  //   // color: '#344B3A'
  //   color: "#43521A",
  // },
  // header2: {
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   // marginVertical: 10,
  //   marginBottom: 10,
  //   textAlign: "left",
  //   // color: '#344B3A'
  //   color: "#43521A",
  // },
  // header3: {
  //   fontSize: 25,
  //   fontWeight: "bold",
  //   marginVertical: 10,
  //   textAlign: "left",
  //   // color: '#344B3A'
  //   color: "#43521A",
  // },
  // body1: {
  //   fontSize: 20,
  //   fontWeight: "500",
  //   // marginVertical: 10,
  //   marginBottom: 40,
  //   textAlign: "left",
  //   // color: '#344B3A'
  //   color: "black",
  // },
  // button1: {
  //   // marginLeft:70,
  //   // marginRight:70,
  //   // marginTop:30,
  //   // marginBottom:30,
  //   backgroundColor: "#43521A",
  //   // flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderRadius: 20,
  //   width: "100%",
  // },
  // buttonText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   marginVertical: 10,
  //   textAlign: "center",
  //   color: "white",
  // },
});



export default CourseRegister;