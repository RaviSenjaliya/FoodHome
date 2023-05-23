import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";

const ProductCard = (props) => {
  const { _id, title, url, price } = props.item;

  console.log(props.item);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        _id,
        title,
        url,
        price,
      })
    );
  };

  return (
    <div
      className="product__item rounded-3"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <div className="product__img">
        <img src={url} alt="product-img" width="60%" height="120px" className="rounded-3" />
      </div>

      <div className="product__content">
        <h5>
          <b to={`/foods/${_id}`}>{title}</b>
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">Rs {price}</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
