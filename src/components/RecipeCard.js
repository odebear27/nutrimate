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
import { Link } from 'react-router-dom';

export default function RecipeCard({results, setSavedRecipes, savedRecipes}) {
 
  return (
    <MDBRow className='row-cols-1 row-cols-md-5 g-4'>
        {results.map((result) => (
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
                        <MDBCardText>
                            <Link to={`/recipe/${result.id}`}>Details</Link>
                            <button 
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
  );
}
