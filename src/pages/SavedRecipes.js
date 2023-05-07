import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import NavbarHeader from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UnsaveButton from "../components/UnsaveButton";
import "./SavedRecipes.css";

const SavedRecipes = ({ savedRecipes, saved, setSaved, setSavedRecipes, search, setSearch, searchRecipes }) => {
  return (
    <div className="card-container">
      <NavbarHeader search={search}
        setSearch={setSearch}
        searchRecipes={searchRecipes} />
      <Header />
      <h1 style={{ padding: "50px", textAlign: "center" }}>Saved Recipes</h1>
      <MDBRow className="row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
        {savedRecipes &&
          savedRecipes.map((savedRecipe) => (
            <MDBCol key={savedRecipe.id}>
              <MDBCard style={{ height: "600px" }}>
                <MDBCardImage
                  style={{ height: "250px" }}
                  src={savedRecipe.image}
                  alt={savedRecipe.title}
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
                    {savedRecipe.title}
                  </MDBCardTitle>
                  <p
                    style={{ height: "130px" }}
                    dangerouslySetInnerHTML={{
                      __html: savedRecipe.summary.slice(0, 100) + "...",
                    }}
                  />
                  <MDBCardText>
                    <Link to={`/recipe/${savedRecipe.id}`}>Details</Link>
                    <br />
                    <br />
                    {savedRecipe.readyInMinutes && (
                      <span>
                        {" "}
                        Ready in {savedRecipe.readyInMinutes} minutes
                      </span>
                    )}
                  </MDBCardText>
                  <MDBCardText>
                    <UnsaveButton
                      saved={saved}
                      setSaved={setSaved}
                      handleUnsaveRecipe={() => {
                        setSavedRecipes(
                          savedRecipes.filter(
                            (savedRecipeState) =>
                              savedRecipeState.id !== savedRecipe.id
                          )
                        );
                        setSaved(false);
                        console.log(savedRecipes);
                      }}
                    />
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
      </MDBRow>
      <Footer />
    </div>
  );
};

export default SavedRecipes;
