
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
import NavbarHeader from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { padding } from '@mui/system';


const SavedRecipes = ({savedRecipes}) => {
  return (
    <>
        <NavbarHeader />
        <Header />
        <h1 style={{ padding:'50px', textAlign:'center'  }} >Saved Recipes</h1>
         <MDBRow className='row-cols-1 row-cols-md-5 g-4'>
            {savedRecipes && savedRecipes.map((savedRecipe) => (
             <MDBCol key={savedRecipe.id}>
                 <MDBCard>
                     <MDBCardImage
                         src={savedRecipe.image}
                         alt={savedRecipe.title}
                         position='top'
                     />
                     <MDBCardBody>
                         <MDBCardTitle>{savedRecipe.title}</MDBCardTitle>
                         <MDBCardText>
                             <Link to={`/recipe/${savedRecipe.id}`}>Details</Link>
                         </MDBCardText>
                     </MDBCardBody>
                 </MDBCard>
             </MDBCol>
            
                ))}
            </MDBRow>
            <Footer />
    </>
  )
}

export default SavedRecipes
