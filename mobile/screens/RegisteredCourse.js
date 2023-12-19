import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import {
  useTheme,
  Switch,
  Button,
  TextInput,
  Dialog,
  Portal,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { AuthContext } from "../contexts/AuthenticateContext";
import axios from "axios";
import { CourseContext } from "../contexts/CourseContext";

function RegisteredCourse({route}) {
  const courseContext = useContext(CourseContext);
  const { reload } = route.params;
  const authContext = useContext(AuthContext);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    getRegisteredCourses();
    courseContext.setRegisteredCourse(false);
  }, [authContext.isLoggedIn, courseContext.hasRegisteredCourse]);

  const getRegisteredCourses = async () => {
    const header = {
      headers: {
        Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
      },
    };

    await axios
      .get(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/course`,
        header
      )
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
        const registeredCourses = response.data;
        setRegisteredCourses(registeredCourses);
        // setRegisteredCourses(registeredCourses);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <View style={styles.center}>      
      <View style={styles.titleView}>
        <Text style={styles.title}>Your Registered Courses</Text>
        <IconButton
        icon="reload"
        iconColor={"#43521A"}
        size={30}
        style={{marginVertical: 15}}
        onPress={getRegisteredCourses}
      />
      </View>
      <ScrollView>
        <View style={styles.displayView}>
          {registeredCourses.map((course, index) => {
            return (
              <Text style={styles.displayList} key={index}>
                {course}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    backgroundColor: "#32363C",
  },
  titleView: {
    marginTop: 20,
    flexDirection: "row",
    rowGap: 5,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
  },
  title: {
    fontSize: 26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    // marginBottom: 5,
  },
  displayView: {
    marginTop: 10,
    flexDirection: "column",
    rowGap: 5,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
    paddingBottom: 100,
  },
  displayList: {
    fontSize: 20,
    color: "white",
    fontWeight: "300",
    textAlign: "justify",
    marginTop: 20,
    marginBottom: 40,
    borderColor: "gray",
    paddingBottom: 15,
    borderBottomWidth: 2,
    // marginBottom: 5,
  }, 
});

export default RegisteredCourse;
