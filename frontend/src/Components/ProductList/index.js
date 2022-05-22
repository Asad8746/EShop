import React from "react";
import PropTypes from "prop-types";
import { FullPageLoader } from "../FullPageLoader";
import { FullPageError } from "../../Components/FullPageError";
import { ProductCard } from "../ProductCard";
import "./index.style.scss";
export const ProductList = ({ loading, error, data }) => {
  return (
    <div className="products-container">
      {loading ? (
        <FullPageLoader />
      ) : error ? (
        <FullPageError error={error} />
      ) : data.length > 0 ? (
        data.map((item) => <ProductCard key={item._id} product={item} />)
      ) : (
        <div className="products__empty-message">No Products Found</div>
      )}
    </div>
  );
};

ProductList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
