import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
  } from 'mdb-react-ui-kit';

export default function InstructionCard({details}) {
        console.log(details.analyzedInstructions);
        const instructions = details.analyzedInstructions;


            return(
                <div>
                      
   
                       
                         <MDBCard className="w-100 p-3">
                            <MDBCardBody>
                                <MDBCardTitle> Step 1</MDBCardTitle>
                                    <MDBRow className='mt-3'>
                                        <MDBCol sm='4' md='3' lg='4' xl='4'>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle>Ingredient</MDBCardTitle>
                                                    
                                                        {instructions && instructions.map((item) => {
                                                        {item.steps.map((step) => {
            
                                                               return ( <MDBCardText>
                                                    
                                                                {step.number}
                                                                </MDBCardText>)
                    
                                                        })
                                                        }
                                                        })}
                                                   
                                                    
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol sm='6' md='3' lg='4' xl='6'>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle>Method</MDBCardTitle>
                                                    <MDBCardText>
                                                        Detail Method
                                                    </MDBCardText>
                                                    
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                  
               
                </div>

                            
            );        
}
