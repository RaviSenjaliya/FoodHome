import React from "react";

import { Container, Row, Col } from "reactstrap";

import categoryImg01 from "../../../assets/images/menufood1 (1).gif";
import categoryImg02 from "../../../assets/images/menufood1 (2).gif";
import categoryImg03 from "../../../assets/images/menufood1 (3).gif";
import categoryImg04 from "../../../assets/images/menufood1 (4).gif";

import "../../../styles/category.css";

const categoryData = [
  {
    display: "Fastfood",
    imgUrl: categoryImg01,
  },
  {
    display: "Pizza",
    imgUrl: categoryImg02,
  },

  {
    display: "Asian Food",
    imgUrl: categoryImg03,
  },

  {
    display: "Row Meat",
    imgUrl: categoryImg04,
  },
];

const Category = () => {
  return (
    <Container>
      <Row>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div className="category__item d-flex align-items-center gap-3">
              <div className="category__img">
                <img src={item.imgUrl} alt="category__item" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
