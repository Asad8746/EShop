import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { QtyInput } from "../QtyInput";
import { addItem, removeItem } from "../../actions";
import { url } from "../../Api";
import "./index.style.scss";
export const CartItem = ({ product, index }) => {
  const total = product.price * product.qty;
  const dispatch = useDispatch();
  const onDecClick = () => {
    if (product.qty - 1 > 0) {
      dispatch(addItem(product.id, product.qty - 1));
    } else {
      dispatch(removeItem(product.id));
    }
  };
  const onIncClick = () => {
    if (product.qty + 1 <= product.stockCount) {
      dispatch(addItem(product.id, product.qty + 1));
    }
  };
  const onCloseClick = () => {
    dispatch(removeItem(product.id));
  };
  return (
    <>
      <i
        className="fas fa-times cart-item__icon"
        style={{ gridRow: `${Number(index) + 2} / ${Number(index) + 3} ` }}
        onClick={onCloseClick}
      ></i>
      <div className="cart-item__info">
        <img
          className="cart-item__image"
          src={`${url}/image/${product.image}`}
          alt={`${product.name} product`}
        />
        <h3 className="cart-item__name">{product.name}</h3>
      </div>
      <h3 className="cart-item__price">{product.price}</h3>
      <div className="cart-item__price">
        <QtyInput
          qty={product.qty}
          onIncClick={onIncClick}
          onDecClick={onDecClick}
          stockCount={product.stockCount}
        />
      </div>
      <h3
        className="cart-item__price cart-item__total"
        style={{ gridRow: `${Number(index) + 2} / ${Number(index) + 3} ` }}
      >
        {total.toFixed(2)}
      </h3>
    </>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stockCount: PropTypes.number.isRequired,
    qty: PropTypes.number.isRequired,
  }),
  index: PropTypes.number.isRequired,
};
