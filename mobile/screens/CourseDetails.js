import React, {useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView,Image, } from "react-native";
import { useTheme, Switch, Button, TextInput, Dialog, Portal, ActivityIndicator } from "react-native-paper";
import CourseRegisterDialog from '../components/CourseRegisterDialog';
import { AuthContext } from '../contexts/AuthenticateContext';
import axios from 'axios';
import { CourseContext } from '../contexts/CourseContext';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const backgroundImages = {
  even: require("../assets/course/Course_even.png"),
  odd: require("../assets/course/Course_odd.png"),
}

function CourseDetails({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const courseContext = useContext(CourseContext);
  const theme = useTheme();  
  const { courseParam, index } = route.params;  
  const [isInProgress, setInProgress] = useState(false);
  const [isAlternate, setAlternate] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isRegisterDisabled, setRegisterDisable] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");  
  const [isRegistered, setRegisterStatus] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    setCourseDetails(courseParam);
    handleCourseDetails();
  }, []);

  const checkCourseRegistrationStatus = async (courseName) =>{

    let hasRegistered = false;

    const header = {
      headers: {
        Authorization: `${authContext.tokenType} ${authContext.accessToken}`
      },
    };

    await axios
      .get(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/course`, header
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        const registeredCourses = response.data;
        const foundCourseName = registeredCourses.find((regCourseName) => regCourseName === courseName);
        console.log("---foundCourseName---",foundCourseName);
        foundCourseName !== undefined ? hasRegistered=true : hasRegistered=false;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

      return hasRegistered;
  }

  const getRegisteredCourse = async() => {
    const header = {
      headers: {
        Authorization: `${authContext.tokenType} ${authContext.accessToken}`
      },
    };
    await axios
      .get(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/course`, header
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        const registeredCourses = response.data;
        courseContext.setRegisteredCourseList(registeredCourses);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  const handleCourseDetails = async () => {
    setInProgress(true);

    index % 2 === 0 ? setAlternate(false) : setAlternate(true);
    const courseMonth =
      months.findIndex((month) => month === courseParam.courseMonth) + 1;
    console.log("---Course Month---", courseMonth);
    const currentMonth = new Date().getMonth() + 1;
    console.log("---Current Month---", currentMonth);

    const hasRegistered = await checkCourseRegistrationStatus(courseParam.courseName);

    console.log("---has registered----", hasRegistered);

    if(hasRegistered){
      setPromptMessage("You have already registered for this course.");
      setRegisterDisable(true);
    }
    else if(courseMonth <= currentMonth){
      setPromptMessage("Registration has closed for this course. \nPlease wait for the next available date.");
      setRegisterDisable(true);
    }
    else if(courseMonth < currentMonth+2){
      setPromptMessage("Registration for a course needs to be at least 2 months in advanced.");
      setRegisterDisable(true);
    }
    else{
      setPromptMessage("");
      setRegisterDisable(false);
    }

    setInProgress(false);

  };

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
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/course/${courseDetails.courseId}`,
        registerDate,
        header
      )
      .then((response) => {
        console.log(response.status);
        setShowError(false);
        setRegisterStatus(true);
        setPromptMessage(response.data);
        setDialogVisible(true);
        setRegisterDisable(true);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setShowError(true);
        setRegisterStatus(false);
        setPromptMessage("Something went wrong. Please try to register again.");
        setDialogVisible(true);        
        setRegisterDisable(false);
        // if(error.response.status == "404"){
        //   setPromptMessage("No reviews for this recipe")
        // }
      });
    setInProgress(false);
  };

  const handlerRegister = () => {
    if(isRegistered){
      courseContext.setRegisteredCourse(true);
      navigation.navigate("Courses");
    }      
  }

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

        {isRegisterDisabled && (
          <View style={styles.errorView}>
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
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
            onPress={handleCourseRegistration}
            disabled={isRegisterDisabled}
          >
            Register
          </Button>
        </View>

        {/* <Text style={styles.header1}>Japanese</Text> */}

        {/* <View style={styles.mainContainer}>
          <Text style={styles.header1}>{dish}</Text>
          <Text style={styles.header2}>Course Description</Text>
          <Text style={styles.body1}>
            Learn to make a delicious {dish} in this course
          </Text>
          <Text style={styles.header2}>Course Difficulty</Text>
          <Text style={styles.body1}>Beginner</Text>
          <Text style={styles.header2}>Course Month</Text>
          <Text style={styles.body1}>September</Text>

          <View style={styles.button1}>
            <TouchableOpacity
              style={{ width: "95%", alignItems: "stretch" }}
              onPress={() => {
                navigation.navigate("Course-Register", { dish });
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </ScrollView>
      )}
      <CourseRegisterDialog
          visibility={isDialogVisible}
          promptMessage={promptMessage}
          isError={isShowError}
          handlerRegister={handlerRegister}
          handlerDialogVisible={setDialogVisible}
        />
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

export default CourseDetails;