import React, {useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const backgroundImages = {
  even: require("../assets/course/Course_even.png"),
  odd: require("../assets/course/Course_odd.png"),
}

function CourseList({ route, navigation }) {
  const [filteredCourseList, setFilteredCourseList] = useState([]);
  // const [isCustomerRecipe, setIsCustomerRecipe] = useState(true);
  // const [recipeDetails, setRecipeDetails] = useState(initRecipeDetails);  
  // const [isInProgress, setInProgress] = useState(false);
  const { courseList } = route.params;

  useEffect(() => {
    setFilteredCourseList(courseList);
  }, []);

  const handlerCourseDetails = ({course, index}) => {
    // console.log(index);
    navigation.navigate("CourseDetails", {courseParam: course, index: index});
  }

  return (
    <View style={styles.center}>
      <ScrollView>
        <View style={styles.buttonView}>
          {filteredCourseList.map((course, index) => {
            return (
              <TouchableOpacity
                key={course.courseId}
                title={course.courseId}
                onPress={() => handlerCourseDetails({course, index})}
                style={styles.buttonContainer}
              >
             {index%2 === 0 ? 
                <ImageBackground
                  source={backgroundImages["even"]}
                  style={styles.buttonBackground}
                >
                  <Text style={styles.buttonTextTop}>{course.courseName}</Text>
                  <Text style={styles.buttonTextBottom}>{`- ${course.courseMonth} -`}</Text>
                </ImageBackground> :
                <ImageBackground
                source={backgroundImages["odd"]}
                style={styles.buttonBackground}
              >
                <Text style={styles.buttonTextTop}>{course.courseName}</Text>
                <Text style={styles.buttonTextBottom}>{`- ${course.courseMonth} -`}</Text>
              </ImageBackground>
            }
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
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
  buttonTextTop: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  buttonTextBottom: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CourseList;