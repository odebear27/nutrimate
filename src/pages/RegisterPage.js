import React from "react";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../utils/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

function RegisterPage() {
  const navigate = useNavigate();
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isSubscribed: true,
  });

  const handleInputChange = (e) => {
    setRegisterUser((prevRegisterUser) => {
      return {
        ...prevRegisterUser,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCheckBox = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    console.log(value);
    setRegisterUser((prevRegisterUser) => {
      return {
        ...prevRegisterUser,
        [e.target.name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // navigate("/signin");
    // console.log(registerUser);

    // Check if fields are not empty
    if (!registerUser.firstName || !registerUser.lastName || !registerUser.email || !registerUser.password) {
      alert("All fields are required");
      return;
    }

    // Check if email is valid
    if (!registerUser.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if passsword is minumum 6 characters
    if (registerUser.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      // create user account
      // email and password are stored in firebase auth for secure password management
      createUserWithEmailAndPassword(auth, registerUser.email, registerUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      
      // add to firestore db
      const docRef = await addDoc(collection(db, "users"), {
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        email: registerUser.email,
        isSubscribed: registerUser.isSubscribed
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/");
    
    } catch (e) {
      const errorCode = e.code;
      const errorMessage = e.message;
      alert(errorMessage);
    }      
  };

  return (
    <div className="container">
      <form>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput
              id="form3Example1"
              label="First name"
              name="firstName"
              value={registerUser.firstName}
              onChange={handleInputChange}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              id="form3Example2"
              label="Last name"
              name="lastName"
              value={registerUser.lastName}
              onChange={handleInputChange}
            />
          </MDBCol>
        </MDBRow>
        <MDBInput
          className="mb-4"
          type="email"
          id="form3Example3"
          label="Email address"
          name="email"
          value={registerUser.email}
          onChange={handleInputChange}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form3Example4"
          label="Password"
          name="password"
          value={registerUser.password}
          onChange={handleInputChange}
        />

        <MDBCheckbox
          wrapperClass="d-flex justify-content-center mb-4"
          id="form3Example5"
          label="Subscribe to our newsletter"
          defaultChecked
          name="isSubscribed"
          onChange={handleCheckBox}
        />

        <MDBBtn onClick={handleSignUp} type="submit" className="mb-4" block>
          Sign Up
        </MDBBtn>
      </form>
    </div>
  );
}

export default RegisterPage;
