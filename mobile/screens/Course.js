import React, {useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from 'axios';
import { CourseContext } from '../contexts/CourseContext';

const backgroundImages = {
  Chinese: require("../assets/course/cuisine/Chinese.png"),
  French: require("../assets/course/cuisine/French.png"),
  Indian: require("../assets/course/cuisine/Indian.png"),
  Italian: require("../assets/course/cuisine/Italian.png"),
  Japanese: require("../assets/course/cuisine/Japanese.png"),
  Mexican: require("../assets/course/cuisine/Mexican.png"),
  Spanish: require("../assets/course/cuisine/Spanish.png"),
  Taiwanese: require("../assets/course/cuisine/Taiwanese.png"),
}

function Course({navigation}) {
  // const cuisines =['Japanese', "Italian", "American", "Indian"];
  // const [courseCuisines, setCourseCuisines] = useState([]);
  // const [courseList, setCourseList] = useState([]);    
  const [isInProgress, setInProgress] = useState(false);
  const courseContext = useContext(CourseContext);

  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    setInProgress(true);
    await axios
      .get(
        "https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/public/course")
      .then((response) => {
        //reverse the array to display latest review first
        const courseData = response.data;
        console.log("------------Course List-----", courseData);

        const courseCuisines = [];
        courseData.map((course) => {
          const cuisine = courseCuisines.find((courseCuisine) => courseCuisine === course.courseCuisine);
          if(cuisine === undefined){
            courseCuisines.push(course.courseCuisine);
          }
        });
        console.log("------------Course Cuisine List-----", courseCuisines);
        courseContext.setCourseCuisines(courseCuisines);
        courseContext.setCourseList(courseData);
        // setCourseCuisines(courseCuisines);
        // setCourseList(courseData);

        // setReviews(reversedReviews);
        // setPastReviewFlag(true);
        // setPromptMessage("");
      })
      .catch((error) => {
        console.log("Error fetching review: ", error);
        // if(error.response.status == "404"){
        //   setPromptMessage("No reviews for this recipe")
        // }
      });
      setInProgress(false);
  };


  const handleCuisinePress = (cuisine) => {
    const filteredCourseList = courseContext.courseList.filter((course) => course.courseCuisine === cuisine);
    console.log(filteredCourseList);
    navigation.navigate("CourseList", {courseList: filteredCourseList});
  };

  return (
    <View style={styles.center}>
      {isInProgress ? (
        <ActivityIndicator animating={true} color={"#43521A"} size={100} />
      ) : (
        <ScrollView>
          <View style={styles.buttonView}>
            {courseContext.courseCuisines.map((cuisine) => {
              return (
                <TouchableOpacity
                  key={cuisine}
                  title={cuisine}
                  onPress={() => handleCuisinePress(cuisine)}
                  style={styles.buttonContainer}
                >
                  <ImageBackground
                    source={backgroundImages[cuisine]}
                    style={styles.buttonBackground}
                  >
                    <Text style={styles.buttonText}>{cuisine}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",    
    backgroundColor: "#32363C",
  },
  buttonView: {
    flexDirection: "column",
    rowGap: 5,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center",
  },
  buttonContainer: {
    width: '100%',
    height: 220,
    // flex:1,
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
});

export default Course;