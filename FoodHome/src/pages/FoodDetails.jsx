import React, { useState, useEffect } from "react";

import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import axios from "axios";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setmyProducts] = useState([]);

  useEffect(() => {
    axios.get("https://kind-erin-crow-garb.cyclic.app/api/menu").then((v) => {
      setAllProducts(v.data);
      setmyProducts(v.data);
    });
  }, []);

  const product = allProducts.find((product) => product._id === _id);
  const [previewImg, setPreviewImg] = useState(allProducts.url);
  const { title, price, category, desc, url } = allProducts;

  const relatedProduct = allProducts.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        price,
        url,
      })
    );
  };


  useEffect(() => {
    setPreviewImg(allProducts.url);
  }, [allProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [allProducts]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={title} />

      <section>
        <Container>
          <Row>
            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={url} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  Price: <span>rp {price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category}</span>
                </p>

                <button onClick={addItem} className="addTOCart__btn">
                  Order
                </button>
              </div>
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
