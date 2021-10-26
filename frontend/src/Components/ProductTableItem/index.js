import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { url } from "../../Api";
import dayjs from "dayjs";
import domains from "../../domains";
import "./index.style.scss";

export const ProductTableItem = ({ product }) => {
  const history = useHistory();

  return (
    <tr key={product._id}>
      <td className="center aligned">
        <img
          className="ui tiny rounded image"
          src={`${url}/image/${product.image}`}
        ></img>
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {product.name}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {product.brand}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {product.category}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {dayjs(product.createdAt).format("YYYY-MM-DD")}
      </td>
      <td className="center aligned admin__table-item--bold">
        {product.user.email}
      </td>

      <td className="center aligned admin__table-item admin__table-item--bold">
        {product.price}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        {product.stockCount}
      </td>
      <td className="center aligned admin__table-item admin__table-item--bold">
        <i
          className="edit icon"
          style={{ cursor: "pointer" }}
          onClick={() => {
            history.push(`${domains.productEdit}/${product._id}`);
          }}
        ></i>
        <i
          style={{ cursor: "pointer" }}
          className="trash icon"
          onClick={() => {
            history.push(`${domains.deleteProduct}/${product._id}`);
          }}
        ></i>
      </td>
    </tr>
  );
};
ProductTableItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    stockCount: PropTypes.number.isRequired,
  }),
};
