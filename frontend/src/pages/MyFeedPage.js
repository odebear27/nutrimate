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
import { Typography, Pagination, Stack } from "@mui/material";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import NavbarHeader from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./MyFeedPage.css";
import UnsaveButton from "../components/UnsaveButton";
import SaveButton from "../components/SaveButton";

function MyFeedPage({
  myFeedRecipes,
  setMyFeedRecipes,
  getRecipeByID,
  savedRecipes,
  setSavedRecipes,
  saved,
  setSaved,
  search, setSearch, searchRecipes
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recipesPerPage = 10;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = myFeedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

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
      <NavbarHeader search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes} />
      <Header />
      <h1 style={{ padding: "50px", textAlign: "center" }}>My Feed</h1>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="card-container">
          <MDBRow className="row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
            {myFeedRecipes &&
              myFeedRecipes.length > 0 &&
              currentRecipes.map((myFeedRecipe) => (
                <MDBCol key={myFeedRecipe.id}>
                  <MDBCard style={{ height: "600px" }}>
                    <MDBCardImage
                      style={{ height: "250px" }}
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
                      <p
                        style={{ height: "130px" }}
                        dangerouslySetInnerHTML={{
                          __html: myFeedRecipe.summary.slice(0, 100) + "...",
                        }}
                      />
                      <MDBCardText>
                        <Link to={`/recipe/${myFeedRecipe.id}`}>Details</Link>
                        <br />
                        <br />
                        {myFeedRecipe.readyInMinutes && (
                          <span>
                            {" "}
                            Ready in {myFeedRecipe.readyInMinutes} minutes
                          </span>
                        )}
                      </MDBCardText>
                      <MDBCardText>
                        {/* if myFeedRecipe.id is === savedRecipe.id then show SaveButton, else show UnsaveButton */}
                        {!savedRecipes.some(
                          (savedRecipe) => savedRecipe.id === myFeedRecipe.id
                        ) ? (
                          <SaveButton
                            saved={saved}
                            setSaved={setSaved}
                            handleSaveRecipe={() => {
                              setSavedRecipes([...savedRecipes, myFeedRecipe]);
                              setSaved(true);
                              console.log(savedRecipes);
                            }}
                          />
                        ) : (
                          <UnsaveButton
                            saved={saved}
                            setSaved={setSaved}
                            handleUnsaveRecipe={() => {
                              setSavedRecipes(
                                savedRecipes.filter(
                                  (savedRecipeState) =>
                                    savedRecipeState.id !== myFeedRecipe.id
                                )
                              );
                              setSaved(false);
                              console.log(savedRecipes);
                            }}
                          />
                        )}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
          <Stack mt="50px" alignItems="center">
            {myFeedRecipes.length > recipesPerPage && (
              <Pagination
                color="standard"
                shape="rounded"
                count={Math.ceil(myFeedRecipes.length / recipesPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
              />
            )}
          </Stack>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MyFeedPage;
