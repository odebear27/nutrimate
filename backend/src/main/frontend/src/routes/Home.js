import { useEffect, useState, Fragment } from "react";
import BasicAuth from "../promises/BasicAuth";

function Home() {
  const [publicRecipes, setPublicRecipes] = useState([]);
  const [totalRecipesCount, setTotalRecipesCount] = useState(0);
  const [defaultPage, setDefaultPage] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(0);

  const HandlerGetPublicRecipes = async () => {
    let response = null;
    try {
      response = await BasicAuth.get("/nutrimate/public/recipe", {
        withCredentials: true,
        headers: {
          Accept: "application/json",
        },
      });

      let publicRecipesResponse = response.data;
      setPublicRecipes(publicRecipesResponse.results);
      setTotalRecipesCount(publicRecipesResponse.totalResults);
      setDefaultPage(publicRecipesResponse.page);
      setRecordsPerPage(publicRecipesResponse.number);
      // console.log("Get Public Recipes", publicRecipesResponse);
      console.log("Get Public Recipes", publicRecipesResponse.results);
      console.log("Get Public Recipes", publicRecipesResponse.totalResults);
      console.log("Get Public Recipes", publicRecipesResponse.page);
      console.log("Get Public Recipes", publicRecipesResponse.number);
    } catch (error) {
      console.log("Get Public Recipes", error.response);
    }
  };

  useEffect(() => {
    HandlerGetPublicRecipes();
  }, []);

  return (
    <div className="row w-80 p-4 d-flex justify-content-start gy-5">
      {/* <div className="col-md-12 d-flex justify-content-center">
        <p className="fs-3 fw-bold text-black-50 pt-2 mb-0 pb-2">
          Home Page for the Recipes
        </p>
      </div> */}
      {publicRecipes?.map((recipe) => {
        return (
          <Fragment key={recipe.id}>
            <div className="col-md-4 d-flex justify-content-center">
              <div className="card justify-content-center" style={{width: "420px"}}>
                <img
                  src={recipe.image}
                  class="card-img-top"
                  alt={recipe.title}
                  style={{width: "420px", padding: "30px"}}
                />
                <div className="card-body">
                  <h5 className="card-title text-black-30">{recipe.title}</h5>
                  <p class="card-text text-black-50">Ready in Minutes: <span>{recipe.readyInMinutes}</span></p>
                  {/* <p class="card-text">{recipe.summary}</p> */}
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default Home;
