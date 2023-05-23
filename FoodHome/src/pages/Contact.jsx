import React, { useState, useEffect } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
// import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

const featureData = [
  {
    title: "Quick service",
    imgUrl: featureImg01,
    desc: "We provide quick services and instant food delivery at your table.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "We have a good environment with Good background music.",
  },
  {
    title: "Easy to order",
    imgUrl: featureImg03,
    desc: "Just Scan Code, Select food and Make payment.",
  },
];

const Contact = () => {
  // ===================================================================================================================
  const [value, setValue] = React.useState(3); //review

  const [data, setdata] = useState({
    review: "",
    review2: "",
    review3: "",
  });
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== data.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [data.password]);

  const handleChange = (e) => {
    // e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  // --------------------------API----------------------------
  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    axios
      .post("https://kind-erin-crow-garb.cyclic.app/api/review", data)
      .then((r) => {
        console.log("Registration successfully..");
        setEdit(r.data._id);
      });
    setdata((e.target.value = ""));
  };

  // ==================================================================================================
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col lg="12" className="text-center">
            <h5 className="feature__subtitle mb-4">What we serve</h5>
            <h2 className="feature__title">Just sit back at home</h2>
            <h2 className="feature__title">
              we will <span>take care</span>
            </h2>
            <p className="mb-1 mt-4 feature__text">
              The smell of good food, like the sound of lightly flowing water,
              <br />
              is indescribable in its evocation of innocence and delight.
            </p>
          </Col>
        </Row>
      </Container>
      <section className="reviewFormmain" >
      <Container className="reviewForm p-1 rounded-3 col-lg-7 col-sm-12 col-md-8 col-sm-12 "  
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backgroundColor: "#b74160",
          }}>
          <Row className=" bg-light p-5 m-3 rounded-3">
            <div className="text-center ">
              <ValidatorForm
                className="row"
                onSubmit={handleSubmit}
                onError={() => null}
                autocomplete="off"
              >
                <TextField
                  className="col-10 bg-light"
                  type="text"
                  name="review2"
                  id="standard-basic"
                  value={data.review2 || ""}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Name"
                  validators={["required"]}
                />
                <TextField
                  className="col-2  "
                  select
                  variant="filled"
                  value={data.review || ""}
                  onChange={handleChange}
                  name="review"
                  SelectProps={{
                    native: "true",
                  }}
                >
                  <option>😞</option>
                  <option>🙁</option>
                  <option>🙂</option>
                  <option>😀</option>
                  <option>😁</option>
                </TextField>

                <TextareaAutosize
                  className="col-12 mt-4"
                  name="review3"
                  aria-label="empty textarea"
                  onChange={handleChange}
                  validators={["required"]}
                  value={data.review3 || ""}
                  minRows={3}
                  placeholder="Review..."
                  style={{ width: "100%" }}
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
            </div>
          </Row>
        </Container>
      </section>
      <Container>
        <Row>
          {featureData.map((item, index) => (
            <Col lg="4" md="6" sm="6" key={index} className="mt-5">
              <div className="feature__item text-center px-5 py-1">
                <img
                  src={item.imgUrl}
                  alt="feature-img"
                  className="w-25 mb-3"
                />

                <h5 className=" fw-bold mb-3">{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
          {/* ================================================================= */}
        </Row>
      </Container>
    </>
  );
};

export default Contact;
