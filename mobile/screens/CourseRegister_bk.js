import {Text,View, Image, TouchableOpacity, Button} from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer, StackActions } from '@react-navigation/native';

const coursePictures = {
  CurryUdon: require("../assets/CurryUdon.jpeg"),
  Soba: require("../assets/Soba.jpeg"),
  Takoyaki: require("../assets/Takoyaki.jpeg"),
}

function CourseRegister({navigation ,route}){

  const {dish} = route.params;

  const HandleCourseRoute = () => {
    navigation.navigate("Japanese-Courses");
  }

    return (
      <ScrollView>
        {/* <Text style={styles.header1}>Japanese</Text> */}
        <Image
          style={styles.imageContainer}
          source={coursePictures[dish]}
        ></Image>
        <View style={styles.mainContainer}>
          <Text style={styles.header1}>{dish}</Text>
          <Text style={styles.body1}>Registration Successful. Thank you!</Text>

          <View style={styles.button1}>
            <TouchableOpacity
              style={{ width: "100%", alignItems: "stretch"}}
              onPress={HandleCourseRoute}
            >
              <Text style={styles.buttonText}>View more courses</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );



}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "lightgray",
    // alignItems: "center",  
    // marginTop: 0,
    // paddingTop: 0,
    // padding: 0,
    // margin: 0,

  },
    container: {
      flex: 1,
  
    },
    imageContainer: {
        height: 230,
        width:"100%",
    },
    header1: {
        fontSize: 45,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'left',
        // color: '#344B3A'
        color: '#43521A'
    },
    body1: {
        fontSize: 22,
        fontWeight: "600",
        // marginVertical: 10,
        marginBottom: 80,
        textAlign: 'left',
        // color: '#344B3A'
        color: 'black'
    },
    button1:{
        // marginLeft:50,
        // marginRight:50,
        // marginTop:30,
        marginBottom:200,
        // backgroundColor: '#344B3A',
        backgroundColor: '#43521A',
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius:20,
        width: "100%"
    },
    buttonText:{
        fontSize: 25,
        fontWeight: '500',
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
    }
  
  });



export default CourseRegister;