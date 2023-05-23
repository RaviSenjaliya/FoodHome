import React, { useState, useEffect } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import CommonSection from "../components/UI/common-section/CommonSection";
import Soundd from "../assets/paytm_payment_tune.mp3";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

const Cart = (props) => {
  // ===============================================================================
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = [0, 80, 110, 200, 250];
  const discount =
    cartTotalAmount > 0 && cartTotalAmount <= 500
      ? shippingCost[0]
      : cartTotalAmount >= 500 && cartTotalAmount <= 800
        ? shippingCost[1]
        : cartTotalAmount >= 800 && cartTotalAmount <= 1000
          ? shippingCost[2]
          : cartTotalAmount >= 1000 && cartTotalAmount <= 2000
            ? shippingCost[3]
            : cartTotalAmount >= 2500
              ? shippingCost[4]
              : shippingCost[0];
  const total_amt = cartTotalAmount - Number(discount);

  const cartItems = useSelector((state) => state.cart.cartItems);
  // ===================================================================================================

  const [data, setdata] = useState({
    order_date: Date.now(),
    username: "",
    table_no: "",
    total_amt: "",
    discount: "",
    qty: cartItems.map((v) => {
      return v.title + " (" + v.quantity + ")"
    }).join(" "),
    descreption: "",
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
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  // --------------------------API----------------------------

  function play() {
    new Audio(Soundd).play();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let d = { ...data };

    d["discount"] = discount;
    d["total_amt"] = total_amt;

    Swal.fire({
      imageUrl:
        "https://media4.giphy.com/media/mGNO9zHJpV9JOVRz1L/200w.gif?cid=82a1493bq4jyaa5mdozgtinlexwovcewfmlzwhb61xfxu6dk&ep=v1_gifs_related&rid=200w.gif&ct=g",
      title: `${total_amt} ₹ Please make payment`,
      imageWidth: 130,
      imageHeight: 130,
      imageAlt: "Custom image",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        play();
        axios
          .post("https://kind-erin-crow-garb.cyclic.app/api/order", d)
          .then((r) => {
            console.log(d);
            setEdit(r.data._id);
          });
        setTimeout(() => {
          Swal.fire("payment successful", "", "success");
        }, 400);
      }
    });
    setdata((e.target.value = ""));
  };

  // ==============================================================================================


  const totalAmount = useSelector((state) => state.cart.totalAmount);
  // ===============================================================================
  // =========================================================================
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("https://kind-erin-crow-garb.cyclic.app/api/table").then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(d);
    });
  }, [edit]);

  // =========================================================================

  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>

                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item._id} />
                    ))}
                  </tbody>
                </table>
              )}

              <div className="mt-4">
                <h6>
                  Subtotal: Rp
                  <span className="cart__subtotal">{totalAmount}</span>
                </h6>
                <p>Discount and Order will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Continue Shopping</Link>
                  </button>
                  {/* <button className="addTOCart__btn">
                    <Link to="/checkout">Proceed to checkout</Link>
                  </button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ======================================================================================================= */}
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6" sm="12" className="p-4">
              <ValidatorForm
                className="row"
                onSubmit={handleSubmit}
                onError={() => null}
              // autocomplete="off"
              >
                <TextField
                  className=" mt-4"
                  name="username"
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  value={data.username || ""}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                />
                <TextField
                  className=" mt-4"
                  select
                  variant="filled"
                  value={data.table_no || ""}
                  helperText="Please Select your Table No "
                  onChange={handleChange}
                  name="table_no"
                  SelectProps={{
                    native: "true",
                  }}
                >
                  {rows.map((val) => {
                    return (
                      <>
                        <option>{val.table}</option>
                      </>
                    );
                  })}
                </TextField>

                <TextField
                  className=" mt-4"
                  type="text"
                  name="discount"
                  id="standard-basic"
                  value={discount || ""}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Discount"
                />
                <TextField
                  className=" mt-4"
                  type="text"
                  name="total_amt"
                  id="standard-basic"
                  value={total_amt || ""}
                  onChange={handleChange}
                  errorMessages={["this field is required"]}
                  label="Total"
                />
                <TextareaAutosize
                  className=" mt-4"
                  name="qty"
                  aria-label="empty textarea"
                  onChange={handleChange}
                  value={data.qty || ""}
                  minRows={3}
                  style={{ width: "100%" }}
                />
                <TextareaAutosize
                  className=" mt-4"
                  name="descreption"
                  aria-label="empty textarea"
                  onChange={handleChange}
                  validators={["required"]}
                  value={data.descreption || ""}
                  minRows={3}
                  placeholder="Descreption..."
                  style={{ width: "100%" }}
                />
                <Button
                  className="col-12 mt-4 w-25"
                  style={{
                    backgroundColor: "#b74160",
                  }}
                  variant="contained"
                  type="submit"
                >
                  <PaymentsIcon />
                </Button>
              </ValidatorForm>
            </Col>

            {/* ======================================================================================================= */}

            <Col lg="4" md="6" sm="12">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>{cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Discount: <span>{discount}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>{total_amt}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const { _id, url, title, price, quantity } = props.item;
  const dispatch = useDispatch();


  const deleteItem = () => {
    dispatch(cartActions.deleteItem(_id));
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={url} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">Rp {price}</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
