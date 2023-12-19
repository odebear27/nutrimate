// import * as React from "react";
// import { View, StyleSheet, Text } from "react-native";

// function RecipeList() {
//   return (
//     <View style={styles.center}>
//       <Text>This is all about the recipelist available</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },
// });

// export default RecipeList;

import axios from 'axios';
import React, {useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from "react-native-paper";
import { AuthContext } from "../contexts/AuthenticateContext";
import { ProfileContext } from "../contexts/ProfileContext";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MangoSakuraSushiRolls from '../assets/mangoSakuraSushiRolls.jpg';
import SumptuousSeafoodPaella from '../assets/seafoodPaella.jpg';
import WorldsBestTempura from '../assets/worldsBestTempura.jpg';
import GodfatherPizza from '../assets/godfatherPizza.jpg';
import { getStorage, ref, getDownloadURL} from "firebase/storage";

const renderImage = (item) => {
  // switch(id) {
  //     case 1: 
  //       return MangoSakuraSushiRolls;
  //     case 2:
  //       return SumptuousSeafoodPaella;
  //     case 3:
  //       return WorldsBestTempura;
  //     case 4:
  //       return GodfatherPizza;
  //     default:
  //       return { uri: `${item.image}`};
  // }
}

const Item = ({item, onPress, textColor}) => {
  const [imageUrl, setImageUrl] = useState(null);
  
  const fetchImageUrl = async () => {
    const storage = getStorage();
    try {
      const url = await getDownloadURL(ref(storage, `${item.imageURL}`));
      console.log("url: ", url);
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image URL: ", error);
    }
  };

  useEffect(() => {

    if (item.imageURL) {
      fetchImageUrl();
    } else if (item.image) {
      setImageUrl(item.image);
    }

  }, [item.imageURL]);

  return(
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <ImageBackground style={styles.image} source={{ uri: imageUrl }} resizeMode="cover">
        <View style={styles.textOverlay}>
          <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
};

function RecipeList({ route }) {
    // const [selectedId, setSelectedId] = useState();
    const [recipeTitle, setRecipeTitle] = useState([]);
    const [isInProgress, setInProgress] = useState(false);
    const { cuisine } = route.params;

    const authContext = useContext(AuthContext);
    const navigation = useNavigation();
    const profileContext = useContext(ProfileContext);
                

    useEffect(() => {
        getRecipeTitle();
    }, [])

    const getRecipeTitle = () => {
        setInProgress(true);
        axios
            .get(`https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/public/recipe/cuisine/${cuisine}`, {
                headers: {
                    Authorization: `${authContext.tokenType} ${authContext.accessToken}`
                },
            })
            .then(({ data }) => {
                console.log("Data: ", data);
                console.log('managed to get recipe data');

                // add a unified id for each recipe
                // data.forEach((recipe, index) => {
                //     recipe.id = index;
                // })

                const username = profileContext.profile.username;

                const processedData = data.map(item => ({
                    ...item,
                    unifiedId: item.id ? item.id : item.recipeId,
                    // imageURL: item.imageURL ? item.imageURL : item.image,
                }));
                console.log("processedData:", processedData);
                console.log('managed to add unified id and imageURL');
                setRecipeTitle(processedData);
                setInProgress(false);
            },
            (error) => {

            }
            )
    }
    
    // destructure the parameter to get the item which is the individual object from recipeTitle
    const renderItem = ({item}) => {
        // const color = item.unifiedId === selectedId ? 'black' : 'white';

        return (
            <Item
              item={item}
              onPress={() => {
                // setSelectedId(item.unifiedId);
                navigation.navigate('RecipeDetails', { id: item.unifiedId, cuisine: cuisine });
              }}
              textColor='white'
            />
          );
        };


    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require("../assets/login.jpeg")}
          style={styles.backgroundImage}
          imageStyle={{ opacity: 0.1 }}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.container}>
            {isInProgress ? (
              <ActivityIndicator
                animating={true}
                color={"#43521A"}
                size={100}
              />
            ) : (
              // {/* <Text style={styles.header} >{cuisine}</Text> */}
              <FlatList
                data={recipeTitle}
                renderItem={renderItem}
                keyExtractor={(item) => item.unifiedId}
                // extraData={selectedId}
              />
            )}
          </SafeAreaView>
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
    backgroundColor: "black",
    opacity: 0.85
  },
  backgroundImage: {
    width: "100%",       
    height: "100%",
    alignItems: "center",
    justifyContent: 'center',
  },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // header: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginTop: 10,
    //     textAlign: 'center',
    //     color: '#344B3A'
    // },
    item: {
        // height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 15,
        backgroundColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
        // transform: [{ scale: 0.8 }],
        // width: 300,
        // height: 300,
        width: 340,
        height: 160,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
    },
    textOverlay: {
      position: 'absolute', 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      width: '100%', 
      padding: 10,
      textAlign: 'center',
    }
  });

export default RecipeList;