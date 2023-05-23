import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import heroImg from "../assets/images/herrooooo.gif";
import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import Category from "../components/UI/category/Category.jsx";
import "../styles/home.css";
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import products from "../assets/fake-data/products.js";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/foood1.gif";
import whyImg2 from "../assets/images/foood2.gif";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import axios from "axios";

const featureData = [
  {
    title: "Quick Service ",
    imgUrl: featureImg01,
    desc: "We provide quick services and instant food delivery at your table.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "We have a good environment with Good background music.",
  },
  {
    title: "Easy to order ",
    imgUrl: featureImg03,
    desc: "Just Scan Code, Select food and Make payment.",
  },
];

const Home = () => {
  // ===============================================================================

  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const [myProducts, setmyProducts] = useState([]);

  useEffect(() => {
    axios.get("https://kind-erin-crow-garb.cyclic.app/api/menu").then((v) => {
      setAllProducts(v.data);
      setmyProducts(v.data);
    });
  }, []);
  // ===============================================================================

  const [hotPizza, setHotPizza] = useState([]);

  // useEffect(() => {
  //   const filteredPizza = allProducts.filter(
  //     (item) => item.category === "Mexican"
  //   );
  //   const slicePizza = filteredPizza.slice(0, 4);
  //   setHotPizza(slicePizza);
  // }, []);

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(myProducts);
    }

    if (category === "ITALIAN") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Italian"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "MEXICAN") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Mexican"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "CHINESE") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Chinese"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "SOUTH") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "South"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "PUNJABI") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Punjabi"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "DRINK") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Drink"
      );

      setAllProducts(filteredProducts);
    }
    if (category === "COMBOS") {
      const filteredProducts = myProducts.filter(
        (item) => item.category === "Combos"
      );

      setAllProducts(filteredProducts);
    }
  }, [category]);
  // ===================================================================================================================

  // ==================================================================================================
  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br /> food at
                  <span> your Table</span>
                </h1>

                <p>
                  A Good food can make your tummy and day happy. So eat healthy
                  and make your Day Healthy with good food
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    <Link to="/cart">Order now</Link>
                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>
                    No self service
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Category />
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Food is really and truly</h2>
              <h2 className="feature__title">
                the most effective <span>medicine</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                The smell of good food, like the sound of lightly flowing water,
                <br />
                is indescribable in its evocation of innocence and delight.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
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
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2>Food Categories</h2>
            </Col>

            <Col lg="12">
              <div
                className="food__category d-flex align-items-center justify-content-center flex-wrap "
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <button
                  className={`all__btn  ${category === "ALL" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ALL")}
                >
                  All
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "ITALIAN" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("ITALIAN")}
                >
                  Italian
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "MEXICAN" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("MEXICAN")}
                >
                  Mexican
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "CHINESE" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("CHINESE")}
                >
                  Chinese
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "SOUTH" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("SOUTH")}
                >
                  South Indian
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "PUNJABI" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("PUNJABI")}
                >
                  Panjabi
                </button>

                <button
                  className={`d-flex align-items-center gap-2 ${category === "DRINK" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("DRINK")}
                >
                  Drinks
                </button>
                <button
                  className={`d-flex align-items-center gap-2 ${category === "COMBOS" ? "foodBtnActive" : ""
                    } `}
                  onClick={() => setCategory("COMBOS")}
                >
                  Combos
                </button>
              </div>
            </Col>
            {/* ================================================================================================= */}
            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="12" key={item.id} className="mt-5">
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Spice Factory?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Part of the secret of success is to eat what you like and let
                  the food fight it out insideWe Serve the food at your table
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and
                      tasty foods
                    </p>
                    <p className="choose__us-desc">
                      Our Customer satisfaction is our first priority so We
                      Provide Delicious and Fresh food  to our customer
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality
                      support
                    </p>
                    <p className="choose__us-desc">
                      We provide and use fresh ingredients and Prepare Hygienic
                      food so 100% Good quality ingredients are used
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i>Order from any
                      location
                    </p>
                    <p className="choose__us-desc">
                      We Serve food at your table after ordering the
                      food from our app
                    </p>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={whyImg2} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
