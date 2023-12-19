import { StyleSheet, View, Image, ScrollView, ImageBackground, } from "react-native";
import { useTheme, Switch, Button, Text, TextInput, Dialog, Portal, ActivityIndicator, Avatar } from "react-native-paper";
import { useEffect, useContext, useState, Fragment } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Authenticate from "../promises/Authenticate";
import axios from "axios";
import { AuthContext } from "../contexts/AuthenticateContext";
import { ProfileContext } from "../contexts/ProfileContext";

// const initProfile = {
//     username: "",
//     firstname: "",
//     lastname: "",
//     email: "",
// }

function Profile({navigation, route}) {  
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);
  // const [profile, setProfile] = useState(initProfile);
  const { role } = route.params; 

  const getProfile = () => {
    if (authContext.isLoggedIn && profileContext.profile.username == "") {
      const url = role
        ? `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/${role}/profile`
        : `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/${authContext.credentials.role}/profile`;

      console.log(url);
      axios
        .get(url, {
          headers: {
            Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
          },
        })
        .then(({ data }) => {
          profileContext.handlerProfileChange({ data });
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if(authContext.credentials.role !== "" || role){
      getProfile();
    }      
  }, [authContext.isLoggedIn, authContext.accessToken, role, authContext.credentials.role]);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/login.jpeg")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.8 }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.main}>
            <Avatar.Text
              size={150}
              label={profileContext.profile.initial}
              color={"#fff"}
              style={{ backgroundColor: "#43521A" }}
            />
            {profileContext.profile.firstname === "" && profileContext.profile.lastname === "" ? (
                <ActivityIndicator animating={true} />
              ) : 
              <View style={styles.avatarTextView}>
                <Ionicons name={"person-sharp"} size={40} color={"#43521A"} />
                <Text
                  style={styles.avatarText}
                >{`${profileContext.profile.firstname}, ${profileContext.profile.lastname}`}</Text>
              </View>
            }
            {profileContext.profile.email === "" ? (
                <ActivityIndicator animating={true} />
              ) : 
                <View style={styles.profileTextView}>
                  <MaterialCommunityIcons name={"email-outline"} size={40} color={"#43521A"} />
                  <Text
                    style={styles.profileText}
                  >{profileContext.profile.email}</Text>
                </View>
            }
            {profileContext.profile.contactNo === "" ? (
                <ActivityIndicator animating={true} />
              ) : 
                <View style={styles.profileTextView}>
                  <MaterialCommunityIcons name={"cellphone-sound"} size={40} color={"#43521A"} />
                  <Text
                    style={styles.profileText}
                  >{profileContext.profile.contactNo}</Text>
                </View>
            }
            {/* <Image
              source={require("../assets/defaultprofile.png")}
              style={styles.image}
            /> */}
            {/* <View style={styles.userNameView}>
              {profileContext.profile.username === "" ? (
                <ActivityIndicator animating={true} />
              ) : (
                <Text
                  style={[styles.userNameText, { color: "gray" }]}
                  variant="headlineSmall"
                >
                  {profileContext.profile.username}
                </Text>
              )}
            </View> */}
            {/* <View style={styles.mainProfileView}>
              <View style={{ width: "50%" }}>
                <Text
                  style={{ textAlign: "right", marginRight: 10 }}
                  variant="titleMedium"
                >
                  First name:
                </Text>
              </View>
              {profileContext.profile.firstname === "" ? (
                <ActivityIndicator animating={true} />
              ) : (
                <View style={{ width: "50%" }}>
                  <Text style={{ textAlign: "left" }} variant="titleMedium">
                    {profileContext.profile.firstname}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.mainProfileView}>
              <View style={{ width: "50%" }}>
                <Text
                  style={{ textAlign: "right", marginRight: 10 }}
                  variant="titleMedium"
                >
                  Last name:
                </Text>
              </View>
              {profileContext.profile.lastname === "" ? (
                <ActivityIndicator animating={true} />
              ) : (
                <View style={{ width: "50%" }}>
                  <Text style={{ textAlign: "left" }} variant="titleMedium">
                    {profileContext.profile.lastname}
                  </Text>
                </View>
              )}
            </View> */}
            {/* <View style={styles.ProfileTextView}>
              <View style={{ width: "95%" }}>
                <Text
                  style={{ textAlign: "right", marginRight: 10 }}
                  variant="titleMedium"
                >
                  Email:
                </Text>
              </View>
              {profileContext.profile.email === "" ? (
                <ActivityIndicator animating={true} />
              ) : (
                <View style={{ width: "95%" }}>
                  <Text style={{ textAlign: "left" }} variant="titleMedium">
                    {profileContext.profile.email}
                  </Text>
                </View>
              )}
            </View> */}
          </View>
        </ScrollView>
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
  avatarTextView: {
    flex: 1,
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-evenly",
    alignItems: "center",    
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
    padding: 20,
    marginTop: "10%"
  },
  avatarText: {
    // marginTop: 30,
    fontSize: 24,
    fontWeight: "800",
    textAlignVertical: "center",
    textAlign: "left",
    color: "#43521A",
    marginBottom: 0,
  },
  profileTextView: {
    flex: 1,    
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-evenly",
    alignItems: "center",    
    width: "95%",
    backgroundColor: "#fff",
    opacity: 0.7,    
    paddingTop: 5,
    paddingBottom: 5,
    padding: 20,
    marginTop: "10%"
  },
  profileText: {
    // marginTop: 30,
    fontSize: 24,
    fontWeight: "800",
    textAlignVertical: "center",
    textAlign: "left",
    color: "#43521A",
    marginBottom: 0,
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
    marginBottom: 10,
  },
  userNameView: {
    width: "85%",
    height: 50,
    marginBottom: 30,
    alignItems: "stretch",
  },
  userNameText: {
    height: 50,
    textAlign: "center",
  },
  mainProfileView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  // profileView: {
  //   flexDirection: 'row',
  // },
  // profileText: {
  //   width: "40%",
  //   height: 50,
  //   marginBottom: 20,
  //   alignItems: "stretch",
  // },
  // profileValue: {
  //   width: "50%",
  //   height: 50,
  //   marginBottom: 20,
  //   alignItems: "stretch",
  // },
});

export default Profile;
