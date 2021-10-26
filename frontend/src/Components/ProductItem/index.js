import React from "react";
import PropTypes from "prop-types";
import { url } from "../../Api";

export const ProductItem = ({ product }) => {
  return (
    <>
      <img src={`${url}/image/${product.image}`} alt={`${product.name}`} />
      <h4 className="title">{product.name}</h4>
      <h4 className="price">{`${product.qty} x ${product.price} = ${
        product.qty * product.price
      } `}</h4>
    </>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
