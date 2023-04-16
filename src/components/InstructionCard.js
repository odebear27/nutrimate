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
    //console.log(details.analyzedInstructions);
    const instructions = details.analyzedInstructions;
    console.log('Instructions' , instructions);

    return (
        <div>
            <h2>Instruction</h2>
            {instructions && instructions.map((detail) => (   
                <div>
                    {detail.steps.map((step,i)=>  
                        <div>
                            <MDBCard  className="w-100 p-3">
                                <MDBCardBody>
                                    <MDBCardTitle key={i}> Step <span className='text-warning'>{step.number}</span></MDBCardTitle>
                                    <MDBRow className='mt-3'>
                                        <MDBCol sm='4' md='4' lg='4' xl='4'>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle>Ingredient</MDBCardTitle>
                                                    {step.ingredients.map((ingredient) =>
                                                        <MDBCardText>
                                                            <li>{(ingredient.name).length === 0 ? 'None' : ingredient.name}</li>
                                                        </MDBCardText>
                                                    )}
                                                    
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                        <MDBCol sm='8' md='8' lg='8' xl='8'>
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle>Method</MDBCardTitle>
                                                    
                                                    <MDBCardText>
                                                        {step.step}
                                                    </MDBCardText>

                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );      
}
