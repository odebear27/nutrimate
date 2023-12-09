import React from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function SignInPage() {  
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setSignIn((prevSignIn) => {
      return {
        ...prevSignIn,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // if (signIn.email && signIn.email.includes("@") && signIn.password !== null) navigate("/");
    // else alert("Please enter a valid email and/or password.");

    signInWithEmailAndPassword(auth, signIn.email, signIn.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        authCtx.setIsSignedIn(true);
        console.log("Signed in button clicked; isSignedIn: ", authCtx.isSignedIn);
        console.log(user);
        authCtx.setEmail(user.email);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className="container">
      <form>
        <MDBInput
          className="mb-4"
          type="email"
          id="form2Example1"
          label="Email address"
          name="email"
          value={signIn.email}
          onChange={handleInputChange}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form2Example2"
          label="Password"
          name="password"
          value={signIn.password}
          onChange={handleInputChange}
        />

        <MDBRow className="mb-4">
          <MDBCol className="d-flex justify-content-center">
            <MDBCheckbox
              id="form2Example3"
              label="Remember me"
              defaultChecked
            />
          </MDBCol>
          <MDBCol>
            <a href="#!">Forgot password?</a>
          </MDBCol>
        </MDBRow>

        <MDBBtn onClick={handleSignIn} className="mb-4" block>
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <a href="/register">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
