import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import EmailSubscription from "./EmailSubscription";


export default function Footer() {
  return (
    <div className="footer-custom">
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href="https://www.facebook.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="facebook-f" className="mdb-icon" />
            </a>
            <a href="https://twitter.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="twitter" className="mdb-icon" />
            </a>
            <a href="https://www.google.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="google" className="mdb-icon" />
            </a>
            <a href="https://www.instagram.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="instagram" className="mdb-icon" />
            </a>
            <a href="https://sg.linkedin.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="linkedin" className="mdb-icon" />
            </a>
            <a href="https://github.com/" className="me-4 text-reset" target="_blank">
              <MDBIcon fab icon="github" className="mdb-icon" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon color="secondary" icon="leaf" className="me-3" />
                  {<Link to="/about">NutriMate</Link>}
                </h6>
                <p>
                  As passionate foodies, we aim to make cooking enjoyable and
                  accessible through our website's diverse, easy, and delicious
                  recipes, curated by our experienced team for cooks of all
                  levels.
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-3">
                <h6 className="text-uppercase fw-bold mb-4">Browse Recipes</h6>
                <p>{<Link to="/">Search</Link>}</p>
                <p>{<Link to="/savedrecipes">Saved Recipes</Link>}</p>
                <p>{<Link to="/myfeed">My Feed</Link>}</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-3">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  Singapore
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  contact-us@nutrimate.com
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />
                  +65 6123 4567
                </p>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <EmailSubscription />
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2023 Copyright NutriMate
        </div>
      </MDBFooter>
    </div>
  );
}
