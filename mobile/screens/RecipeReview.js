import React, { useState, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useTheme, } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../contexts/AuthenticateContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function RecipeReview({ route }) {
  const theme = useTheme();  
  const { id } = route.params;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [hasPastReview, setPastReviewFlag] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authContext = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    await axios
      .get(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/reviews/recipes/${id}`,
        {
          headers: {
            Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
          },
        }
      )
      .then((response) => {
        //reverse the array to display latest review first
        const reversedReviews = response.data.reverse();
        console.log("-------------ReversedReview-----", reversedReviews);
        setReviews(reversedReviews);
        setPastReviewFlag(true);
        setPromptMessage("");
      })
      .catch((error) => {
        console.log("Error fetching review: ", error);
        if(error.response.status == "404"){
          setPromptMessage("No reviews for this recipe")
        }
      });
  };

  const handleReviewSubmit = async ({ navigation }) => {
    if (rating < 1 || rating > 5) {
      Alert.alert("Invalid Rating", "Rating must be between 1 and 5.");
      return;
    }

    if (title.trim() === "" || description.trim() === "") {
      Alert.alert("Incomplete Data", "Please fill in all fields.");
      return;
    }

    const reviewData = {
      recipeId: id,
      title,
      description,
      rating,
    };

    await axios
      .post(
        `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/customers/reviews/create/recipes/${id}`,
        reviewData,
        {
          headers: {
            Authorization: `${authContext.tokenType} ${authContext.accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Review response:", response.data);
        setErrorFlag(false);
        setErrorMessage("");
        Alert.alert(
          "Review Submitted",
          "Your review has been submitted successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("RecipeDetails", { id });
              },
            },
          ]
        );
        // You might want to navigate back to the recipe details page or take other actions here
      })
      .catch((error) => {
        console.log("Error submitting review:", error); // Log the error
        console.log("Error response:", error.response); // Log the error response
        console.log("Error status:", error.response.status); // Log the error status
        setErrorFlag(true);
        setErrorMessage("An error occurred while submitting your review. Please try again");
        // Alert.alert("Error", "An error occurred while submitting your review.");
      });
  };

  // const renderReviewItem = ({ item }) => (
  //   <View style={styles.reviewItem}>
  //     <Text>{item.title}</Text>
  //     <Text>{item.description}</Text>
  //     <Text>Rating: {item.rating}</Text>
  //   </View>
  // );

  function StarRating({ rating, onRatingChange }) {
    return (
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Icon
            key={index}
            name={index < rating ? "star" : "star-o"}
            style={styles.starIcon}
            onPress={() => onRatingChange(index + 1)}
          />
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: "darkgray" }]}>
      {/* <Text>Leave a Review for Recipe ID: {id}</Text> */}

      {hasError && (
        <View style={styles.errorView}>
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {errorMessage}
          </Text>
        </View>
      )}

      <View style={styles.reviewFormContainer}>
        <Text style={styles.reviewHeader}>Review</Text>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Review"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          multiline
        />
        {/* <TextInput
        placeholder="Rating (1-5)"
        keyboardType="numeric"
        value={rating.toString()}
        onChangeText={(text) => setRating(parseInt(text))}
        style={styles.input}
      /> */}
        <StarRating rating={rating} onRatingChange={setRating} />
        <View style={styles.submitButtonContainer}>
          <Button
            title="Submit Review"
            // color="#344B3A"
            color="#43521A"
            onPress={() => handleReviewSubmit({ navigation })}
          />
        </View>
      </View>      

      <View style={styles.reviewDisplayContainer}>
        {!hasPastReview ? 
        (<View style={styles.reviewItem}>
          <Text style={styles.promptDescription}>{promptMessage}</Text>          
        </View>) :       
        reviews.slice(0, 10).map((review) => (
          <View key={review.reviewId} style={styles.reviewItem}>
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewDescription}>{review.description}</Text>
            <View style={styles.ratingContainer}>
              {Array.from({ length: review.rating }).map((_, index) => (
                <Icon key={index} name="star" style={styles.starIcon} />
              ))}
            </View>
          </View>
        ))
      }
      </View>      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 50,
  },
  errorView: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: "95%",
    height: 60,
    alignItems: "stretch",
  },
  errorText: {
    padding: 0,
    height: 60,
    opacity: 0.7,
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },
  promptDescription: {
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#333",
    marginBottom: 10,
  },
  reviewItem: {
    borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    borderBottomColor: "#fff",
    paddingBottom: 10,
    marginBottom: 10,
    paddingTop: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewDescription: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  starIcon: {
    // color: "gold",    
    color: "#43521A",
    fontSize: 24, // Adjust the size of the star icon
    marginRight: 2, // Add some spacing between stars
    paddingBottom: 20,
  },
  reviewHeader: {
    fontSize: 30,
    fontWeight: "bold",
    // marginTop: 10,
    marginBottom: 20,
    // color: "#344B3A",    
    color: "#43521A",
  },
  reviewFormContainer: {
    // borderWidth: 2,
    // borderColor: "#344B3A",
    // borderRadius: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    // marginBottom: 20,
  },
  reviewDisplayContainer: {
    marginVertical: 30,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  submitButtonContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  input: {
    marginBottom: 20,
    fontSize: 20,
    color: "#000",
  }
});

export default RecipeReview;
