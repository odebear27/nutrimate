import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import NavbarHeader from '../components/Navbar';
import Footer from '../components/Footer';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import InstructionCard from '../components/InstructionCard';

export default function Recipe() {

    const[details, setDetails] = useState({});
    let params = useParams()

    var myHeaders = new Headers();
      myHeaders.append("apikey", process.env.REACT_APP_API_KEY);
      
    var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
    };

    const fetchDetails = async (key) =>{
        const data = await fetch(`https://api.apilayer.com/spoonacular/recipes/${key}/information?includeNutrition=false`, requestOptions);
          
        const detailData = await data.json();
        console.log("detaildata",detailData);
        setDetails(detailData)
    }   

    useEffect(()=>{
        fetchDetails(params.key)
    },[params.key])

    return(
        <>
            <NavbarHeader/>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='11' className='mx-auto mb-4'>
                            <h1>{details.title}</h1>
                        </MDBCol>
                        
                        <hr/>
                        <MDBCol md='3' lg='4' xl='6' className='mx-auto mb-4'>
                            <img src={details.image}/>
                        </MDBCol>

                        <MDBCol md='3' lg='4' xl='4' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Infobox</h6>
                            <p>
                                <MDBIcon color='primary' fas icon='stopwatch' className='me-2' />
                                
                                Serve in <b>{details.readyInMinutes}</b> minutes
                            </p>
                            <p>
                                <MDBIcon color='primary' fas icon="user-friends" className='me-2' />
                                
                                Serve <b>{details.servings}</b> pax
                            </p>
                            <p>
                                <MDBIcon color='primary' fas icon="seedling" className='me-2' />
                                
                                Vegetarian? <b>{details.vegetarian === false ? 'No' : 'Yes'}</b>
                            </p>
                            <p>
                                <MDBIcon color='primary' fas icon="dollar-sign" className='me-2' />
                                Price per Serving : <b>$ {(details.pricePerServing)/ 100}</b>

                            </p>
                        </MDBCol>
                        <hr/>
                       
                        <MDBCol md='3' lg='4' xl='11' className='mx-auto mb-4'>
                            <p dangerouslySetInnerHTML={{__html:details.summary}} />
                        </MDBCol>
                        <hr/>
                        <h3 className="text-center">Instruction</h3>
                        
                        <InstructionCard details={details}/>
    
                    </MDBRow>
                </MDBContainer>
                
            </section>
            
            
            <Footer />
        </>
    );
}