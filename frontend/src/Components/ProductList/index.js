import React from "react";
import PropTypes from "prop-types";
import { FullPageLoader } from "../FullPageLoader";
import { FullPageError } from "../FullPageError";
import { ProductCard } from "../ProductCard";
import { EmptyContainer } from "../EmptyContainer";
import "./index.style.scss";
export const ProductList = ({
  loading,
  error,
  data,
  showActions,
  moveForward,
}) => {
  return (
    <div className="products-container">
      {loading ? (
        <FullPageLoader />
      ) : error ? (
        <FullPageError error={error} />
      ) : data.length > 0 ? (
        data.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            showActions={showActions}
            moveForward={moveForward}
          />
        ))
      ) : (
        <EmptyContainer message="no Products Found" />
      )}
    </div>
  );
};

ProductList.defaultProps = {
  showActions: false,
  moveForward: true,
};

ProductList.propTypes = {
  moveForward: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  showActions: PropTypes.bool.isRequired,
};
