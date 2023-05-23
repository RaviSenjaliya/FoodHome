import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom"
import React from "react";
import { Col, Container, Row } from "reactstrap";
import errorr from "../assets/error.gif";
import "../styles/error.css"


export default function Error() {
    const navigate = useNavigate();
    return (
    <div>
      <section>
        <img
          src={errorr}
          alt=""
          className="imgg "
        />
      </section>
      <Container >
        <Row>
          <Col lg="12" className="text-center errortext">
            <h1 className="text-danger">Oops! Somthing Went Wrong</h1>
            <h6 className="mt-4">
              Sorry, We're not able to find what You were looking for...
            </h6>
            <Button
            onClick={()=>navigate("/")}
              variant="contained"
              size="large"
              className="mt-2 mb-5"
              color="error"
            >
              TAKE ME HOME
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
