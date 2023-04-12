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

export default function RecipeCard({results}) {
  return (
    <MDBRow className='row-cols-1 row-cols-md-2 g-4'>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src={results[0].image}
            alt={results[0].title}
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>{results[0].title}</MDBCardTitle>
            <MDBCardText>
              <Link to={`/recipe/${results[0].id}`}>Details</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src={results[1].image}
            alt={results[1].title}
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>{results[1].title}</MDBCardTitle>
            <MDBCardText>
              <Link to={`/recipe/${results[1].id}`}>Details</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src={results[2].image}
            alt={results[2].title}
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>{results[2].title}</MDBCardTitle>
            <MDBCardText>
                <Link to={`/recipe/${results[2].id}`}>Details</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol>
        <MDBCard>
          <MDBCardImage
            src={results[3].image}
            alt={results[3].title}
            position='top'
          />
          <MDBCardBody>
            <MDBCardTitle>{results[3].title}</MDBCardTitle>
            <MDBCardText>
                <Link to={`/recipe/${results[3].id}`}>Details</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}