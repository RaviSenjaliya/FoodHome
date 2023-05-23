import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import SendIcon from "@mui/icons-material/Send";
import { Button, TextField, TextareaAutosize } from "@mui/material";

import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [value, setValue] = React.useState(3); //review

  const [data, setdata] = useState({
    firstname: "",
    phone: "",
    password: "",
  });
  const [edit, setEdit] = useState(-1);

  const handleChange = (e) => {
    // e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    axios.post("https://kind-erin-crow-garb.cyclic.app/api/user", data).then((r) => {
      console.log("Registration successfully..");
      setEdit(r.data._id);
    });
    setdata((e.target.value = ""));
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />

      <section>
        <Container
          className=" p-1 rounded-3 col-lg-7 col-sm-12 col-md-8 col-sm-12 "
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backgroundColor: "#b74160",
          }}
        >
          <Row className="bg-light p-5 m-3 rounded-3">
            <ValidatorForm
              className="row"
              onSubmit={handleSubmit}
              onError={() => null}
              autocomplete="off"
            >
              <TextField
                className=" bg-light"
                type="text"
                name="firstname"
                id="standard-basic"
                value={data.firstname || ""}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Name"
                validators={["required"]}
              />
              <TextField
                className="mt-3 bg-light"
                type="number"
                name="phone"
                id="standard-basic"
                value={data.phone || ""}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Phone No"
                validators={["required"]}
              />
              <TextField
                className="mt-3 bg-light"
                type="password"
                name="password"
                id="standard-basic"
                value={data.password || ""}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Password"
                validators={["required"]}
              />

              <Button
                className="col-12 mt-4"
                style={{
                  backgroundColor: "#b74160",
                }}
                variant="contained"
                type="submit"
              >
                <SendIcon />
              </Button>
            </ValidatorForm>

            <Link to="/register" className="mt-4">
              Don't have an account? Create an account
            </Link>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
