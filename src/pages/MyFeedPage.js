import { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import NavbarHeader from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MyFeedPage.css";

function MyFeedPage({ myFeedRecipes, setMyFeedRecipes, getRecipeByID }) {
  const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
    const generateRandomRecipeIDs = () => {
      const randomIDs = [];
      for (let i = 0; i < 10; i++) {
        randomIDs.push(Math.floor(Math.random() * 1000000 + 999));
      }
      return randomIDs;
    };

    const fetchRecipes = async () => {
        setIsLoading(true);
        const recipeIDs = generateRandomRecipeIDs();
      const fetchedRecipes = [];

      for (const recipeID of recipeIDs) {
        try {
          const response = await getRecipeByID(recipeID);
          fetchedRecipes.push(response.data);
        } catch (error) {
          console.log(`Error fetching recipe ID ${recipeID}: ${error}`);
        }
      }

      setMyFeedRecipes(fetchedRecipes);
      setIsLoading(false);
      console.log(isLoading);
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <NavbarHeader />
      <Header />
      <h1 style={{ padding: "50px", textAlign: "center" }}>My Feed</h1>
      {isLoading ? (
        <div className="spinner-container">
            <Spinner animation="border" variant="secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
            </div>
      ) : (
        <MDBRow className="row-cols-1 row-cols-md-5 g-4">
        {myFeedRecipes &&
          myFeedRecipes.map((myFeedRecipe) => (
            <MDBCol key={myFeedRecipe.id}>
              <MDBCard>
                <MDBCardImage
                  src={myFeedRecipe.image}
                  alt={myFeedRecipe.title}
                  position="top"
                />
                <MDBCardBody>
                  <MDBCardTitle
                    style={{
                      height: "50px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {myFeedRecipe.title}
                  </MDBCardTitle>
                  <MDBCardText>
                    <Link to={`/recipe/${myFeedRecipe.id}`}>Details</Link>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
      )}
      
      
      <Footer />
    </div>
  );
}

export default MyFeedPage;
