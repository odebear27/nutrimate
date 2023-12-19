import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  Linking,
  Button,
  Pressable,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../contexts/AuthenticateContext";
import { useContext, useState, useEffect, useCallback } from "react";
import { ActivityIndicator } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions, TouchableOpacity } from "react-native";
import MangoSakuraSushiRolls from "../assets/mangoSakuraSushiRolls.jpg";
import SumptuousSeafoodPaella from "../assets/seafoodPaella.jpg";
import WorldsBestTempura from "../assets/worldsBestTempura.jpg";
import GodfatherPizza from "../assets/godfatherPizza.jpg";
import * as React from "react";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

const initRecipeDetails = {
  image: "../assets/icon.png",
  title: "",
  summary: "<html>No information</html>",
  readyInMinutes: "",
  sourceUrl: "",
};

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Link ${url} is broken`);
    }
  }, [url]);

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

function RecipeDetails({ route, navigation }) {
  const [isCustomerRecipe, setIsCustomerRecipe] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState(initRecipeDetails);
  const [isInProgress, setInProgress] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const { id } = route.params;

  const authContext = useContext(AuthContext);

  const { width } = useWindowDimensions();

  useEffect(() => {
    getRecipeDetails();
  }, [id]);

  const getRecipeDetails = async () => {
    // for customer uploaded recipes in database
    if (id <= 1000) {
      const response = await axios
        .get(
          `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/recipe/${id}`,
          {
            headers: {
              Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
            },
          }
        );
        const customerRecipes = response.data;
        console.log("---Customers recipe loaded---", customerRecipes);
        setRecipeDetails(customerRecipes);

        // .then(({ data }) => {
        //   console.log("---recipe details---", data);
        //   setRecipeDetails(data);
        // });      
    } 
    else {
      // for spoonacular api recipes
      const response = await axios
        .get(
          `https://api.apilayer.com/spoonacular/recipes/${id}/information?includeNutrition=false`,
          {
            headers: {
              Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
              apikey: "Xxh8jDiiKCjuryGWTBuApzyT6kvJosAY",
            },
          }
        );
        const publicRecipes = response.data;
        console.log("---Public recipe loaded---", publicRecipes);
        setRecipeDetails(publicRecipes);
        setIsCustomerRecipe(false);

        // .then(({ data }) => {
        //   // console.log("---recipe details---", data);
        //   console.log("managed to get recipe details");
        //   setRecipeDetails(data);
        //   setIsCustomerRecipe(false);
        // });
    }

    setInProgress(false);

  };

  // const renderImage = (id) => {
  //   switch (id) {
  //     case 1:
  //       return MangoSakuraSushiRolls;
  //     case 2:
  //       return SumptuousSeafoodPaella;
  //     case 3:
  //       return WorldsBestTempura;
  //     case 4:
  //       return GodfatherPizza;
  //     default:
  //       return { uri: `${recipeDetails.image}` };
  //   }
  // };

  const fetchImageUrl = async () => {
    const storage = getStorage();
    try {
      const url = await getDownloadURL(ref(storage, `${recipeDetails.imageURL}`));
      console.log("url: ", url);
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image URL: ", error);
    }
  };

  useEffect(() => {

    if (recipeDetails.imageURL) {
      fetchImageUrl();
    } else if (recipeDetails.image) {
      setImageUrl(recipeDetails.image);
    }

  }, [recipeDetails.imageURL, recipeDetails.image]);

  const navigateToReviewScreen = () => {
    navigation.navigate("RecipeReview", { id: id });
  };

  return (
    <View style={styles.mainContainer}>
      {isInProgress ? (
        <View style={styles.progressContainer}>
          <ActivityIndicator animating={true} color={"#43521A"} size={100} />
        </View>
      ) : (
        <ScrollView>
          {/* <View style={styles.container}>
                <Text style={styles.header}>Japanese</Text>
            </View> */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            // source={renderImage(id)}
            source={{ uri: imageUrl }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>{recipeDetails.title}</Text>
          <Text style={styles.heading}>Summary</Text>
          <RenderHtml
            contentWidth={width}
            source={{ html: recipeDetails.summary }}
            tagsStyles={{
              a: { color: "black" },
            }}
            baseStyle={{ fontSize: 18, textAlign: "justify", fontWeight: "500" }}
          />
          <Text style={styles.heading}>ReadyInMinutes</Text>
          <Text style={styles.text}>{recipeDetails.readyInMinutes}</Text>
            <Text style={styles.heading}>Ingredients & Directions</Text>
            {isCustomerRecipe ? (
              <Text style={[styles.text, { fontStyle: "italic" }]}>
                No information available
              </Text>
            ) : (
              <OpenURLButton url={recipeDetails.sourceUrl}>
                {recipeDetails.sourceUrl}
              </OpenURLButton>
            )}
          </View>
          <View style={styles.reviewButton}>
            <TouchableOpacity
              onPress={navigateToReviewScreen}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Reviews</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
    backgroundColor: "darkgray",
    // opacity: 0.85
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingBottom: 20,
  },
  // header: {
  //     fontSize: 24,
  //     fontWeight: 'bold',
  //     marginTop: 10,
  //     textAlign: 'center',
  //     color: '#344B3A'
  // },
  imageContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 16,
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: 10,
    backgroundColor: "transparent",
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
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: "transparent",
    borderRadius: 15,
    // overflow: 'hidden',
    // transform: [{ scale: 1.2 }],
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
    // color: "#344B3A",
    color: "#43521A",
  },
  text: {
    fontSize: 18,    
    fontWeight: "500",
  },
  pressable: {
    // backgroundColor: '#344B3A',
  },
  reviewButton: {
    width: "95%",
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  button: {
    flex: 1,
    // backgroundColor: "#344B3A",
    backgroundColor: "#43521A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RecipeDetails;
