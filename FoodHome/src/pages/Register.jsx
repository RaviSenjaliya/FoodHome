import React, { useRef } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container
          className=" p-1 rounded-3  col-lg-7 col-sm-12 col-md-8 col-sm-12 "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backgroundColor: "#b74160",
          }}
        >
          <Row className="bg-light p-2 m-3 rounded-3">
            <form className="form mb-5" onSubmit={submitHandler}>
              <div className="form__group">
                <input
                  type="text"
                  placeholder="Full name"
                  required
                  ref={signupNameRef}
                />
              </div>
              <div className="form__group">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  ref={signupEmailRef}
                />
              </div>
              <div className="form__group">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  ref={signupPasswordRef}
                />
              </div>
              <button type="submit" className="addTOCart__btn">
                Sign Up
              </button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Register;
