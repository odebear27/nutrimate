import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Typography, Pagination, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RecipeCard({results, setSavedRecipes, savedRecipes}) {

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 10;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = results.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({top: 1800, behavior: 'smooth'});
    }
 
  return (
    <>
    <Typography variant="h3" mb="46px">
        Showing Results
    </Typography>
    <MDBRow className='row-cols-1 row-cols-md-5 g-4'>
        {currentRecipes.map((result) => (
            <MDBCol key={result.id}>
                <MDBCard>
                    <MDBCardImage
                        src={result.image}
                        alt={result.title}
                        position='top'
                    />
                    <MDBCardBody>
                        <MDBCardTitle style={{
                            height: "50px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                    }}>{result.title}</MDBCardTitle>
                    <p dangerouslySetInnerHTML={{__html: result.summary.slice(0,100) + '...'}} />
                    <MDBCardText >
                        <Link to={`/recipe/${result.id}`}>Details</Link>
                        <br/>
                        <br/>
                        {result.readyInMinutes && <span> Ready in {result.readyInMinutes} minutes</span>}
                        </MDBCardText>                        
                        <MDBCardText>
                            <button style={{alignItems: 'center' }}
                            onClick={() => {
                                setSavedRecipes([...savedRecipes, result]);
                                console.log(savedRecipes);
                            }
                        } >Save Recipe</button>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        ))}
    </MDBRow>
    <Stack mt='50px' alignItems='center'>
    {results.length > recipesPerPage && (
        <Pagination 
        color='standard'
        shape='rounded'
        count={Math.ceil(results.length / recipesPerPage)}
        page={currentPage}
        onChange={paginate}
        size='large'
        />
    )}
    </Stack>
    </>
  );
}
